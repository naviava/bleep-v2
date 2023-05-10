import "./globals.css";
import { Alexandria } from "next/font/google";

import AuthContext from "@/context/AuthContext";
import ToasterContext from "@/context/ToasterContext";

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
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}