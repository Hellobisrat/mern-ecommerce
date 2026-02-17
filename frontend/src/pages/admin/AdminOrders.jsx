import { useEffect, useState } from "react";
import api from "../../utils/api.js";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders").then((res) => setOrders(res.data.orders));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Orders</h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">User</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-b">
                <td className="p-3">{o._id}</td>
                <td className="p-3">{o.userId?.name}</td>
                <td className="p-3">${o.total}</td>
                <td className="p-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded">
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}