import React from 'react';
import { Image } from '@nextui-org/react';
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-100 text-black pt-12 px-6 md:px-20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Company Info */}
          <div className="flex flex-col items-center md:items-start w-full md:w-1/3 ">
            <Image src="/logo.svg" alt="CarX Logo" width={120} height={40} />
            <p className="mt-4 text-center md:text-left text-gray-700">
              Unlock unbeatable offers on the newest models and take the wheel of your dream car today.
            </p>
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              <div className="bg-[#1877F2] p-2 rounded-full">
                <FaFacebookF className="text-white text-xl cursor-pointer" />
              </div>
              <div className="bg-[#1DA1F2] p-2 rounded-full">
                <FaTwitter className="text-white text-xl cursor-pointer" />
              </div>
              <div className="bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#833AB4] p-2 rounded-full">
                <FaInstagram className="text-white text-xl cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="w-full md:w-1/3 flex flex-col md:flex-row justify-around">
            <div className="flex flex-col gap-4 text-center md:text-left">
              <h3 className="font-bold text-lg text-gray-900 mb-0">Quick Links</h3>
              <a href="#" className="hover:text-gray-500">Home</a>
              <a href="#" className="hover:text-gray-500">About Us</a>
              <a href="#" className="hover:text-gray-500">Services</a>
              <a href="#" className="hover:text-gray-500">Contact</a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="w-full md:w-1/3 text-center md:text-left">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Contact Us</h3>
            <p className="flex items-center justify-center md:justify-start text-gray-700 mb-2">
              <FaMapMarkerAlt className="mr-2" /> 123 Dream Car Avenue, CA 98765
            </p>
            <p className="flex items-center justify-center md:justify-start text-gray-700 mb-2">
              <FaEnvelope className="mr-2" /> info@carx.com
            </p>
            <p className="flex items-center justify-center md:justify-start text-gray-700 mb-2">
              <FaPhoneAlt className="mr-2" /> (123) 456-7890
            </p>
          </div>
        </div>
        <p className="text-center md:text-left text-sm text-gray-600 mt-8">
          © 2024 CarX. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
