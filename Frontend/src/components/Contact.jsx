import React from 'react'

const Contact = () => {
  return (
<div>
  <h1 className='text-3xl text-purple-700 flex justify-center my-8 font-semibold'>Feel Free To Contact Us</h1>

  <div className='flex justify-center'>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.261316940833!2d73.91193069678958!3d18.562254000000024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPhoenix%20Marketcity%20Pune!5e0!3m2!1sen!2sin!4v1742145066919!5m2!1sen!2sin"
      width="80%"
      height="350"
      style={{ border: 0, borderRadius: "1rem" }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>

  <div>
    <form className='flex flex-col items-center mt-20 mb-10 gap-6' action="https://formspree.io/f/xqapabbr" method='POST'>

      <input
        className='outline-none border-2 border-purple-400 h-12 w-1/4 px-4 rounded-xl focus:ring-2 focus:ring-purple-500'
        placeholder='Username...'
        type="text"
        name="name"
        autoComplete='off'
        required
      />

      <input
        className='outline-none border-2 border-purple-400 h-12 w-1/4 px-4 rounded-xl focus:ring-2 focus:ring-purple-500'
        placeholder='Email...'
        type="email"
        name="email"
        autoComplete='off'
        required
      />

      <textarea
        className='outline-none border-2 border-purple-400 px-4 py-2 w-1/4 rounded-xl focus:ring-2 focus:ring-purple-500'
        placeholder='Enter Your Message...'
        name="message"
        cols="30"
        rows="8"
        autoComplete='off'
      ></textarea>

      <input
        className='px-10 py-3 bg-purple-600 border-2 border-purple-600 text-white cursor-pointer flex items-center rounded-full hover:text-purple-700 hover:bg-white transition-all duration-300'
        type="submit"
        value="SEND"
      />
    </form>
  </div>
</div>

  )
}

export default Contact