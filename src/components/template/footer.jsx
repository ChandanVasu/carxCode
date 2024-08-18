import React from 'react';
import { FaTimes, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-100 text-black py-8">
      <div className="px-20 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Company Info */}
          <div className="mb-6 md:mb-0">
             <img src="/logo.svg" alt="" />
            <p className="text-sm">© 2024 Company Name. All rights reserved.</p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <a href="#" className="hover:text-gray-300">Home</a>
            <a href="#" className="hover:text-gray-300">About Us</a>
            <a href="#" className="hover:text-gray-300">Services</a>
            <a href="#" className="hover:text-gray-300">Contact</a>
          </div>

          {/* Social Media Icons */}
          <div className='flex justify-center gap-2 px-1 mt-auto'>
            <div className='bg-[#1877F2] p-2 rounded-full'>
              <FaFacebookF className='text-white text-xl cursor-pointer' />
            </div>
            <div className='bg-[#1DA1F2] p-2 rounded-full'>
              <FaTwitter className='text-white text-xl cursor-pointer' />
            </div>
            <div className='bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#833AB4] p-2 rounded-full'>
              <FaInstagram className='text-white text-xl cursor-pointer' />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
