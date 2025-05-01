// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const isMobile = window.innerWidth < 1024;

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('#dropdownWrapper')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const showMobileToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div
      className="min-h-screen text-white overflow-y-auto bg-[#0a0f2c]"
      
    >
      {/* Toast Message */}
      {showToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded z-50">
          Please sign up or sign in on the web.
        </div>
      )}

      {/* Sticky App Bar */}
      <div className="sticky top-0 z-50">
        <nav className="w-full bg-gradient-to-b from-black/70 to-transparent pt-[30px] px-[35px] pb-3 min-h-[130px]">
          <div className="flex flex-col lg:grid lg:grid-cols-3 lg:items-center">
            {/* Left: App Name */}
            <div className="flex justify-between items-center w-full lg:justify-start">
              <div className="text-xl font-bold">FilmAF</div>

              {/* Mobile-only Log In */}
              {isMobile && (
                <button
                  onClick={showMobileToast}
                  className="bg-white text-black px-5 py-2 rounded-[12px] font-medium hover:bg-gray-100 transition block lg:hidden"
                >
                  Log In
                </button>
              )}
            </div>

            {/* Center: Dropdown */}
            <div id="dropdownWrapper" className="relative flex justify-center mt-[30px] lg:mt-0">
              <button
                onClick={toggleDropdown}
                className={`flex items-center gap-2 px-4 py-2 text-white font-medium rounded-md transition relative z-50 ${
                  isDropdownOpen ? 'bg-[#5c3ee8]' : 'backdrop-blur-md bg-white/10'
                }`}
              >
                About Us
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="dropdown-menu absolute left-1/2 transform -translate-x-1/2 top-full mt-1 z-50 w-56 bg-[#5c3ee8] text-white rounded-[35px] shadow-lg flex flex-col p-6 gap-2 text-sm font-medium">
                  <Link to="/">About Us</Link>
                  <Link to="/signup">More</Link>
                </div>
              )}
            </div>

            {/* Right: Desktop Log In */}
            <div className="hidden lg:flex justify-end">
            <Link to="/auth" className="bg-white text-black px-5 py-2 rounded-[12px] font-medium hover:bg-gray-100 transition">
                Log In
            </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Page Body */}
      <main className="p-6 mt-6 space-y-6">
        <div className="backdrop-blur-md bg-white/10 p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-2">About Us</h1>
          <p className="text-white/90">
            FilmAF empowers African storytellers by providing collaboration, access, and the tools to produce world-class film projects.
          </p>
        </div>

        <div className="h-[1000px] backdrop-blur-sm bg-white/5 rounded-lg p-6">
          Scrollable content block
        </div>
      </main>
    </div>
  );
};

export default Home;
