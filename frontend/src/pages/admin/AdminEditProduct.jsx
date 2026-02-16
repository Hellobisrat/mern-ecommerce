import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    axios.get(`/api/products/${id}`).then((res) => {
      setProduct(res.data.product);
    });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(product).forEach((key) => {
      if (key !== "images") data.append(key, product[key]);
    });

    newImages.forEach((img) => data.append("images", img));

    await axios.put(`/api/products/${id}`, data);
    navigate("/admin/products");
  };

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Edit Product</h1>

      <form
        onSubmit={handleUpdate}
        className="bg-white shadow p-6 rounded-lg space-y-4"
      >
        <input
          type="text"
          value={product.name}
          className="w-full p-3 border rounded"
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />

        <input
          type="number"
          value={product.price}
          className="w-full p-3 border rounded"
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />

        <input
          type="text"
          value={product.brand}
          className="w-full p-3 border rounded"
          onChange={(e) => setProduct({ ...product, brand: e.target.value })}
        />

        <textarea
          value={product.description}
          className="w-full p-3 border rounded"
          rows="4"
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />

        <p className="font-semibold">Current Images</p>
        <div className="flex gap-3">
          {product.images?.map((img, i) => (
            <img
              key={i}
              src={img}
              className="w-20 h-20 object-cover rounded"
            />
          ))}
        </div>

        <input
          type="file"
          multiple
          className="w-full"
          onChange={(e) => setNewImages([...e.target.files])}
        />

        <button className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">
          Update Product
        </button>
      </form>
    </div>
  );
}