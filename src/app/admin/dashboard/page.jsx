"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminDashboard() {
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isAdminLoggedIn = document.cookie.includes("isAdminLoggedIn=true");
    if (!isAdminLoggedIn) {
      router.push("/admin/login");
    }
  }, [router]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create FormData and append fields
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Sản phẩm đã được thêm thành công!");
        setName("");
        setImageFile(null);
        setImagePreview("");
        setDescription("");
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Không thể thêm sản phẩm: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#FAF3E0] p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-[#8B4513]">
        Thêm sản phẩm mới
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 text-[#8B4513]">
            Tên sản phẩm
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-[#D2B48C] rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-[#8B4513]
                     bg-white/80"
            required
          />
        </div>
        <div>
          <label htmlFor="image" className="block mb-1 text-[#8B4513]">
            Hình ảnh sản phẩm
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-[#D2B48C] rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-[#8B4513]
                     bg-white/80"
            required
          />
          {imagePreview && (
            <div className="mt-2 relative w-full h-48">
              <Image
                src={imagePreview}
                alt="Preview"
                fill
                className="object-contain rounded-md"
              />
            </div>
          )}
        </div>
        <div>
          <label htmlFor="description" className="block mb-1 text-[#8B4513]">
            Mô tả
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-[#D2B48C] rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-[#8B4513]
                     bg-white/80"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-4 py-2 bg-[#8B4513] text-white rounded-md 
                   hover:bg-[#A0522D] focus:outline-none focus:ring-2 focus:ring-[#8B4513]
                   ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isLoading ? "Đang thêm..." : "Thêm sản phẩm"}
        </button>
      </form>
    </div>
  );
}
