// app/layout.js
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/Header";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nội thất Hữu Đăng",
  description: "Trang trí nội thất Hữu Đăng",
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
