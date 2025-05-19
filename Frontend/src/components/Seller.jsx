import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SellerNavbar from './SellerNavbar';

const Seller = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/products/");
      setProducts(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  const handleEdit = (e, id) => {
    e.stopPropagation();
    navigate(`/seller/edit/${id}`);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:3000/products/delete/${id}`);
        setProducts(products.filter(product => product.id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading && products.length === 0) {
    return (
      <div>
        <SellerNavbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-indigo-800 font-medium">Loading products...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error && products.length === 0) {
    return (
      <div>
        <SellerNavbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <p className="text-red-600 font-medium text-lg">{error}</p>
            <button 
              onClick={getProducts}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SellerNavbar />

      <div className="flex-grow py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-indigo-800">
              Best Sellers
            </h1>
            <button 
              onClick={() => navigate('/seller/add')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Add Product
            </button>
          </div>

          {products.length === 0 && !loading ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600 text-lg">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
                  onClick={() => handleView(product)}
                >
                  <div className="p-4 flex justify-center bg-gray-50">
                    <img
                      src={product.images && product.images[0]}
                      alt={product.name}
                      className="h-48 object-contain"
                    />
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-indigo-800 mb-1">{product.name}</h3>
                    <p className="text-gray-500 text-sm">{product.company}</p>
                    <p className="text-xl font-bold text-indigo-900 mt-2">₹ {product.price}</p>
                    
                    <div className="mt-4 flex justify-between gap-2">
                      <button 
                        onClick={(e) => handleEdit(e, product.id)}
                        className="flex-1 py-2 px-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-md flex items-center justify-center gap-1 transition-colors"
                      >
                        ✏️
                        <span>Edit</span>
                      </button>
                      <button 
                        onClick={(e) => handleDelete(e, product.id)}
                        className="flex-1 py-2 px-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-md flex items-center justify-center gap-1 transition-colors"
                      >
                        🗑️
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Seller;
