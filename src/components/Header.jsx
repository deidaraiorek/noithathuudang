"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import Logo from "../public/images/logoplain.png";

export default function Header() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkAdminStatus = () => {
      const isAdminLoggedIn = document.cookie.includes("isAdminLoggedIn=true");
      setIsAdmin(isAdminLoggedIn);
    };

    checkAdminStatus();
    window.addEventListener("storage", checkAdminStatus);

    return () => {
      window.removeEventListener("storage", checkAdminStatus);
    };
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm) {
      router.push(`/?search=${searchTerm}`);
    } else {
      router.push("/");
    }
  };

  const handleLogout = () => {
    document.cookie = "isAdminLoggedIn=true; max-age=0; path=/";
    setIsAdmin(false);
    router.push("/");
  };

  return (
    <header className="bg-[#FAF3E0] shadow">
      <div className="container mx-auto px-4 py-2 max-w-6xl">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden absolute right-4 top-4 text-[#8B4513] p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        <nav className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 py-2">
          {/* Logo and Company Name */}
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 md:h-24 md:w-24 relative">
              <Image
                src={Logo}
                alt="Hữu Đăng Logo"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
            <div className="flex flex-col">
              <Link
                href="/"
                className="text-lg md:text-xl font-bold text-[#8B4513]"
              >
                Nội thất Hữu Đăng
              </Link>
              <span className="text-sm text-[#8B4513]">0944.702504</span>
            </div>
          </div>

          {/* Search Bar */}
          <div
            className={`w-full md:max-w-md md:flex-1 md:mx-8 ${
              isMenuOpen ? "block" : "hidden md:block"
            }`}
          >
            <input
              type="search"
              onChange={handleSearch}
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full px-4 py-2 rounded-lg border border-[#D2B48C] 
                       focus:outline-none focus:ring-2 focus:ring-[#8B4513]
                       bg-white text-gray-800 placeholder-gray-500"
            />
          </div>

          {/* Admin Links */}
          <div
            className={`flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0 ${
              isMenuOpen ? "block" : "hidden md:flex"
            }`}
          >
            {isAdmin ? (
              <>
                <Link
                  href="/admin/dashboard"
                  className="text-[#8B4513] hover:text-[#A0522D] transition-colors font-medium"
                >
                  Thêm sản phẩm
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-[#8B4513] hover:text-[#A0522D] transition-colors font-medium text-left"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <Link
                href="/admin/login"
                className="text-[#8B4513] hover:text-[#A0522D] transition-colors font-medium"
              >
                Đăng nhập quản trị
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
