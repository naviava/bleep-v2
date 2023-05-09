import "../globals.css";
import { Alexandria } from "next/font/google";

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
      <body className={font.className}>{children}</body>
    </html>
  );
}
