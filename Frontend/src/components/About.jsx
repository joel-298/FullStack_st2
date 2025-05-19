import React from 'react'
import { useNavigate } from 'react-router-dom'

const About = () => {
    const navigate = useNavigate() ; 
    const handleClick = ()=>{
        navigate("/contact")
    } 
    return (
<div className='flex flex-col items-center bg-gray-50 min-h-screen py-8 md:py-12'>
  <h1 className='text-3xl md:text-5xl lg:text-5xl font-medium text-indigo-800 my-6'>
    About Apple
  </h1>

  <div className='w-5/6 border-b-2 border-indigo-200 my-5'></div>
  
  <div className='mt-6 w-5/6 block lg:flex gap-10 items-center'>
    <div className='w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-lg'>
    <img 
        className='w-full h-auto object-cover' 
        src="https://img.freepik.com/free-vector/brainstorming-concept-landing-page_52683-26979.jpg?t=st=1745239938~exp=1745243538~hmac=c6b257c3777005eedcaf30b488b8791e14c8b914dd5819ba59f01d5a4b870549&w=826" 
        alt="About Apple" 
        />
    </div>
    
    <div className='mt-8 lg:mt-0 bg-white p-6 md:p-8 rounded-2xl shadow-md w-full lg:w-1/2'>
      <p className='text-lg md:text-xl text-gray-600 leading-relaxed'>
        Apple is your destination for incredible prices on all your favorite items. We believe in making quality products accessible to everyone through competitive pricing and exceptional service.
      </p>
      
      <p className='text-lg md:text-xl text-gray-600 leading-relaxed mt-4'>
        Founded with a passion for customer satisfaction, we offer a wide range of products from trusted brands, free shipping on orders over ₹50,000, and a commitment to providing you with the best shopping experience possible.
      </p>
      
      <div className='mt-6 flex flex-col md:flex-row gap-4'>
        <div className='flex items-center gap-3'>
          <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <span className='text-indigo-800 font-medium'>Trusted by 50,000+ customers</span>
        </div>
        <div className='flex items-center gap-3'>
          <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span className='text-indigo-800 font-medium'>24/7 customer support</span>
        </div>
      </div>
      
      <div className='mt-8'>
        <button className='py-3 px-8 rounded-full bg-indigo-700 text-white font-medium hover:bg-indigo-800 transition-colors duration-300 shadow-md' onClick={handleClick}>Contact Us</button>
      </div>
    </div>
  </div>
  
  <div className='w-5/6 mt-12 md:mt-16'>
    <div className='bg-indigo-100 rounded-2xl p-6 md:p-8 shadow-md'>
      <h2 className='text-2xl md:text-3xl font-medium text-indigo-800 mb-4'>Our Mission</h2>
      <p className='text-lg text-gray-700 leading-relaxed'>
        ShopSphere is a leading e-commerce platform specializing in electronics, offering a seamless shopping experience for tech enthusiasts and everyday consumers. Our platform features a wide range of high-quality gadgets, including smartphones, laptops, gaming consoles, smart home devices, and accessories from top brands like Apple, Samsung, Sony, Dell, and more. With a user-friendly interface, secure payment gateways, and real-time inventory updates, ShopSphere ensures a smooth and hassle-free shopping journey.At ShopSphere, we prioritize customer satisfaction by providing AI-powered recommendations, 24/7 customer support, and an easy return policy. Our secure transactions, lightning-fast delivery options, and exclusive deals make it convenient for shoppers to find the best technology at unbeatable prices. Whether you're looking for the latest gadgets or budget-friendly electronics, ShopSphere is your go-to destination.Our mission is to redefine the way people shop for electronics by combining innovation, reliability, and affordability. We strive to be the most trusted platform for tech products, ensuring that every purchase is backed by quality and convenience. Explore ShopSphere today and experience the future of electronics shopping! 🚀
      </p>
    </div>
  </div>
</div>
    )
}

export default About


