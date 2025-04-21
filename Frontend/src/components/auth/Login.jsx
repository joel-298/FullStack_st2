import React from 'react'
import { useState, useRef } from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { ProductState } from '../../context/ProductProvider';
const Login = () => {
  const [form, setform] = useState({ name: "", email: "", password: "" });
  const [action, setaction] = useState("Login")
  const imgRef = useRef();
  const passRef = useRef();

  const {setuser} = ProductState();

  const handleForm = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const navigate = useNavigate();

  const handleLogin = () => {
    axios.post("http://localhost:3000/user/login", { email: form.email, password: form.password })
      .then((response) => {
        let x = response.data.message
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

        if (x == "Login Successful  ✅") {
          localStorage.setItem("userInfo", JSON.stringify(response.data))
          setTimeout(() => {
            setuser(response.data);
            navigate("/")
          }, 3000);
        }
      })
  }

  const handleSignup = () => {
    if (form.password.length > 3 && form.email.includes("@gmail.com") && form.name.length > 0) {
      axios.post("http://localhost:3000/user/signup", form)
        .then((response) => {
          let x = response.data.message;
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
          console.log(response);
        })
    }
    else if (form.password.length <= 3) {
      toast("Minimum 4 digits in password required", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else if (!form.email.includes("@gmail.com")) {
      toast("Enter a valid Email", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else if(form.name.length == 0){
      toast("Username Required " , {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }

  const handleShow = () => {
    if (imgRef.current.src.includes("eyeClose.svg")) {
      imgRef.current.src = "eyeOpen.svg";
      passRef.current.type = "text";
    }

    else {
      imgRef.current.src = "eyeClose.svg";
      passRef.current.type = "password";
    }
  }
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

      <div className='h-screen flex bg-purple-50'>


  <div className='w-full md:w-1/2 lg:w-1/2 flex justify-center items-center m-auto'>
    <div className='w-full md:w-full lg:w-2/3 flex flex-col items-center'>
      <h1 className='text-5xl font-medium mb-6 text-purple-700'>{action}</h1>

      {action === "Sign Up" && (
        <div className='mt-7 w-4/5 text-xl'>
          <label className='text-purple-600'>Name</label>
          <input value={form.name} className='bg-purple-200 w-full h-14 mt-1 px-4 outline-none rounded-xl' placeholder='Enter Name...' type="text" name="name" onChange={handleForm} />
        </div>
      )}

      <div className='mt-7 w-4/5 text-xl'>
        <label className='text-purple-600'>Email</label>
        <input value={form.email} className='bg-purple-200 w-full h-14 mt-1 px-4 outline-none rounded-xl' placeholder='Enter Email...' type="email" name="email" onChange={handleForm} />
      </div>

      <div className='mt-7 w-4/5 text-xl'>
        <label className='text-purple-600'>Password</label>
        <div className='w-full flex items-center relative'>
          <input ref={passRef} value={form.password} className='bg-purple-200 w-full h-14 mt-1 px-4 outline-none rounded-xl' placeholder='Enter Password...' type="password" name="password" onChange={handleForm} />
          <img ref={imgRef} className='right-5 absolute cursor-pointer' src="/eyeClose.svg" alt="" onClick={handleShow} />
        </div>
        <span className='text-sm text-gray-500 cursor-pointer'>Forgot Password?</span>
      </div>

      <div className='mt-8'>
        <button
          className='px-20 py-3 border-2 border-purple-600 bg-purple-600 text-white rounded-full text-2xl hover:text-purple-600 hover:bg-white transition-all duration-300'
          onClick={action === "Login" ? handleLogin : handleSignup}
        >
          {action}
        </button>
      </div>

      <div className='w-4/5 mt-6'>
        <span className='text-gray-500'>
          {action === "Login" ? "I don't have an account? " : "I already have an account? "}
        </span>
        <button
          className='cursor-pointer text-purple-700 font-semibold'
          onClick={() => setaction(action === "Login" ? "Sign Up" : "Login")}
        >
          {action === "Login" ? "Sign up" : "Login"}
        </button>
      </div>
    </div>
  </div>
</div>


    </>
  )
}

export default Login