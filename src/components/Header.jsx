"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check admin status when component mounts
    const checkAdminStatus = () => {
      const isAdminLoggedIn = document.cookie.includes("isAdminLoggedIn=true");
      setIsAdmin(isAdminLoggedIn);
    };

    checkAdminStatus();
    // Add event listener for cookie changes
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
        <nav className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <div className="h-24 w-24 relative">
              <Image
                src="/images/logoplain.png"
                alt="Hữu Đăng Logo"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
            <div className="flex flex-col">
              <Link href="/" className="text-xl font-bold text-[#8B4513]">
                Nội thất Hữu Đăng
              </Link>
              <span className="text-sm text-[#8B4513]">0944.702504</span>
            </div>
          </div>

          <div className="max-w-md flex-1 mx-8">
            <input
              type="search"
              onChange={handleSearch}
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full px-4 py-2 rounded-lg border border-[#D2B48C] 
                       focus:outline-none focus:ring-2 focus:ring-[#8B4513]
                       bg-white/80 placeholder-[#8B4513]/60"
            />
          </div>

          <div className="flex items-center space-x-4">
            {isAdmin ? (
              <>
                <Link
                  href="/admin/dashboard"
                  className="text-[#8B4513] hover:text-[#A0522D] transition-colors"
                >
                  Thêm sản phẩm
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-[#8B4513] hover:text-[#A0522D] transition-colors"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <Link
                href="/admin/login"
                className="text-[#8B4513] hover:text-[#A0522D] transition-colors"
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
