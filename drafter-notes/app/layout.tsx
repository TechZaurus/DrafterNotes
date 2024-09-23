import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";
import { manrope } from "./utils/fonts";


export const metadata: Metadata = {
  title: "Drafter Notes",
  description: "A Note-taking app",
};

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
