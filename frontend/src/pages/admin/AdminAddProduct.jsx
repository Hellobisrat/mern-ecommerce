import { useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";

export default function AdminAddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    price: "",
    brand: "",
    description: "",
    categoryId: "",
  });

  const [images, setImages] = useState([]);

  const handleNameChange = (e) => {
    const name = e.target.value;

    setForm({
      ...form,
      name,
      slug: slugify(name, { lower: true }), // auto-generate slug
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    images.forEach((img) => data.append("images", img));

    await api.post("/products", data);
    navigate("/admin/products");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Add New Product</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-6 rounded-lg space-y-4"
      >
        {/* Product Name */}
        <input
          type="text"
          placeholder="Product Name"
          className="w-full p-3 border rounded"
          value={form.name}
          onChange={handleNameChange}
        />

        {/* Slug */}
        <input
          type="text"
          placeholder="Slug (auto-generated)"
          className="w-full p-3 border rounded"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          className="w-full p-3 border rounded"
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        {/* Brand */}
        <input
          type="text"
          placeholder="Brand"
          className="w-full p-3 border rounded"
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          className="w-full p-3 border rounded"
          rows="4"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* Images */}
        <input
          type="file"
          multiple
          className="w-full"
          onChange={(e) => setImages([...e.target.files])}
        />

        {/* Image Preview */}
        <div className="flex gap-3 mt-3">
          {images.length > 0 &&
            [...images].map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
          Create Product
        </button>
      </form>
    </div>
  );
}