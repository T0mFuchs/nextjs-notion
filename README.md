# nextjs `ssg` + `isr` with notion as cms

```
Route (pages)                                                        Size     First Load JS
┌ ● / (ISR: 10 Seconds)                                              2.22 kB        42.5 kB
├   /_app                                                            0 B            36.5 kB
├ ● /[database_title]/[page_id] (ISR: 10 Seconds)                    2.49 kB        42.7 kB
├   └ css/97a996290fca9b29.css                                       135 B
├   ├ /database-list/f0ef2574-265b-4587-89c5-d06d56c72c85
├   ├ /database-list/75e03c8e-b444-418e-88c3-c8be7a1ba1fa
├   ├ /database-list/05305c1c-4b3d-44ee-a58d-67977b2b4001
├   └ /database-list/88fac0db-e1af-4baf-bdbd-0cfe81172a25
└ ○ /404                                                             179 B          36.7 kB
+ First Load JS shared by all                                        38.7 kB
  ├ chunks/main-e9b4da55be5174cb.js                                  33.9 kB
  ├ chunks/pages/_app-989cd80aaf170cc3.js                            545 B
  ├ chunks/webpack-1c6c4a05a0b8e92a.js                               2.1 kB
  └ css/3f7e14478ec74b2a.css                                         2.17 kB

○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
   (ISR)     incremental static regeneration (uses revalidate in getStaticProps)
```
