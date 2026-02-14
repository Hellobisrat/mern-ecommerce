import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useUserStore } from "../store/userStore";
import Loader from "../components/Loader";

export default function Cart() {
  const { items, loadCart, loading, total, removeFromCart } = useCartStore();
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) loadCart(user._id);
  }, [user, loadCart]);

  if (!user) {
    return (
      <div className="space-y-3">
        <h1 className="text-xl font-semibold text-gray-900">Your cart</h1>
        <p className="text-sm text-gray-600">
          Please{" "}
          <Link to="/login" className="text-indigo-600 underline">
            sign in
          </Link>{" "}
          to view your cart.
        </p>
      </div>
    );
  }

  if (loading) return <Loader />;

  if (!items.length) {
    return (
      <div className="space-y-3">
        <h1 className="text-xl font-semibold text-gray-900">Your cart</h1>
        <p className="text-sm text-gray-600">Your cart is empty.</p>
        <Link
          to="/products"
          className="inline-flex rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
      <div className="space-y-4">
        <h1 className="text-xl font-semibold text-gray-900">Your cart</h1>
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between rounded-xl border bg-white px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {item.productId?.name || "Product"}
                </p>
                <p className="text-xs text-gray-500">
                  Qty: {item.quantity} · ${item.price.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() =>
                  removeFromCart({
                    userId: user._id,
                    productId: item.productId,
                    variantId: item.variantId,
                  })
                }
                className="text-xs font-medium text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <aside className="space-y-4 rounded-2xl border bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-900">Order summary</h2>
        <div className="flex items-center justify-between text-sm text-gray-700">
          <span>Subtotal</span>
          <span>${total().toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Shipping</span>
          <span>Calculated at checkout</span>
        </div>
        <div className="flex items-center justify-between border-t pt-3 text-sm font-semibold text-gray-900">
          <span>Total</span>
          <span>${total().toFixed(2)}</span>
        </div>
        <button
          onClick={() => navigate("/checkout")}
          className="mt-2 w-full rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          Proceed to checkout
        </button>
      </aside>
    </div>
  );
}