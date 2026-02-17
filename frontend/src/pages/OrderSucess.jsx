import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Order Placed Successfully
      </h1>

      <p className="text-gray-700 text-lg mb-6">
        Thank you for your purchase. Your order has been received and is being processed.
      </p>

      <a
        href="/"
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
      >
        Continue Shopping
      </a>
    </div>
  );
}