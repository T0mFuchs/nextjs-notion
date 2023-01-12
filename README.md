# nextjs `ssg` + `isr` with notion as cms

```
Route (pages)                                         Size     First Load JS
┌ ● / (ISR: 10 Seconds)                               3.12 kB        41.4 kB
├   /_app                                             0 B            38.3 kB
├ ● /[page_id] (ISR: 10 Seconds)                      522 B          38.8 kB
├   ├ /f0ef2574-265b-4587-89c5-d06d56c72c85
├   ├ /75e03c8e-b444-418e-88c3-c8be7a1ba1fa
├   ├ /05305c1c-4b3d-44ee-a58d-67977b2b4001
├   └ /88fac0db-e1af-4baf-bdbd-0cfe81172a25
└ ○ /404                                              179 B          38.5 kB
+ First Load JS shared by all                         40.1 kB
  ├ chunks/main-e9b4da55be5174cb.js                   33.9 kB
  ├ chunks/pages/_app-19eff752bbbfb8ed.js             2.29 kB
  ├ chunks/webpack-c5a1236538f512bc.js                2.1 kB
  └ css/eb2c8ec92d51c481.css                          1.81 kB

○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
   (ISR)     incremental static regeneration (uses revalidate in getStaticProps)
```
