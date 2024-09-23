import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";
import { manrope } from "./utils/fonts";
import axios from "axios";


export const metadata: Metadata = {
  title: "Drafter Notes",
  description: "A Note-taking app",
};

axios.defaults.baseURL = 'http://127.0.0.1:8080';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={manrope}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
