import React from 'react'
import { useState, useEffect } from 'react'
import { ProductState } from '../context/ProductProvider'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const { user, setselectedProduct, selectedProduct, setcartCount, cartCount } = ProductState();
  const [products, setproducts] = useState([])
  const [totalSum, settotalSum] = useState(0)

  const navigate = useNavigate();
  const getProducts = async () => {
    if (user && user.id) {
      await axios.get(`http://localhost:3000/cart/items/${user.id}`)
        .then((response) => {
          setproducts(response.data);
        })
    }
  }

  useEffect(() => {
    if (user && user.id) {
      getProducts();
    }
    // else if (!user) {
    //   navigate("/login")
    // }

  }, [user])

  useEffect(() => {
    const sum = products.reduce(
      (acc, data) => acc + (Number(data.price.replace(/,/g, '')) * data.quantity),
      0
    );
    settotalSum(sum);
  }, [products]);

  const handleSelect = (data) => {
    setselectedProduct(data);
    navigate("/singleproduct")
  }

  const handleDecrease = (id, product_id) => {
    axios.post("http://localhost:3000/cart/decrease", ({ id: id, product_id: product_id }))
      .then((response) => {
        let x = response.data.message;
        if (x === "Click on Delete Button") {
          toast(x, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            getProducts();
          }, 3000);
        }
        else {
          getProducts();
        }
      })
  }

  const handleIncrease = (id, product_id) => {
    axios.post("http://localhost:3000/cart/increase", ({ id: id, product_id: product_id }))
      .then((response) => {
        let x = response.data.message;
        if (x === "Currently Out Of Stock") {
          toast(x, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            getProducts();
          }, 3000);
        }
        getProducts();
      })
  }

  const handleDelete = (id) => {
    axios.post("http://localhost:3000/cart/delete", ({ id: id }))
      .then((response) => {
        let x = response.data.message
        getProducts();
        setcartCount(cartCount => cartCount - 1)

        setTimeout(() => {
          toast(x, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }, 100);
      })
  }

  console.log(totalSum);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce" />
      <ToastContainer />
      <div className='h-screen bg-gray-50'>

      <Navbar />
<div className='block md:flex lg:flex min-h-screen bg-gray-50'>
  <div className='flex flex-col gap-4 px-4 py-5 max-h-screen overflow-y-auto w-full md:w-3/4 lg:w-3/4'>
    {products.length == 0 && <div className='h-full flex justify-center items-center text-4xl text-indigo-500'>Your cart is empty...</div>}
    {products.length > 0 && <div className='w-full flex justify-center mb-6'>
      <h1 className='text-3xl md:text-4xl font-medium text-indigo-800'>My Cart</h1>
    </div>}
    {products && products.map((data, index) => {
      return <div key={index} className='border border-indigo-100 rounded-xl block md:flex lg:flex p-4 md:p-6 lg:p-8 gap-5 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 mb-4'>
        <div className='w-full md:w-1/6 lg:w-1/6 flex justify-center items-center cursor-pointer' onClick={() => { handleSelect(data) }}>
          <img className='w-28 md:w-36 h-auto object-contain' src={data.images[0]} alt={data.name} />
        </div>
        <div className='flex flex-col justify-center w-full md:w-5/6 lg:w-5/6 gap-3 mt-4 md:mt-0'>
          <span className='text-xl md:text-2xl lg:text-3xl font-semibold cursor-pointer w-full flex justify-center md:justify-start lg:justify-start text-indigo-800' onClick={() => { handleSelect(data) }}>{data.name}</span>
          <span className='w-full text-center md:text-left lg:text-left text-gray-600'>{data.description}</span>
          <span className='text-xl md:text-2xl w-full text-center md:text-left lg:text-left font-medium text-indigo-900'>Total Price: ₹{(Number(data.price.replace(/,/g, '')) * data.quantity).toLocaleString('en-IN')}</span>
          <div className='flex gap-5 items-center text-2xl md:text-3xl w-full relative justify-center md:justify-start mt-2'>
            <button className='w-8 h-8 flex justify-center items-center bg-indigo-100 rounded-full hover:bg-indigo-200 transition-colors duration-200 cursor-pointer' onClick={() => { handleDecrease(data.cart_id, data.id) }}>
              <span className='text-indigo-800'>-</span>
            </button>
            <span className='border border-indigo-300 rounded-md px-4 py-1 text-lg md:text-xl bg-indigo-50 text-indigo-800'>{data.quantity}</span>
            <button className='w-8 h-8 flex justify-center items-center bg-indigo-100 rounded-full hover:bg-indigo-200 transition-colors duration-200 cursor-pointer' onClick={() => { handleIncrease(data.cart_id, data.id) }}>
              <span className='text-indigo-800'>+</span>
            </button>
            <button className='absolute right-2 cursor-pointer p-2 rounded-full hover:bg-red-50 transition-colors duration-200' onClick={() => { handleDelete(data.cart_id) }}>
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    })}
  </div>
  <div className='w-full md:w-1/4 flex flex-col py-6 px-4 md:px-6 bg-white shadow-md rounded-xl m-4 md:m-5 h-fit'>
    <h1 className='text-2xl font-semibold text-indigo-800 text-center md:text-left'>Order Summary</h1>
    <div className='border-b border-indigo-100 w-full my-4'></div>
    <div className='w-full flex flex-col gap-3 text-lg'>
      <div className='flex justify-between'>
        <span className='text-gray-600'>Total Items:</span>
        <span className='font-medium'>{products.length}</span>
      </div>
      <div className='flex justify-between'>
        <span className='text-gray-600'>Subtotal:</span>
        <span className='font-medium'>₹ {totalSum.toLocaleString('en-IN')}</span>
      </div>
      
      {totalSum > 50000 ?
        <div className='flex flex-col gap-1 mt-1'>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Shipping:</span>
            <span className='font-medium text-green-600'>Free</span>
          </div>
          <span className='text-sm text-gray-500 italic'>Orders above ₹50,000 qualify for free shipping</span>
        </div>
        : 
        <div className='flex justify-between'>
          <span className='text-gray-600'>Shipping:</span>
          <span className='font-medium'>₹ 200</span>
        </div>
      }

      <div className='border-b border-indigo-100 w-full my-4'></div>
      
      <div className='flex justify-between text-xl md:text-2xl font-semibold text-indigo-900'>
        <span>Total:</span>
        <span>₹ {(totalSum + (totalSum > 50000 ? 0 : 200)).toLocaleString('en-IN')}</span>
      </div>
      
      <div className='w-full flex justify-center mt-6'>
        <button className='w-full py-3 px-6 rounded-full bg-indigo-700 text-white font-medium cursor-pointer hover:bg-indigo-800 transition-colors duration-300 shadow-md hover:shadow-lg'>Place Your Order</button>
      </div>
    </div>
  </div>
</div>
</div>
    </>
  )
}

export default Cart