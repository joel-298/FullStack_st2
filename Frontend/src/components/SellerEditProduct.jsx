import React, { useEffect, useState } from 'react';
import SellerNavbar from './SellerNavbar';
import Footer from './Footer';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const SellerEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    company: 'Apple',
    images: '',
    quantity: '',
    price: '',
    category: '',
    description: ''
  });

  // Fetch product data on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        const product = response.data;

        setFormData({
          name: product.name,
          company: product.company || 'Apple',
          images: JSON.parse(product.images).join(', '),
          quantity: product.qty,
          price: product.price,
          category: product.category,
          description: product.description
        });
      } catch (err) {
        console.error("Failed to fetch product:", err);
        alert("Unable to load product details ❌");
      }
    };

    fetchProduct();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageArray = formData.images
        .split(",")
        .map(url => url.trim())
        .filter(url => url.length > 0);

      const payload = {
        name: formData.name,
        images: JSON.stringify(imageArray),
        qty: formData.quantity,
        price: formData.price,
        category: formData.category,
        description: formData.description
      };

      const response = await axios.patch(`http://localhost:3000/products/edit/${id}`, payload);

      if (response.status === 200) {
        alert("Product updated successfully ✅");
        navigate("/seller");
      }
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Product not updated ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <SellerNavbar />

      <div className="flex-grow flex items-center justify-center py-10 px-4">
        <form 
          onSubmit={handleSubmit} 
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-indigo-800">Edit Product</h2>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Product Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              required 
              className="w-full border border-gray-300 p-2 rounded" 
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Image URLs (comma separated)</label>
            <input 
              type="text" 
              name="images" 
              value={formData.images}
              onChange={handleChange}
              required 
              className="w-full border border-gray-300 p-2 rounded" 
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Quantity</label>
            <input 
              type="number" 
              name="quantity" 
              value={formData.quantity}
              onChange={handleChange}
              required 
              className="w-full border border-gray-300 p-2 rounded" 
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Price</label>
            <input 
              type="text" 
              name="price" 
              value={formData.price}
              onChange={handleChange}
              required 
              className="w-full border border-gray-300 p-2 rounded" 
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-medium">Category</label>
            <div className="flex flex-wrap gap-4">
              {['Laptop', 'Mobile', 'Watch', 'Accessories'].map((item) => (
                <label key={item} className="flex items-center gap-2 text-gray-600">
                  <input
                    type="radio"
                    name="category"
                    value={item}
                    checked={formData.category === item}
                    onChange={handleChange}
                    required
                    className="accent-indigo-600"
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-gray-700">Description</label>
            <textarea 
              name="description" 
              value={formData.description}
              onChange={handleChange}
              required 
              className="w-full border border-gray-300 p-2 rounded h-24 resize-none" 
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Update Product
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default SellerEditProduct;
