"use client"

import React, {  useEffect, useState } from 'react';
import Joi from 'joi';
import axios from 'axios'
import { useRouter } from 'next/navigation';



// This component provides the structure and styling for a login form.
// It uses only JSX and Tailwind CSS classes, without any functional logic,
// fulfilling the requirement for a pure presentation layer.

interface LoginUser {
  email: String;
  password: String
}

const schema = Joi.object({
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  .min(3)
  .max(30)
  .required(),
  password: Joi.string()
  .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+,-.]{1,100}$')).min(8),
})

const LoginForm = () => {

  const router = useRouter()

  const [userData, setUserData] = useState<LoginUser>({
    email: "",
    password: ""
  })

  const [errors, setErrors] = useState<any>({})


  const handleInputChange = (e: any) =>{
    const{name, value} = e.target
    setUserData((prev:LoginUser) => ({...prev ,[name]:value}))
    setErrors((prev: any)=> ({...prev, [name]: null}))
  }
  
  useEffect(()=> {
    console.log(errors, 'userdata')
  }, [errors])

  const validate = async (data: any) => {
    let res = false
    try {
      const result = await schema.validateAsync(data)
      console.log(result, 'result')
      res = true
    } catch (error: any) {
      console.log(error.details, 'error')//error details is an array containing object which gives error details it includes context in which there is key and messege
      error.details.map((err: any)=> {
        res = false
        setErrors((prev: any)=> ({ ...prev, [err.context.key]: err.message}))
      })
    }

    return res
  }

  const handleSubmit = async()=>{
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const isValid = await validate(userData) 
    console.log(isValid, 'valid res')
    if (isValid) {
      await axios.post(`${baseUrl}/auth/login`,userData).then(res=> {
        console.log(res.data, 'response')
        localStorage.setItem('access_token',res.data.token)
        router.push('/dashboard')

      }
      ).catch(err=>console.log(err))
    } 
   
  }

  
  return (
    // Main container: Centers the form vertically and horizontally on the screen
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      
      {/* Login Card Container */}
      <div className="bg-white p-8 md:p-10 shadow-2xl rounded-2xl w-full max-w-sm border border-gray-100">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm">
            Sign in to continue to your dashboard.
          </p>
        </div>
        
        {/* Form Fields - No <form> tag used, as per "HTML part without logic" */}
        <div className="space-y-6">
          
          {/* Email Field Group */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleInputChange}
              // The appearance is purely defined by Tailwind classes
              className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
              placeholder="you@example.com"
              // Note: No onChange or value attributes are included
            />
            { errors.email && <span className='text-red-600 text-sm'>{errors.email}</span>}
          </div>

          {/* Password Field Group */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleInputChange}
              // The appearance is purely defined by Tailwind classes
              className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
              placeholder="••••••••"
              // Note: No onChange or value attributes are included
            />
            
            {errors.password && <span>{errors.password}</span>}
          </div>

          {/* Optional: Placeholder for "Forgot Password" or other links */}
          <div className="flex justify-end text-xs">
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition duration-150">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            // The styling focuses on a professional, clickable look
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            // Note: No onClick attribute is included
          >
            Sign In
          </button>
        </div>

        {/* Footer Link/Sign Up Prompt */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Not a member? {' '}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Create an account
          </a>
        </p>

      </div>
    </div>
  );
};

export default LoginForm;
