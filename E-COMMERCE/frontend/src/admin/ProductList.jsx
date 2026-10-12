import { useState, useEffect } from "react";
import api from "../api/axios.js";
import { Link } from "react-router";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log("Products not loaded due to an error !", err);
    }
  };

  const deletedProduct = async (id) => {
    try {
      await api.delete(`/products/delete/${id}`);
      alert("Product deleted succsessfully !");
      loadProducts();
    } catch (err) {
      console.log("Product not deleted due to an error !", err);
    }
  };
  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Product List</h2>
        <Link
          to="/admin/products/add"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Product
        </Link>
      </div>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">stock</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="py-2 px-4 border-b">{product.title}</td>
              <td className="py-2 px-4 border-b">
                ₹{Number(product.price).toFixed(2)}
              </td>
              <td className="py-2 px-4 border-b">{product.stock}</td>
              <td className="py-2 px-4 border-b">
                <Link
                  to={`/admin/products/${product._id}/edit`}
                  className="text-blue-500 hover:text-blue-700 mr-4"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deletedProduct(product._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
