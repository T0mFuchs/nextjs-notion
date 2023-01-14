# nextjs `ssg` + `isr` with notion as cms

```
Route (pages)                                          Size     First Load JS
┌ ● / (ISR: 10 Seconds)                                2.13 kB        38.7 kB
├   /_app                                              0 B            36.6 kB
├ ● /[page_id] (ISR: 10 Seconds)                       528 B          37.1 kB
├   ├ /f0ef2574-265b-4587-89c5-d06d56c72c85
├   ├ /75e03c8e-b444-418e-88c3-c8be7a1ba1fa
├   ├ /05305c1c-4b3d-44ee-a58d-67977b2b4001
├   └ /88fac0db-e1af-4baf-bdbd-0cfe81172a25
└ ○ /404                                               179 B          36.7 kB
+ First Load JS shared by all                          38.1 kB
  ├ chunks/main-e9b4da55be5174cb.js                    33.9 kB
  ├ chunks/pages/_app-e4d17a2754beffcf.js              545 B
  ├ chunks/webpack-67a6b5c650948a0e.js                 2.11 kB
  └ css/7fdcbfa476edc14b.css                           1.54 kB

○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
   (ISR)     incremental static regeneration (uses revalidate in getStaticProps)
```
