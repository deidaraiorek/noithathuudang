"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make API call to verify credentials
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        document.cookie = "isAdminLoggedIn=true; path=/; max-age=3600;";
        router.push("/admin/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#FAF3E0] p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-[#8B4513]">Đăng nhập</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block mb-1 text-[#8B4513] font-medium"
          >
            Tên đăng nhập
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-[#D2B48C] rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-[#8B4513]
                     bg-white text-gray-800 placeholder-gray-500"
            placeholder="Nhập tên đăng nhập"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-1 text-[#8B4513] font-medium"
          >
            Mật khẩu
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-[#D2B48C] rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-[#8B4513]
                     bg-white text-gray-800 placeholder-gray-500"
            placeholder="Nhập mật khẩu"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-[#8B4513] text-white rounded-md 
                   hover:bg-[#A0522D] focus:outline-none focus:ring-2 
                   focus:ring-[#8B4513] transition-colors font-medium"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
