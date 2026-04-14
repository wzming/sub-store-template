# sing-box 1.14.x 模板

本目录存放面向 sing-box 1.14.x 兼容处理后的模板配置。

## 保留文件

- `sing-box.js`
  本目录模板共用的 Sub-Store 生成脚本。

- `sing-box-tun-android.json`
  Android 客户端模板。保留 Android 平台限制，同时让分流逻辑尽量与 Linux 主机版一致。

- `sing-box-tun-linux-host.json`
  Linux 桌面或服务器模板。包含偏 Linux 的 TUN 选项，并排除了常见虚拟网卡，Docker 除外。

- `sing-box-tun-openwrt-main-router.json`
  OpenWrt 主路由模板。采用纯透明代理模式，不开放对外可用的 `mixed` 入站。

- `sing-box-tun-openwrt-bypass-router.json`
  OpenWrt 旁路由模板。保留 `0.0.0.0:7890` 的 `mixed` 入站，便于局域网设备显式代理。

- `sing-box-tproxy.json`
  Linux / Root Android（如 box4magisk）通用的 TProxy 模板。保留本机 `mixed` 入口，默认透明代理端口与 box4magisk 常见 TPROXY 端口习惯兼容。

## 1.14 兼容调整

- 已移除废弃的 `dns.independent_cache`
- 已启用 `dns.optimistic`
- 已启用 `experimental.cache_file.store_dns`
- 保留 `experimental.cache_file.store_fakeip`

## 备注

- 本目录现在只保留 5 类配置模板：`tproxy`、`android`、`linux-host`、`openwrt-main-router`、`openwrt-bypass-router`。
- `sing-box.js` 为这些模板共用的生成脚本，保留在目录内。
- `sing-box-tproxy.json` 更偏向 Linux / Root Android 的 TPROXY 模式使用；如果 box4magisk 最终回退到 REDIRECT 模式，则通常还需要额外对齐其脚本侧的 DNS 劫持配置。
- `linux-host` 与两种 `openwrt` 模板中的 `route_exclude_address` 仅保留链路本地与组播网段：`169.254.0.0/16`、`224.0.0.0/4`、`fe80::/10`、`ff00::/8`。
- 不再在 `route_exclude_address` 中排除整段 RFC1918 / ULA 私网，避免与模板固定的 TUN 地址 `172.18.0.1/30`、`fdfe:dcba:9876::1/126` 发生范围重叠，在 Linux / OpenWrt 的 `auto_route` 与 `auto_redirect` 场景下引发路由异常。
- 私网流量仍通过模板内已有的 `ip_is_private -> direct` 规则处理，而不是在路由下发阶段直接整体绕过。
