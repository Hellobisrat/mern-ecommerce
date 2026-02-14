import { useEffect, useState } from "react";
import api from "../utils/api";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { useUserStore } from "../store/userStore";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUserStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data.products || data);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">All products</h1>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} userId={user?._id} />
        ))}
      </div>
    </div>
  );
}