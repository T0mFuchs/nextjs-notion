# nextjs | react-notion-x | cms

```
Route (pages)                              Size     First Load JS
┌ ● / (ISR: 10 Seconds)                    599 B          70.2 kB
├   /_app                                  0 B            36.1 kB
├ ● /[page_id]                             608 B          70.2 kB
└ ○ /404                                   179 B          36.3 kB
+ First Load JS shared by all              45.5 kB
  ├ chunks/main-e9b4da55be5174cb.js        33.9 kB
  ├ chunks/pages/_app-a31159d18e480e0c.js  552 B
  ├ chunks/webpack-258b6adb42c6b911.js     1.64 kB
  └ css/40365f7e6d9bf4ac.css               9.42 kB

○  (Static)  automatically rendered as static HTML (uses no initial props)
●  (SSG)     automatically generated as static HTML + JSON (uses getStaticProps)
   (ISR)     incremental static regeneration (uses revalidate in getStaticProps)
```
