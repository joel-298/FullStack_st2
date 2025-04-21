import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    // Optional: Extra validation can go here
    try {
      const func = async () => {
        const response = await axios.post('http://localhost:3000/contact_us', { name, email, message }) ; 
        if(response.data.boolean) {
          toast.success("Your response has been recorded!", {
            position: "top-right",
            autoClose: 2000,
            theme: "light",
          });
  
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
        else{
          toast.error("Submission failed. Please try again.", {
            position: "top-right",
            autoClose: 2000,
            theme: "light",
          });
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      };
      func() ; 
    } catch (error) {
      console.log(error) ; 
      toast.error("Submission failed. Please try again.", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  return (
    <div>
      <ToastContainer />
      <h1 className='text-3xl text-purple-700 flex justify-center my-8 font-semibold'>Contact Us</h1>

      <div>
        <form className='flex flex-col items-center mt-20 mb-10 gap-6' onSubmit={handleSubmit}>

          <input
            className='outline-none border-2 border-purple-400 h-12 w-1/4 px-4 rounded-xl focus:ring-2 focus:ring-purple-500'
            placeholder='Username...'
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            autoComplete='off'
            required
          />

          <input
            className='outline-none border-2 border-purple-400 h-12 w-1/4 px-4 rounded-xl focus:ring-2 focus:ring-purple-500'
            placeholder='Email...'
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete='off'
            required
          />

          <textarea
            className='outline-none border-2 border-purple-400 px-4 py-2 w-1/4 rounded-xl focus:ring-2 focus:ring-purple-500'
            placeholder='Enter Your Message...'
            name="message"
            value={formData.message}
            onChange={handleChange}
            cols="30"
            rows="8"
            autoComplete='off'
            required
          ></textarea>

          <button
            type="submit"
            className='py-3 px-8 rounded-full bg-indigo-700 text-white font-medium hover:bg-indigo-800 transition-colors duration-300 shadow-md'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
