---
title: Telegram ChatOps (Tuquet Bot)
description: Giám sát máy chủ 24/7, xử lý sự cố và kích hoạt GitHub CI trực tiếp qua Telegram.
---

# 🤖 Telegram ChatOps (`tuquet/bot`)

> **Trợ lý Vận hành & Giám sát Hạ tầng Tự động qua Telegram**  
> Giám sát máy chủ VPS, kiểm tra tình trạng dịch vụ, nhận thông báo CI/CD GitHub và xử lý sự cố tức thì ngay trên điện thoại.

---

## ⚡ Tính Năng Cốt Lõi

* **Canh gác máy chủ 24/7**: Tự động đo lường CPU, RAM, ổ đĩa và các tiến trình nền mỗi 60 giây; cảnh báo tức thì khi vượt ngưỡng an toàn.
* **Tương tác lệnh hai chiều**: Thực thi lệnh quản trị trực tiếp (`/stats`, `/ping`, `/services`, `/deploy`) qua phòng chat Telegram được cấp phép.
* **Giám sát GitHub Actions**: Tự động theo dõi tiến trình build và deploy của toàn bộ hệ sinh thái repository, thông báo ngay khi có lỗi hoặc deploy thành công.
* **Tiếp vận RSS Feed tự động**: Quét RSS feed `tuquet.com/feed.xml` và phát tin bài viết mới lên kênh thảo luận.

---

## 🚀 Khởi Chạy Nhanh

```bash
git clone https://github.com/tuquet/bot.git
cd bot
npm install
cp config/.env.example .env
# Điền TELEGRAM_BOT_TOKEN và ALLOWED_CHAT_IDS
npm start
```
