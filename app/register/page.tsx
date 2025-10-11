"use client"
import axios from 'axios';
import Joi from 'joi';

import React, { useEffect, useState } from 'react';

// This component provides the complete structure and styling for a sign-up form.
// It is a pure presentation component, containing no React state, event handlers, 
// or external dependencies, making it ready for integration with Next.js logic.
interface SignUpUser {
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  password: String,
  confirmPassword: String,
  terms: boolean | undefined
}
const schema = Joi.object({
  firstName: Joi.string()
  .min(1)
  .max(30)
  .required(),
  lastName: Joi.string()
  .min(1)
  .max(30)
  .required(),
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  .min(3)
  .max(30)
  .required(),
  phone: Joi.string()
  .min(1)
  .max(14)
  .required(),
  password: Joi.string()
  .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+,-.]{1,100}$')).min(8),
  confirmPassword: Joi.any()
  .valid(Joi.ref("password"))
  .required(),
  terms: Joi.boolean()
  .valid(true)
  .required()


})
const SignUpForm = () => {


  const [userData, setUserData] = useState<SignUpUser>({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  terms: false
  })

  const handleInputChange = (e: any) =>{
    const {name, value} = e.target
    setUserData((prev:SignUpUser)=> ({...prev, [name]: value}))
  }

  useEffect(()=>{
    console.log("user data", userData)
  },[userData])

  const [errors, setErrors] = useState<any>({
    
  })
  const validate = async (data: any)=>{
    let res = false
    try {
      const result = await schema.validateAsync(data)
      console.log(result,"---result--")
      res = true
    } catch (error: any) {
      console.log(error.details, "error")
      error.details.map((err: any)=>{
        res = false 
        setErrors((prev: any)=> ({...prev, [err.context.key]:err.message}))
      })
    }
    return res
  }

  const handleSubmit = async ()=> {

    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    console.log("sign up form submitted",userData)
    const isValid = await validate(userData)
    if(isValid){
      await axios.post(`${baseUrl}/auth/register`,userData).then(res =>{
        console.log(res.data,"response")
        localStorage.setItem('access_token', res.data.token)

      }).catch(err=>{
        console.log('hello world')
        console.log(err.response.data.errors, 'errr ')
        if (err?.response?.data?.errors.length > 0) {
          const errorsArr = err?.response?.data?.errors
          errorsArr.map((err: any)=> setErrors((prev: any)=> ({ ...prev, [err.field]: err.message })))
        }
      })
    }
  }
  return (
    // Main container: Centers the form vertically and horizontally on the screen
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      
      {/* Sign Up Card Container - Larger width for more fields */}
      <div className="bg-white p-8 md:p-10 shadow-2xl rounded-2xl w-full max-w-lg border border-gray-100">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-500 text-sm">
            Join us and start your journey today.
          </p>
        </div>
        
        {/* Form Fields Container (Simulated <form>) */}
        <div className="space-y-6">
          
          {/* Name Fields (Two Columns on Desktop/Tablet, Stacked on Mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* First Name */}
            <div>
              <label 
                htmlFor="firstName" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
                placeholder="John"
                onChange={handleInputChange}
              />
              { errors.firstName && <span className='text-red-600 text-sm'>{errors.firstName}</span>}
            </div>

            {/* Last Name */}
            <div>
              <label 
                htmlFor="lastName" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
                placeholder="Doe"
                onChange={handleInputChange}
              />
              { errors.lastName && <span className='text-red-600 text-sm'>{errors.lastName}</span>}
            </div>
          </div>

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
              className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
              placeholder="you@example.com"
              onChange={handleInputChange}
            />
            { errors.email && <span className='text-red-600 text-sm'>{errors.email}</span>}
          </div>
          {/* Phone Field Group */}
          <div>
            <label 
              htmlFor="phone" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
              placeholder="(+91)-xxxxxxxxxx"
              onChange={handleInputChange}
            />
            { errors.phone && <span className='text-red-600 text-sm'>{errors.phone}</span>}
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
              className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
              placeholder="Minimum 8 characters"
              onChange={handleInputChange}
            />
            { errors.password && <span className='text-red-600 text-sm'>{errors.password}</span>}
          </div>

          {/* Confirm Password Field Group */}
          <div>
            <label 
              htmlFor="confirmPassword" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
              placeholder="Re-enter password"
              onChange={handleInputChange}
            />
            { errors.confirmPassword && <span className='text-red-600 text-sm'>{errors.confirmPassword}</span>}
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-start">
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-medium text-gray-700">
               
                <input 
                type= "checkbox"
                id= "terms"
                name="terms"
                checked= {userData.terms} 
                onChange={(e)=>setUserData((prev:any)=> ({...prev, terms:e.target.checked}))}

                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /> 
                  I agree to the terms & condtions*
              </label>
            </div>
            { errors.terms && <span className='text-red-600 text-sm'>{errors.terms}</span>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>

        {/* Footer Link/Sign In Prompt */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account? {' '}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Sign In
          </a>
        </p>

      </div>
    </div>
  );
};

export default SignUpForm;
