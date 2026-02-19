import { Link, NavLink } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { useCartStore } from "../store/cartStore";
import  {ShoppingCart, Menu} from 'lucide-react'
import { useState } from "react";
export default function Navbar() {
  const { user, logout } = useUserStore();
  const [open,setOpen]= useState(false);
  const { items } = useCartStore();

  const cartCount = (items || []).reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="border-b bg-purple-50/80 backdrop-blur">
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

        <div className=" hidden sm:flex items-center gap-4">
          <Link
            to="/cart"
            className="relative rounded-full border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-indigo-500 hover:text-indigo-600"
          >
            <ShoppingCart className='w-5 h-5 sm:w-7 sm:h-7 text-purple-600/60 ' />
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
        <div className=" flex flex-col">
        <Menu onClick={()=>setOpen((prev)=>!prev)} className="block sm:hidden w-9 h-9 p-1.5 hover:bg-purple-400/50 rounded-full border border-blue-50/20"/>
        
          { open && <div className=" absolute top-10 right-0 w-30 px-4 sm:hidden justify-center items-center bg-purple-100/95 backdrop-blur-sm shadow-lg p-4 flex flex-col rounded-lg z-50">
              <ul className="space-y-2">
                <li>
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
          </li>
          <li>
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
          </li>
                <li>
                  <Link
                    to="/cart"
                     className="relative rounded-full border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:border-indigo-500 hover:text-indigo-600"
                     >
                   <ShoppingCart className='w-5 h-5 sm:w-7 sm:h-7 text-purple-600/60 ' />
                   </Link>
                </li>
                <li> 
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
              className="rounded-full bg-indigo-300/95 px-1.5 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
            >
              Sign in
            </Link>
          )}
                </li>
               
              </ul>
            </div> }

          
        
       </div>
      </nav>
    </header>
  );
}