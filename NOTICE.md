# Notices

Ephemeris is an independent fan project. It is **not affiliated with, endorsed by,
or sponsored by Apple Inc.** Apple, the Apple logo, Mac, macOS, Finder, Spotlight,
Mission Control and other Apple product names are trademarks of Apple Inc.,
registered in the U.S. and other countries. Other product names and logos are the
property of their respective owners.

The theme's own code is MIT-licensed (see `LICENSE`). The items below are
**not** covered by that license.

## Images that belong to others

| What | Where | Owner / note |
| --- | --- | --- |
| macOS Monterey wallpaper | `assets/images/wallpaper-monterey*.webp` | Apple Inc. |
| macOS app, folder, document and Dock icons (Finder, Notes, Terminal, Trash, Preview, Mail, System Settings, Downloads, disk image, package, folder, document) | `assets/images/dock/`, `assets/images/files/` | Apple Inc. |
| macOS arrow cursor | `assets/images/cursor/arrow.svg` | Apple Inc. (redrawn) |
| Apple logo in the menu bar | `_includes/icons.html` (`#i-apple`) | Apple Inc. (trademark) |
| Obsidian icon | `assets/images/dock/obsidian-*.png` | Dynalist Inc. (trademark) |
| Spotify icon | `assets/images/dock/spotify-*.png` | Spotify AB (trademark) |
| Running cat frames | `assets/images/runcat/` | In the style of the RunCat app by Takuto Nakamura (Kyome22). Verify the license or replace before redistributing. |

These are included so the desktop looks right out of the box. They are fine for a
personal, non-commercial blog, but **replace them with your own artwork if you
plan any commercial use** (for example selling a product built on this theme).
`assets/images/wallpaper*.webp` / `wallpaper*.svg` (the "Ephemeris" wallpaper) and
the icon sprite in `_includes/icons.html` (except the Apple logo) are original to
this project and MIT-licensed.

## Fonts

| Font | How it's used | License |
| --- | --- | --- |
| [JetBrains Mono](https://github.com/JetBrains/JetBrainsMono) | Bundled in `assets/fonts/` for code | SIL Open Font License 1.1 — `assets/fonts/OFL.txt` |
| [Pretendard](https://github.com/orioncactus/pretendard) | Loaded from jsDelivr on non-Apple devices | SIL Open Font License 1.1 |
| SF Pro, Apple SD Gothic Neo, SF Mono | Referenced as system fonts only (never bundled) | Apple Inc. |

## Code

| Library | Where | License |
| --- | --- | --- |
| [html-to-image](https://github.com/bubkoo/html-to-image) 1.11.13 | `assets/js/vendor/html-to-image.js` (built by `tools/genie`) | MIT |
| thinking-orbs (Jakub Antalik) | `tools/og/orb/vendor/thinking-orbs/` (share thumbnails only) | MIT, see its `LICENSE` |
| [Jekyll](https://jekyllrb.com) and plugins | build time only | MIT |

## Services the desktop talks to

| Service | Used by | Terms |
| --- | --- | --- |
| [Open-Meteo](https://open-meteo.com) | Weather widget | Free API for non-commercial use, attribution under CC BY 4.0. Commercial sites need a paid plan. |
| Coinbase Exchange public API | Price widget in Notification Center | Coinbase terms of service |
| YouTube embedded player | Music app | YouTube Terms of Service. Album artwork is loaded from Apple Music's image CDN and belongs to the label. |
| jsDelivr | Pretendard font files | jsDelivr terms |
