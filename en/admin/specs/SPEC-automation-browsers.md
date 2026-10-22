# Spec: Quản Trị Phiên Trình Duyệt Tự Động Hóa (`/automation/browsers`)

> **Mã đặc tả:** `SPEC-automation-browsers`  
> **Route URL:** `/automation/browsers`  
> **Component:** `apps/web-admin/src/views/automation/browsers/index.vue`  
> **PostgreSQL Schema:** `workers.browsers` (kết hợp danh mục `browsers.releases` và `workers.proxies`)  
> **Phân quyền (RBAC):** `['superadmin', 'workers:browsers:read']` / `workers:browsers:manage`  
> **Kiến trúc nguồn:** [`overview.md`](../architecture/overview.md), [`CAPABILITY-map-web-admin.md`](CAPABILITY-map-web-admin.md)  
> **Liên kết phân hệ:** [`SPEC-automation-devices.md`](SPEC-automation-devices.md), [`SPEC-automation-proxies.md`](SPEC-automation-proxies.md), [`SPEC-automation-jobs.md`](SPEC-automation-jobs.md), [`SPEC-ui-mobile-vxe-detail-sheet.md`](SPEC-ui-mobile-vxe-detail-sheet.md)  
> **Ngày cập nhật:** `2026-10-22`  
> **Trạng thái:** **ACCEPTED & IMPLEMENTED**

---

## 1. Objective (Mục Tiêu & Phạm Vi)

Quản trị toàn diện danh mục **Thực thể Trình duyệt Tự động hóa (Automation Browser Instances)** thuộc hạ tầng Worker node, đóng vai trò là môi trường thực thi kịch bản (Job execution runtime) có cấu hình chống nhận diện (fingerprint bypass) và proxy định tuyến:

1. **Ranh giới Domain (Domain Boundary SSOT):**
   - **`workers.browsers` (Màn hình này):** Đại diện cho các instance trình duyệt phân bổ trên cụm máy trạm worker (`locked_by_device_id`, trạng thái chạy `idle`, `running`, `syncing`, kết nối proxy `proxy_id`).
   - **`browsers.profiles` (Phân hệ Antidetect độc lập):** Đại diện cho các mẫu danh tính số tĩnh (canvas, webgl, audio, fonts, cookies snapshot).
   
2. **Lưới Dữ Liệu (`useVbenVxeGrid`):**
   - **Thông tin Instance:** Tên thể hiện (`name`), Phiên bản Engine (`engine_version`), Seed ngẫu nhiên (`fingerprint_seed`).
   - **Môi trường & Hệ thống:** Hệ điều hành (`os_platform` + `os_version`), Phần cứng (`cpu_cores`, `ram_gb`), Múi giờ & Ngôn ngữ (`timezone`, `locale`).
   - **Khóa & Chiếm giữ:** Worker node đang chạy (`locked_by_device:locked_by_device_id(name)`), Thời điểm chiếm giữ (`locked_at`).
   - **Mạng & Định tuyến:** Proxy gán kèm (`proxy:proxy_id(host,port,protocol)`), Chế độ WebRTC (`webrtc_mode`).
   - **Trạng thái & Đồng bộ:** Badge thời gian thực (`idle`, `running`, `syncing`, `error`), Kích thước dữ liệu phiên (`storage_size_bytes`), Số cookies (`cookies_count`), Thời điểm đồng bộ cuối (`last_synced_at`).

---

## 2. State Machine & Vòng Đời Instance (Lifecycle)

```
        ┌──────────────────────────────────────────────┐
        │                                              │ (Job Finished)
        ▼                                              │
     [ IDLE ] ──(Job Dispatched)──► [ RUNNING ] ──► [ SYNCING ]
        ▲                                │
        │                                │ (Worker Crash / Timeout)
        │                                ▼
        └──────── (Force Unlock) ─── [ ERROR ]
```

- **`idle`:** Instance sẵn sàng được điều phối bởi Scheduler cho một Job mới.
- **`running`:** Đang bị khóa bởi một Worker (`locked_by_device_id != null`, `locked_at = now()`).
- **`syncing`:** Phiên tự động hóa vừa kết thúc, Worker đang nén và đẩy cookie/storage lên Cloud Storage (`media`).
- **`error`:** Gặp sự cố trong quá trình khởi chạy hoặc Worker bị ngắt kết nối đột ngột mà chưa kịp mở khóa.
- **Cơ chế Mở Khóa Khẩn Cấp (Force Unlock):**
  - Cho phép quản trị viên hủy trạng thái chiếm giữ khi Worker bị treo: Gửi `PATCH /rest/v1/browsers?id=eq.{id}` với `{ locked_by_device_id: null, locked_at: null, status: 'idle' }`.

---

