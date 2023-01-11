# nextjs | notion | cms

```
Route (pages)                              Size     First Load JS
┌ λ /                                      2.38 kB        37.6 kB
├   /_app                                  0 B            35.2 kB
├ λ /[page_id]                             416 B          35.6 kB
└ ○ /404                                   179 B          35.4 kB
+ First Load JS shared by all              35.8 kB
  ├ chunks/main-e9b4da55be5174cb.js        33.9 kB
  ├ chunks/pages/_app-f7c9d0e8aeb0d704.js  534 B
  ├ chunks/webpack-8fa1640cc84ba8fe.js     750 B
  └ css/180e091a20188f59.css               647 B

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps)
○  (Static)  automatically rendered as static HTML (uses no initial props)
```
