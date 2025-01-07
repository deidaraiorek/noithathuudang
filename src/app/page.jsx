// app/page.js
import ProductCard from "../components/ProductCard";
import StoreContact from "../components/StoreContact";
import connectDB from "../lib/mongodb";
import Product from "../models/Product";

export default async function Home({ searchParams }) {
  // Convert searchParams to a string first
  const searchQuery = searchParams?.search?.toString() || "";

  await connectDB();

  let products = [];
  try {
    if (searchQuery) {
      products = await Product.find({
        $or: [
          { name: { $regex: searchQuery, $options: "i" } },
          { description: { $regex: searchQuery, $options: "i" } },
        ],
      });
    } else {
      products = await Product.find({});
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <div className="container mx-auto px-4">
      <StoreContact />
      {products.length === 0 ? (
        <div className="text-center py-10 text-[#8B4513]">
          {searchQuery
            ? "Không tìm thấy sản phẩm phù hợp"
            : "Chưa có sản phẩm nào"}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              name={product.name}
              image={product.image}
              description={product.description}
            />
          ))}
        </div>
      )}
    </div>
  );
}
