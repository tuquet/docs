---
layout: page
title: Specter Documentation Gateway
---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  if (typeof window !== 'undefined') {
    const isVi = navigator.language && navigator.language.toLowerCase().startsWith('vi')
    window.location.replace(isVi ? '/vi/specter/' : '/en/specter/')
  }
})
</script>

# 👻 Specter Platform Documentation

Redirecting you to the appropriate language documentation:

* 🇺🇸 **[English Specter Documentation (`/en/specter/`)](/en/specter/)**
* 🇻🇳 **[Tài Liệu Tiếng Việt (`/vi/specter/`)](/vi/specter/)**