## 3. Dynamic Dropdowns & Field Relations (`vxe-row-detail-sheet`)

Khi người dùng mở Sheet Chi Tiết / Tạo Mới (`New record`):

1. **Proxy Gán Kèm (`proxy_id`):**
   - Nạp động danh sách proxy của workspace từ `workers.proxies` qua hàm API chuẩn `listProxies({ tenantId })` (hoặc `proxiesApi.list`).
   - Format nhãn: `{protocol}://{host}:{port} [{country_code}] - {status}`.
   - Luôn có tùy chọn mặc định: `None (Direct Egress)` tương ứng giá trị `null`.
   - Cảnh báo trực quan nếu proxy được chọn đang ở trạng thái `failing` hoặc `offline`.

2. **Phiên bản Engine (`engine_version`):**
   - Nạp động từ danh mục chính thức `browsers.releases` qua hàm API chuẩn `listBrowserReleases({ status: 'stable' })` (hoặc `browsersApi.listReleases`).
   - Chỉ nạp các bản build ungoogled Chromium đã biên dịch và kiểm định an toàn (`adryfish/fingerprint-chromium`).
   - Tự động lọc danh sách phiên bản theo `os_platform` tương ứng được chọn trên Form (Windows/Linux/macOS).

---

## 4. API & Interface Contract (`src/api/core/automation.ts`)

Tuân thủ nghiêm ngặt nguyên lý **Resource-Oriented SDK** theo chuẩn `addy-api-and-interface-design`:

```typescript
// ============================================================================
// CONTRACT 1: BROWSERS RESOURCE API (PostgreSQL schema: 'workers')
// ============================================================================

export interface ListBrowsersParams {
  osPlatform?: string;
  search?: string;
  status?: string;
  tenantId?: string;
}

export interface BrowserNode {
  browser_type: string;
  cookies_count: number;
  cpu_cores: number;
  engine_version: string;
  fingerprint_seed: number;
  id: string;
  last_launched_at: null | string;
  last_synced_at: null | string;
  locale: string;
  locked_at: null | string;
  locked_by_device?: null | { id?: string; name: string };
  locked_by_device_id: null | string;
  name: string;
  os_platform: string;
  os_version: string;
  proxy?: null | { host: string; port: number; protocol: string };
  proxy_id: null | string;
  ram_gb: number;
  status: BrowserStatus;
  storage_size_bytes: number;
  tenant_id: string;
  timezone: string;
  webrtc_mode: string;
}

/** Lấy danh sách browser nodes từ workers.browsers */
export async function listBrowsers(params?: ListBrowsersParams): Promise<BrowserNode[]>;

// ============================================================================
// CONTRACT 2: RELEASES CATALOG API (PostgreSQL schema: 'browsers')
// ============================================================================

export interface ListBrowserReleasesParams {
  arch?: string;
  channel?: string;
  osPlatform?: string;
  status?: string;
}

export interface BrowserRelease {
  arch: string;
  channel: string;
  created_at: string;
  download_url: null | string;
  id: string;
  is_recommended: boolean;
  os_platform: string;
  package_hash: null | string;
  package_size_bytes: number;
  status: string;
  version: string;
}

/** Lấy danh mục phiên bản phát hành từ browsers.releases */
export async function listBrowserReleases(params?: ListBrowserReleasesParams): Promise<BrowserRelease[]>;

// ============================================================================
// CONTRACT 3: PROXIES POOL API (PostgreSQL schema: 'workers')
// ============================================================================

export interface ListProxiesParams {
  countryCode?: string;
  protocol?: string;
  search?: string;
  status?: string;
  tenantId?: string;
}

export interface ProxyNode {
  country_code: string;
  host: string;
  id: string;
  latency_ms: number;
  port: number;
  protocol: ProxyProtocol;
  status: ProxyStatus;
  tenant_id: string;
}

/** Lấy danh sách proxy pool từ workers.proxies */
export async function listProxies(params?: ListProxiesParams): Promise<ProxyNode[]>;

// ============================================================================
// CONTRACT 4: NAMESPACED SDK OBJECTS (Resource Facade)
// ============================================================================

export const browsersApi = {
  list: listBrowsers,
  listReleases: listBrowserReleases,
};

export const proxiesApi = {
  list: listProxies,
};
```

---

## 5. Testing & Verification

```bash
# 1. Chạy unit tests cho API automation & browsers
pnpm --filter @tuquet/admin-web exec vitest run src/api/core/__tests__/automation.test.ts

# 2. Kiểm tra typecheck TypeScript
pnpm --filter @tuquet/admin-web run typecheck

# 3. Linter & Format check
npx oxlint apps/web-admin/src/

# 4. Kiểm tra tài liệu VitePress & Cross-links
pnpm -C docs run build
```
