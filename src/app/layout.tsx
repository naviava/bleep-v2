import "./globals.css";
import { Alexandria } from "next/font/google";

import Providers from "@/context/Providers";

const font = Alexandria({ subsets: ["latin"] });

export const metadata = {
  title: "Bleep Messenger",
  description: "Bleep it out!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
