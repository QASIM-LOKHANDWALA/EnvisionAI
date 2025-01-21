import React from "react";
import { Navigate, Link, Route, Routes } from "react-router-dom";
import { envisionai } from "./assets";
import { Home, CreatePost, LandingPage, LoginPage, SignupPage } from "./pages";
import { useLogout } from "./hooks/useLogout";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { logout } = useLogout();
  const handelClick = () => {
    logout();
  };

  const { user } = useAuthContext();

  return (
    <>
      <header className="w-full flex justify-between items-center bg-white sm:px-10 px-6 py-4 border-b border-b-[#e6ebf4] shadow-md rounded-b-lg">
        <Link to="/">
          <img src={envisionai} alt="logo" className="w-28 object-contain" />
        </Link>
        <div className="flex items-center space-x-4">
          {user && (
            <button
              onClick={handelClick}
              className="font-inter font-medium text-gray-700 hover:text-gray-900 px-4 py-2 transition-all"
            >
              Logout
            </button>
          )}
          {!user && (
            <Link
              to="/login"
              className="font-inter font-medium bg-teal-700 text-white px-5 py-2 rounded-md hover:bg-teal-600 transition-all"
            >
              Login
            </Link>
          )}
          {user && (
            <Link
              to="/create-post"
              className="font-inter font-medium bg-[#6469ff] text-white px-5 py-2 rounded-md hover:bg-[#4f54cc] transition-all"
            >
              Create
            </Link>
          )}
        </div>
      </header>

      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/create-post"
            element={user ? <CreatePost /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/home" />}
          />
          <Route
            path="/signup"
            element={!user ? <SignupPage /> : <Navigate to="/home" />}
          />
        </Routes>
      </main>

      <footer className="footer bg-white border-t border-gray-200">
        <div className="container mx-auto py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <img
                src={envisionai}
                alt="logo"
                className="footer-logo mb-4 h-8"
              />
              <p className="text-gray-600 mb-4">
                Transform your ideas into stunning AI-generated artwork. Join
                our creative community and explore the endless possibilities of
                AI-powered image generation.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="social-link flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-600 hover:bg-indigo-500 hover:text-white hover:-translate-y-0.5 transition"
                  aria-label="Visit our Facebook page"
                >
                  <i className="bi bi-facebook"></i>
                </a>
                <a
                  href="#"
                  className="social-link flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-600 hover:bg-indigo-500 hover:text-white hover:-translate-y-0.5 transition"
                  aria-label="Follow us on Twitter"
                >
                  <i className="bi bi-twitter"></i>
                </a>
                <a
                  href="#"
                  className="social-link flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-600 hover:bg-indigo-500 hover:text-white hover:-translate-y-0.5 transition"
                  aria-label="Follow us on Instagram"
                >
                  <i className="bi bi-instagram"></i>
                </a>
                <a
                  href="#"
                  className="social-link flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-600 hover:bg-indigo-500 hover:text-white hover:-translate-y-0.5 transition"
                  aria-label="Join our Discord"
                >
                  <i className="bi bi-discord"></i>
                </a>
              </div>
            </div>

            <div>
              <h5 className="footer-title text-gray-800 font-semibold mb-5">
                Quick Links
              </h5>
              <ul className="footer-links space-y-3">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-indigo-500">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create-post"
                    className="text-gray-600 hover:text-indigo-500"
                  >
                    Create
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="footer-title text-gray-800 font-semibold mb-5">
                Resources
              </h5>
              <ul className="footer-links space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-indigo-500">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-indigo-500">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-indigo-500">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-indigo-500">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-indigo-500">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="footer-title text-gray-800 font-semibold mb-5">
                Stay Updated
              </h5>
              <p className="text-gray-600 mb-4">
                Subscribe to our newsletter for the latest updates and AI art
                trends.
              </p>
              <div className="flex">
                <input
                  type="email"
                  className="form-control border border-gray-300 rounded-l-md focus:ring-indigo-500 focus:border-indigo-500 flex-grow"
                  placeholder="Enter your email"
                  aria-label="Email for newsletter"
                />
                <button
                  className="btn bg-indigo-500 text-white px-4 rounded-r-md hover:bg-indigo-600"
                  type="button"
                >
                  Subscribe
                </button>
              </div>
              <div className="contact-info mt-6 space-y-2 text-sm text-gray-600">
                <p>
                  <i className="bi bi-envelope-fill mr-2"></i>
                  support@envisionai.com
                </p>
                <p>
                  <i className="bi bi-geo-alt-fill mr-2"></i>
                  Dahod - 389151, Gujarat, India.
                </p>
              </div>
            </div>
          </div>

          <div className="footer-bottom mt-10">
            <hr className="my-4 border-gray-300" />
            <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
              <p className="text-center md:text-left">
                © 2025 EnvisionAI. All rights reserved.
              </p>
              <ul className="legal-links flex space-x-4 mt-4 md:mt-0">
                <li>
                  <a href="#" className="hover:text-indigo-500">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-500">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-500">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
