import { Link, NavLink } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { useCartStore } from "../store/cartStore";

export default function Navbar() {
  const { user, logout } = useUserStore();
  const { items } = useCartStore();

  const cartCount = (items || []).reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-semibold tracking-tight">
          <span className="text-indigo-600">MERN</span>
          <span className="text-gray-900">Store</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium ${
                isActive ? "text-indigo-600" : "text-gray-600 hover:text-gray-900"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `text-sm font-medium ${
                isActive ? "text-indigo-600" : "text-gray-600 hover:text-gray-900"
              }`
            }
          >
            Products
          </NavLink>
          {user?.isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive ? "text-indigo-600" : "text-gray-600 hover:text-gray-900"
                }`
              }
            >
              Admin
            </NavLink>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className="relative rounded-full border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-indigo-500 hover:text-indigo-600"
          >
            Cart
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="text-sm font-medium text-gray-700 hover:text-indigo-600"
              >
                Hi, {user.name}
              </Link>
              <button
                onClick={logout}
                className="rounded-full bg-gray-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-gray-800"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
            >
              Sign in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}