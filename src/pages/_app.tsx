// @ts-nocheck
import type { AppProps } from "next/app";
import { Suspense, StrictMode, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import "./globals.css";
import "uno.css";

const Settings = dynamic(() => import("ui/app/settings"), { suspense: true });

export default function App({ Component, pageProps }: AppProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <StrictMode>
      <>
        <div text-red sticky top-0 p2>
          <span
            i-mdi-refresh
            cursor-pointer
            text="[32px]"
            onClick={() => router.reload()}
          />
          <span
            i-mdi-dots-horizontal
            cursor-pointer
            text="[32px]"
            fixed
            right-3
            onClick={() => setOpen(!open)}
          />
        </div>
        <Suspense>
          <Settings open={open} onOpenChange={setOpen} />
        </Suspense>
        <Component {...pageProps} />
      </>
    </StrictMode>
  );
}
