import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader } from "lucide-react";
import { useLogin } from "../hooks/useLogin";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24$}/;

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, error, isLoading } = useLogin();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.email.match(EMAIL_REGEX)) {
      setLoading(false);
      return;
    }

    try {
      await login(formData.email, formData.password);

      // navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center bg-[#f9fafe]">
      <div className="max-w-md w-full space-y-3 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-[#222328]">
            Welcome Back
          </h2>
          <p className="mt-2 text-[#666e75]">
            Sign in to continue your creative journey
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#222328]"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#6469ff] focus:border-[#6469ff]"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#222328]"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#6469ff] focus:border-[#6469ff]"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#6469ff] focus:ring-[#6469ff] border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-[#666e75]"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-[#6469ff] hover:text-[#5054cc]"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-[#6469ff] hover:bg-[#5054cc] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6469ff]"
          >
            {loading ? <Loader className="w-5 h-5 animate-spin" /> : "Sign In"}
          </button>

          <div className="text-center text-sm text-[#666e75]">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-[#6469ff] hover:text-[#5054cc]"
            >
              Sign up for free
            </Link>
          </div>
        </form>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
