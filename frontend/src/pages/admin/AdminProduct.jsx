import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from '../../utils/api.js'


export default function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        setProducts(res.data.products || []); // fallback
      })
      .catch(() => {
        setProducts([]); // prevent crash
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Products</h1>
        <Link
          to="/admin/products/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add Product
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Brand</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}

            {products.map((p) => (
              <tr key={p._id} className="border-b">
                <td className="p-3">
                  <img
                    src={p.images?.[0]}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-3">{p.name}</td>
                <td className="p-3">${p.price}</td>
                <td className="p-3">{p.brand}</td>
                <td className="p-3">
                  <Link
                    to={`/admin/products/${p._id}`}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}