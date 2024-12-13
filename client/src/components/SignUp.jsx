import React, { useState } from "react";
import icon from "../public/undraw_welcome_cats_thqn.svg";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "../gqlOperations/mutations";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [signupUser, { data, loading, error}] =useMutation(SIGNUP_USER)

  if(loading) return <p>Loading...</p>

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signupUser({
      variables: {
        userNew: formData,
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {
        error && <p className='text-red-500'>{error.message}</p>
      }
      {
        data && data.user &&
        <div className="bg-green-500 text-blue-950 p-3 rounded-lg text-2xl">User created successfully. You can login now!</div>
      }
      <div className="mb-8">
        <img src={icon} alt="Login Icon" className="w-64 h-auto mt-5" />
      </div>
      <div className="w-full max-w-md p-7 rounded-lg">
        <h2 className="mb-4 text-3xl font-bold text-center text-white">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-lg font-medium text-white">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter First Name"
              required
              onChange={handleChange}
              className="w-full text-black px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-transparent"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-lg font-medium text-white">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter Last Name"
              required
              onChange={handleChange}
              className="w-full px-4 text-black py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-transparent"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-lg font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              onChange={handleChange}
              className="w-full px-4 text-black py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-transparent"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-lg font-medium text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 text-black text-sm border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
          >
            Submit
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;