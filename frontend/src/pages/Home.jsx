import { useEffect, useState } from "react";
import api from "../utils/api";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { useUserStore } from "../store/userStore";

export default function Home() {
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
    <div className="space-y-10">
      <section className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Modern ecommerce
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            A high‑end shopping experience for modern products.
          </h1>
          <p className="text-sm text-gray-600">
            Browse curated products, smooth checkout, and a clean interface powered by MERN, Stripe, and Cloudinary.
          </p>
          <div className="flex gap-3 pt-2">
            <a
              href="#featured"
              className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
            >
              Shop featured
            </a>
            <a
              href="#all-products"
              className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:border-gray-400 hover:text-gray-900"
            >
              View all products
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-40 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500" />
          <div className="h-40 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700" />
          <div className="h-40 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500" />
          <div className="h-40 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500" />
        </div>
      </section>

      <section id="featured" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Featured products</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {products.slice(0, 6).map((p) => (
            <ProductCard key={p._id} product={p} userId={user?._id} />
          ))}
        </div>
      </section>

      <section id="all-products" className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">All products</h2>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} userId={user?._id} />
          ))}
        </div>
      </section>
    </div>
  );
}