import React from "react";
import type { AppProps } from "next/app";
import "./globals.css";
import "uno.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <Component {...pageProps} />
    </React.StrictMode>
  );
}
