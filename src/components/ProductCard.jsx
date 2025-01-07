import Image from "next/image";

export default function ProductCard({ name, image, description }) {
  return (
    <div className="bg-[#FAF3E0] shadow rounded-lg overflow-hidden transition-transform hover:scale-105">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-[#8B4513]">{name}</h2>
        <p className="text-[#A0522D] mb-4">{description}</p>
        <button className="w-full bg-[#8B4513] text-white py-2 rounded hover:bg-[#A0522D] transition-colors">
          Liên hệ mua hàng
        </button>
      </div>
    </div>
  );
}
