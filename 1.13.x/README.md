# sing-box 1.13.x 模板

本目录存放适用于 sing-box 1.13.x 的模板配置。

## 保留文件

- `sing-box.js`
  本目录模板共用的 Sub-Store 生成脚本。

- `sing-box-tun-android.json`
  Android 客户端模板。在保留 Android 平台限制的前提下，尽量与 Linux 主机版的分流逻辑保持一致。

- `sing-box-tun-linux-host.json`
  Linux 桌面或服务器模板。包含偏 Linux 的 TUN 选项，并排除了常见虚拟网卡，Docker 除外。

- `sing-box-tun-openwrt-main-router.json`
  OpenWrt 主路由模板。采用纯透明代理模式，不开放对外可用的 `mixed` 入站。

- `sing-box-tun-openwrt-bypass-router.json`
  OpenWrt 旁路由模板。保留 `0.0.0.0:7890` 的 `mixed` 入站，便于局域网设备显式代理。

- `sing-box-tproxy.json`
  Linux / Root Android（如 box4magisk）通用的 TProxy 模板。保留本机 `mixed` 入口，默认透明代理端口与 box4magisk 常见 TPROXY 端口习惯兼容。

## 1.13 特性说明

- 保留 `dns.independent_cache`
- 保留 `experimental.cache_file.store_fakeip`
- 不使用 1.14 新增的 `dns.optimistic`
- 不使用 1.14 新增的 `experimental.cache_file.store_dns`

## 备注

- 本目录现在只保留 5 类配置模板：`tproxy`、`android`、`linux-host`、`openwrt-main-router`、`openwrt-bypass-router`。
- `sing-box.js` 为这些模板共用的生成脚本，保留在目录内。
- `sing-box-tproxy.json` 更偏向 Linux / Root Android 的 TPROXY 模式使用；如果 box4magisk 最终回退到 REDIRECT 模式，则通常还需要额外对齐其脚本侧的 DNS 劫持配置。
