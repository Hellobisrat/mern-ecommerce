import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

export default function ProductCard({ product, userId }) {
  const { addToCart } = useCartStore();

  const handleAdd = () => {
    if (!userId) return; // later: handle guest cart
    addToCart({
      userId,
      productId: product._id,
      variantId: product.variants?.[0]?._id || null,
      price: product.price,
      quantity: 1,
    });
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/product/${product._id}`} className="relative block h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {product.category && (
          <span className="absolute left-3 top-3 rounded-full bg-white/80 px-2 py-0.5 text-xs font-medium text-gray-700">
            {product.category}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
            {product.name}
          </h3>
          <p className="text-sm font-semibold text-indigo-600">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <p className="line-clamp-2 text-xs text-gray-500">{product.description}</p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <Link
            to={`/product/${product._id}`}
            className="text-xs font-medium text-gray-600 hover:text-gray-900"
          >
            View details
          </Link>
          <button
            onClick={handleAdd}
            className="rounded-full bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-gray-800"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}