import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader, Wand2 } from "lucide-react";
import { useSignup } from "../hooks/useSignup";

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, error, isLoading } = useSignup();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    setLoading(true);
    try {
      await signup(formData.email, formData.password);
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center bg-[#f9fafe] px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="flex justify-center">
            <Wand2 className="h-12 w-12 text-[#6469ff]" />
          </div>
          <h2 className="mt-4 text-4xl font-extrabold text-[#222328]">
            Join EnvisionAI
          </h2>
          <p className="mt-2 text-[#666e75]">
            Start your creative journey with AI-powered image generation
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
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-[#222328]"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#6469ff] focus:border-[#6469ff]"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-[#6469ff] hover:bg-[#5054cc] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6469ff]"
          >
            {loading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              "Create Account"
            )}
          </button>

          <div className="text-center text-sm text-[#666e75]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-[#6469ff] hover:text-[#5054cc]"
            >
              Sign in
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

export default SignupPage;
