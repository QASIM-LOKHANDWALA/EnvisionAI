import React from "react";
import { Navigate, Link, Route, Routes } from "react-router-dom";
import { envisionai } from "./assets";
import { Home, CreatePost, LandingPage, LoginPage, SignupPage } from "./pages";
import { useLogout } from "./hooks/useLogout";
import { useAuthContext } from "./hooks/useAuthContext";
import "bootstrap-icons/font/bootstrap-icons.css";


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

      <footer className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div>
              <img src={envisionai} alt="logo" className="mb-4 h-10" />
              <p className="text-gray-600 mb-4 text-sm">
                Transform your ideas into stunning AI-generated artwork. Join
                our creative community and explore the endless possibilities of
                AI-powered image generation.
              </p>
              <div className="flex space-x-3">
                {["facebook", "twitter", "instagram", "discord"].map(
                  (platform) => (
                    <a
                      key={platform}
                      href="#"
                      className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-600 hover:bg-indigo-500 hover:text-white transition"
                      aria-label={`Follow us on ${platform}`}
                    >
                      <i className={`bi bi-${platform} text-xl`}></i>
                    </a>
                  )
                )}
              </div>
            </div>
            <div>
              <h5 className="text-gray-800 font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2">
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
              <h5 className="text-gray-800 font-semibold mb-4">Resources</h5>
              <ul className="space-y-2">
                {[
                  "Documentation",
                  "Tutorials",
                  "API Reference",
                  "Blog",
                  "Help Center",
                ].map((resource) => (
                  <li key={resource}>
                    <a href="#" className="text-gray-600 hover:text-indigo-500">
                      {resource}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-gray-800 font-semibold mb-4">Contact Us.</h5>
              <div className="text-sm text-gray-600">
                <p>
                  <i className="bi bi-envelope-fill mr-2"></i>
                  support@envisionai.com
                </p>
                <p>
                  <i className="bi bi-geo-alt-fill mr-2"></i>Dahod - 389151,
                  Gujarat, India.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-gray-300 pt-4 text-sm text-gray-600 text-center md:flex md:justify-between">
            <p>© 2025 EnvisionAI. All rights reserved.</p>
            <ul className="flex justify-center space-x-4 mt-3 md:mt-0">
              {["Terms of Service", "Privacy Policy", "Cookie Policy"].map(
                (policy) => (
                  <li key={policy}>
                    <a href="#" className="hover:text-indigo-500">
                      {policy}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default App;
