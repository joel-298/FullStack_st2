import React from 'react'
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ProductState } from '../context/ProductProvider'
const Home = () => {

  const{setselectedProduct} = ProductState()

  const image = [
    '/front1.png',
    'front2.png',
    '/front3.png'
  ]

  const [background, setbackground] = useState(image[0])
  const [product, setproduct] = useState([])

  const getProducts = async()=>{
    await axios.get("http://localhost:3000/products/")
    .then((response)=>{
      setproduct(response.data);
    })
  }

  useEffect(() => {
    let i = 0;
    setInterval(() => {
      i = (i + 1) % image.length;
      setbackground(image[i]);
    }, 3000);

    getProducts();
  }, []);

  const navigate = useNavigate();
  const handleContact = () => {
    navigate("/contact");
  }

  const handleView = ()=>{
    navigate("/products");
  }

  const handleSelect = (data) => {
    setselectedProduct(data);
    navigate("/singleproduct")
  }

  return (
    <>
    <Navbar />
          <div className='min-h-screen w-full flex flex-col md:flex-row transition-all duration-1000 ease-in-out relative bg-gradient-to-r from-indigo-100 to-purple-100 py-10 md:py-0'>
            <div className='w-full md:w-3/5 flex flex-col items-center justify-center font-medium px-4 md:px-0'>
              <h1 className='text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-indigo-800 text-center'>Incredible Prices</h1>
              <br />
              <h1 className='text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-indigo-800 text-center'>on All Your</h1>
              <br />
              <h1 className='text-3xl sm:text-4xl md:text-6xl lg:text-8xl text-indigo-800 text-center'>Favorite Items</h1>
              <p className='mt-8 md:mt-16 text-lg sm:text-xl md:text-2xl w-full sm:w-3/4 md:w-1/2 text-indigo-600 text-center'>Get more for less on selected brands</p>
    
              <div className='w-full sm:w-3/4 md:w-1/2 mt-8 md:mt-12 flex justify-center'>
                <button className='border-2 border-indigo-700 px-6 sm:px-8 md:px-10 py-2 md:py-3 lg:py-4 text-base sm:text-lg md:text-xl rounded-full bg-indigo-700 text-white cursor-pointer hover:bg-white hover:text-indigo-700 transition-all duration-300' onClick={handleView}>Shop Now</button>
              </div>
            </div>
            
            <div className='w-full md:w-2/5 flex items-center justify-center mt-8 md:mt-0'>
              <svg className="w-4/5 h-64 md:h-auto" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                {/* Shopping Cart SVG - responsive version */}
                <g>
                  <path d="M140,320 L380,320 L400,170 L120,170" fill="none" stroke="#4338ca" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="180" cy="350" r="18" fill="#6366f1" stroke="#4338ca" strokeWidth="4" />
                  <circle cx="340" cy="350" r="18" fill="#6366f1" stroke="#4338ca" strokeWidth="4" />
                </g>
                <g>
                  <rect x="200" y="200" width="40" height="40" rx="5" fill="#818cf8" stroke="#4338ca" strokeWidth="2" />
                  <rect x="250" y="220" width="30" height="30" rx="5" fill="#a5b4fc" stroke="#4338ca" strokeWidth="2" />
                </g>
                <g>
                  <path d="M120,220 L130,220 M125,215 L125,225" stroke="#f9a8d4" strokeWidth="3" strokeLinecap="round" />
                  <path d="M380,220 L390,220 M385,215 L385,225" stroke="#f9a8d4" strokeWidth="3" strokeLinecap="round" />
                </g>
              </svg>
            </div>
          </div>

    
          <div className='my-4 md:my-8 bg-gray-50 py-6 md:py-8'>
            <h1 className='w-full flex justify-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-indigo-800 px-4 text-center'>Best Sellers</h1>
            <div className='w-full overflow-x-auto flex gap-4 sm:gap-6 px-4 sm:px-6 md:px-10 mt-6 md:mt-8'>
              {product && product.slice(0, 4).map((data,index)=>{
                return <div key={index} className='border border-gray-200 my-3 rounded-3xl flex flex-col items-center w-full py-4 md:py-6 cursor-pointer md:w-1/3 lg:w-1/3 shrink-0 bg-white hover:shadow-xl transition-shadow duration-300 px-4' onClick={()=>{handleSelect(data)}}>
                    <div className="w-full flex justify-center">
                      <img className='w-3/4 sm:w-2/3 md:w-2/4 h-auto object-contain' src={data.images[0]} alt={data.name} />
                    </div>
                  <div className='flex flex-col mt-3 md:mt-4 items-center'>
                    <span className='text-xl md:text-2xl text-indigo-800 text-center'>{data.name}</span>
                    <span className='font-light text-gray-500 text-center'>{data.company}</span>
                    <span className='text-xl md:text-2xl font-bold text-indigo-900 mt-1'>₹ {data.price}</span>
                  </div>
                </div>
              })}
            </div>
            <div className='w-full flex justify-center mt-8 md:mt-12'>
              <button className='border-2 border-indigo-600 px-8 sm:px-10 md:px-12 py-2 sm:py-2.5 md:py-3 text-base sm:text-lg md:text-xl font-medium rounded-full bg-indigo-600 text-white hover:text-indigo-600 hover:bg-white cursor-pointer transition-all duration-300' onClick={handleView}>View All</button>
            </div>
          </div>
    
          <div className='text-white bg-indigo-900 flex flex-col md:flex-row'>
            <div className='w-full md:w-2/5 flex flex-col justify-center items-center px-4 md:pl-4 py-8 md:py-6'>
              <h1 className='text-2xl sm:text-3xl md:text-4xl font-medium text-center'>Need Help? Check Out Our Help Center</h1>
              <span className='mt-6 md:mt-10 text-indigo-100 text-center'>Click here to Contact Us</span>
              <button className='py-2 sm:py-2.5 md:py-3 px-6 sm:px-7 md:px-8 border-2 border-white mt-4 md:mt-6 rounded-full bg-white text-indigo-900 hover:text-white hover:bg-transparent transition-all duration-300 cursor-pointer' onClick={handleContact}>Contact Us</button>
            </div>
            <div className='w-full md:w-3/5 hidden md:flex justify-end bg-indigo-800 py-6'>
              <svg className="w-full h-full max-h-72 md:max-h-full" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,0 L800,0 L800,600 L0,600 L0,0 Z" fill="#4338ca" />
                <circle cx="400" cy="300" r="200" fill="#6366f1" />
                <circle cx="400" cy="300" r="150" fill="#818cf8" />
                <circle cx="400" cy="300" r="100" fill="#a5b4fc" />
                <circle cx="400" cy="300" r="50" fill="#c7d2fe" />
              </svg>
            </div>
          </div>
          <Footer />
    </>
  )
}

export default Home