import React, { useState } from "react";
import icon from "../public/undraw_mobile_login_re_9ntv.svg";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../gqlOperations/mutations";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const [signinUser, {data, loading, error}] = useMutation(LOGIN_USER);
  if(loading) return <p>Loading...</p>
  if(data){
    localStorage.setItem("token", data.user.token);
    navigate("/profile")
  }


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signinUser({
      variables: {
        userSignin: formData,
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {
        error && <p className='text-red-500 mb-8 text-3xl'>{error.message} !!</p>
      }
      <div className="mb-8">
        <img src={icon} alt="Login Icon" className="w-64 h-auto" />
      </div>
      <div className="w-full max-w-md p-8 rounded-lg">
        <h2 className="mb-6 text-3xl font-bold text-center text-white">LogIn Here</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-xl font-medium text-white">
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
            <label htmlFor="password" className="mb-1 text-xl font-medium text-white">
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
            Log In
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account?{' '}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

