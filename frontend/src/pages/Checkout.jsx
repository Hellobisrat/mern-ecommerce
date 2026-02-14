export default function Checkout() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-900">Checkout</h1>
      <p className="text-sm text-gray-600">
        We’ll integrate Stripe here next: payment form, address, and order confirmation.
      </p>
      <div className="rounded-2xl border bg-white p-4 text-sm text-gray-500">
        Placeholder checkout UI. Backend payment route is ready; frontend Stripe integration comes next.
      </div>
    </div>
  );
}