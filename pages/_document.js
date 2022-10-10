import {Html, Head, Main, NextScript} from 'next/document'
import React from "react";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link rel="icon" href="/favicon.ico"/>
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Sora:wght@100;200;300;400&display=swap"
          rel="stylesheet"/>
      </Head>
      <body>
      <Main/>
      <NextScript/>
      </body>
    </Html>
  )
}