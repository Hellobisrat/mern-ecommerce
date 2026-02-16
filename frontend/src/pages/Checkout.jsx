import { useState } from "react";
import { useCartStore } from "../store/cartStore";
import { useUserStore } from "../store/userStore";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { items, total, clearCart } = useCartStore();
  const { user } = useUserStore();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [shipping, setShipping] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // 1. Create PaymentIntent
      const res = await api.post("/payment/create-payment-intent", {
        amount: Math.round(total() * 100),
      });

      const clientSecret = res.data.clientSecret;

      // 2. Confirm payment
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: { name: shipping.name },
          },
        }
      );

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      // 3. Create order in backend
      await api.post("/orders", {
        userId: user._id,
        items,
        shippingAddress: shipping,
        payment: { method: "card" },
        totals: {
          subtotal: total(),
          tax: 0,
          shipping: 0,
          discount: 0,
          grandTotal: total(),
        },
      });

      // 4. Clear cart
      clearCart();

      // 5. Redirect to success page
      navigate("/order-success");
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900">Checkout</h1>

      {/* Shipping Form */}
      <div className="bg-white p-4 rounded-xl border space-y-3">
        <h2 className="text-lg font-semibold">Shipping Information</h2>

        {Object.keys(shipping).map((key) => (
          <input
            key={key}
            type="text"
            placeholder={key}
            className="w-full p-3 border rounded"
            onChange={(e) =>
              setShipping({ ...shipping, [key]: e.target.value })
            }
          />
        ))}
      </div>

      {/* Payment */}
      <div className="bg-white p-4 rounded-xl border space-y-3">
        <h2 className="text-lg font-semibold">Payment</h2>
        <CardElement className="p-3 border rounded" />
      </div>

      {/* Summary */}
      <div className="bg-white p-4 rounded-xl border space-y-2">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        <p className="text-sm">Subtotal: ${total().toFixed(2)}</p>
        <p className="text-sm font-semibold">
          Total: ${total().toFixed(2)}
        </p>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-500"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}