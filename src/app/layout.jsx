// app/layout.js
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nội thất Hữu Đăng",
  description: "Trang trí nội thất Hữu Đăng",
  icons: {
    icon: [
      {
        url: "/images/logoplain.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/images/logoplain.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "../images/logoplain.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: ["../images/logoplain.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#FFF8DC]`}>
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          {children}
        </main>
      </body>
    </html>
  );
}
