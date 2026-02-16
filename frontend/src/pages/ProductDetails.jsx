import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import Loader from "../components/Loader";
import { useCartStore } from "../store/cartStore";
import { useUserStore } from "../store/userStore";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCartStore();
  const { user } = useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
         setProduct(data.product);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <p>Product not found.</p>;

  const handleAdd = () => {
    if (!user?._id) return;
    addToCart({
      userId: user._id,
      productId: product._id,
      variantId: product.variants?.[0]?._id || null,
      price: product.price,
      quantity: 1,
    });
  };

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div className="overflow-hidden rounded-2xl border bg-white">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-600">
          {product.category || "Product"}
        </p>
        <h1 className="text-2xl font-semibold text-gray-900">{product.name}</h1>
        <p className="text-sm text-gray-600">{product.description}</p>
        <p className="text-xl font-semibold text-indigo-600">
          ${product.price.toFixed(2)}
        </p>
        <button
          onClick={handleAdd}
          className="mt-4 rounded-full bg-gray-900 px-6 py-2 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}