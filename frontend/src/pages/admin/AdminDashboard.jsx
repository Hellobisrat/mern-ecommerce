import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Manage products, orders, and users from one place.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Link
          to="/admin/products"
          className="group rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-all"
        >
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
            Manage Products
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Add, edit, and organize your store products.
          </p>
        </Link>

        <Link
          to="/admin/orders"
          className="group rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-all"
        >
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
            Manage Orders
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            View and update customer orders.
          </p>
        </Link>

        <Link
          to="/admin/users"
          className="group rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition-all"
        >
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
            Manage Users
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            View and manage registered users.
          </p>
        </Link>
      </div>
    </div>
  );
}