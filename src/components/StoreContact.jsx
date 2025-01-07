import { MapPin, Phone } from "lucide-react";

export default function StoreContact() {
  const storePhone = "0944.702504";
  const storeAddress =
    "109 Hùng Vương, Phường 2, Thành phố Cao Lãnh, Đồng Tháp";

  return (
    <div className="bg-[#FAF3E0] shadow rounded-lg p-6 mb-8 border-l-4 border-[#8B4513]">
      <h2 className="text-2xl font-bold mb-4 text-[#8B4513]">Liên hệ</h2>
      <div className="flex items-center mb-2 text-[#A0522D]">
        <Phone className="mr-2 text-[#8B4513]" />
        <span>0944702504</span>
      </div>
      <div className="flex items-center mb-4 text-[#A0522D]">
        <MapPin className="mr-2 text-[#8B4513]" />
        <span>{storeAddress}</span>
      </div>
    </div>
  );
}
