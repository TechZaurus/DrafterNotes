import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers";


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
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
