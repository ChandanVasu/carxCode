"use client";
import React, { useState } from 'react';
import { Input } from "@nextui-org/react";
import { AiOutlineSearch } from 'react-icons/ai';
import { HiMenuAlt3 } from "react-icons/hi";
import { FaTimes, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div className='shadow-1 flex justify-between items-center px-4 py-0 sm:px-8 md:px-16 z-50 sticky top-0 bg-white'>
        <Link href="/"><img className='h-14 sm:h-14 p-2 cursor-pointer' src="/logo.png" alt="Logo" /></Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex'>
          <ul className='flex gap-4 sm:gap-6'>
            <Link href="/"><li className='hover:text-primary cursor-pointer'>Home</li></Link>
            <Link href="/cars"><li className='hover:text-primary cursor-pointer'>Cars</li></Link>
            <li className='hover:text-primary cursor-pointer'>Search</li>
            <li className='hover:text-primary cursor-pointer'>Latest</li>
            <li className='hover:text-primary cursor-pointer'>Popular</li>
          </ul>
        </div>

        {/* Desktop Search with Social Media Icons */}
        <div className='relative w-48 sm:w-64 md:w-96 hidden md:flex items-center gap-4'>
          <div className='relative w-full'>
            <Input
              type="Input"
              color='primary'
              placeholder='Search...'
              size='md'
              radius='md'
              className='w-full'
            />
            <AiOutlineSearch className='absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500' size={20} />
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

        {/* Mobile Menu Icon */}
        <div className='md:hidden'>
          <HiMenuAlt3 className='text-3xl cursor-pointer' onClick={toggleSidebar} />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity ${sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} md:hidden`} onClick={toggleSidebar}></div>
      <div className={`fixed top-0 right-0 w-[90%] h-full bg-white shadow-lg z-50 transform transition-transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className='flex justify-between items-center p-4'>
          <img className='h-10 cursor-pointer' src="/logo.png" alt="Logo" onClick={toggleSidebar} />
          <FaTimes className='text-2xl cursor-pointer' onClick={toggleSidebar} />
        </div>
        <div className='relative p-4'>
          <Input
            type="Input"
            color='primary'
            placeholder='Search...'
            size='md'
            radius='md'
            className='w-full'
          />
          <AiOutlineSearch className='absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500' size={20} />
        </div>
        <ul className='flex flex-col gap-4 p-4'>
          <Link href="/"><li className='hover:text-primary cursor-pointer' onClick={toggleSidebar}>Home</li></Link>
          <Link href="/cars"><li className='hover:text-primary cursor-pointer' onClick={toggleSidebar}>Cars</li></Link>
          <li className='hover:text-primary cursor-pointer' onClick={toggleSidebar}>Search</li>
          <li className='hover:text-primary cursor-pointer' onClick={toggleSidebar}>Latest</li>
          <li className='hover:text-primary cursor-pointer' onClick={toggleSidebar}>Popular</li>
        </ul>

        {/* Mobile Sidebar Footer with Social Media Icons */}
        <div className='flex justify-center gap-6 p-4 mt-auto border-t border-gray-200'>
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
    </>
  );
}

export default Header;
