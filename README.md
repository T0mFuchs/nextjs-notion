# nextjs `ssg` + `isr` with notion as cms

```
Route (pages)                                          Size     First Load JS
┌ ● / (ISR: 10 Seconds)                                2.56 kB        40.7 kB
├   /_app                                              0 B            38.1 kB
├ ● /[page_id] (ISR: 10 Seconds)                       511 B          38.6 kB
├   ├ /05305c1c-4b3d-44ee-a58d-67977b2b4001
├   ├ /f0ef2574-265b-4587-89c5-d06d56c72c85
├   ├ /75e03c8e-b444-418e-88c3-c8be7a1ba1fa
├   └ /88fac0db-e1af-4baf-bdbd-0cfe81172a25
└ ○ /404                                               179 B          38.3 kB
+ First Load JS shared by all                          39.5 kB
  ├ chunks/main-e9b4da55be5174cb.js                    33.9 kB
  ├ chunks/pages/_app-f4609e815793f39b.js              2.29 kB
  ├ chunks/webpack-98b60175cd4b93d8.js                 1.93 kB
  └ css/4bf287036dbe29ec.css                           1.4 kB

○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
   (ISR)     incremental static regeneration (uses revalidate in getStaticProps)
```
