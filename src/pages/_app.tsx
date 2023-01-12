// @ts-nocheck
import type { AppProps } from "next/app";
import { Suspense, StrictMode, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import "./globals.css";
import "uno.css";

const Settings = dynamic(() => import("ui/app/settings"), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  const [openSettings, setOpenSettings] = useState(false);
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
          <Suspense>
            <div absolute top="1.875" right-4>
              <Settings open={openSettings} onOpenChange={setOpenSettings} />
            </div>
          </Suspense>
        </div>
        <Component {...pageProps} />
      </>
    </StrictMode>
  );
}
