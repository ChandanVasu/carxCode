"use client";
import React, { useState } from 'react';
import { Input } from "@nextui-org/react";
import { AiOutlineSearch } from 'react-icons/ai';
import { HiMenuAlt3 } from "react-icons/hi";
import { FaTimes, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useRouter } from 'next/navigation'; // Import the useRouter hook from Next.js
import Link from 'next/link';

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter(); // Initialize the useRouter hook

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const onSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search/${searchQuery}`);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className='shadow-1 flex justify-between items-center px-4 py-0 sm:px-8 md:px-16 z-50 sticky top-0 bg-white'>
        <Link href="/"><img className='h-12 sm:h-12 p-2 cursor-pointer' src="/logo.svg" alt="Logo" /></Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex'>
          <ul className='flex gap-4 sm:gap-6'>
            <Link href="/"><li className='hover:text-primary cursor-pointer'>Home</li></Link>
            <Link href="/cars"><li className='hover:text-primary cursor-pointer'>Cars</li></Link>
            <Link href="#search-fliter"><li className='hover:text-primary cursor-pointer'>Search</li></Link>
            <Link href="/blog/66c6eeef6fd2b5788b909128"><li className='hover:text-primary cursor-pointer'>About Us</li></Link>
            <Link href="/blog/66c6f093dc2c7f86bdc18469"><li className='hover:text-primary cursor-pointer'>Contact Us</li></Link>
          </ul>
        </div>

        {/* Desktop Search with Social Media Icons */}
        <div className='relative w-48 sm:w-64 md:w-96 hidden md:flex items-center gap-4'>
          <div className='relative w-full'>
            <Input
              type="text"
              color='primary'
              placeholder='Search...'
              size='md'
              radius='md'
              className='w-full'
              value={searchQuery}
              onChange={handleInputChange} // Update the state on input change
              onKeyDown={(e) => e.key === 'Enter' && onSearch()} // Handle Enter key press
            />
            <AiOutlineSearch 
              className='absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer' 
              size={20} 
              onClick={onSearch} // Trigger search on icon click
            />
          </div>
          {/* Social Media Icons */}
          <div className='flex justify-center gap-2 px-1 mt-auto'>
            <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <div className='bg-[#1877F2] p-2 rounded-full'>
                <FaFacebookF className='text-white text-xl cursor-pointer' />
              </div>
            </Link>
            <Link href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <div className='bg-[#1DA1F2] p-2 rounded-full'>
                <FaTwitter className='text-white text-xl cursor-pointer' />
              </div>
            </Link>
            <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <div className='bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#833AB4] p-2 rounded-full'>
                <FaInstagram className='text-white text-xl cursor-pointer' />
              </div>
            </Link>
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
          <img className='h-10 cursor-pointer' src="/logo.svg" alt="Logo" onClick={toggleSidebar} />
          <FaTimes className='text-2xl cursor-pointer' onClick={toggleSidebar} />
        </div>
        <div className='relative p-4'>
          <Input
            type="text"
            color='primary'
            placeholder='Search...'
            size='md'
            radius='md'
            className='w-full'
            value={searchQuery}
            onChange={handleInputChange} // Update the state on input change
            onKeyDown={(e) => e.key === 'Enter' && onSearch()} // Handle Enter key press
          />
          <AiOutlineSearch 
            className='absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer' 
            size={20} 
            onClick={onSearch} // Trigger search on icon click
          />
        </div>
        <ul className='flex flex-col gap-4 p-4'>
          <Link href="/"><li className='hover:text-primary cursor-pointer' onClick={toggleSidebar}>Home</li></Link>
          <Link href="/cars"><li className='hover:text-primary cursor-pointer' onClick={toggleSidebar}>Cars</li></Link>
          <Link href="/blog/66c6f093dc2c7f86bdc18469"><li className='hover:text-primary cursor-pointer' onClick={toggleSidebar}>Contact Us</li></Link>
          <Link href="/blog/66c6eeef6fd2b5788b909128"><li className='hover:text-primary cursor-pointer' onClick={toggleSidebar}>About Us</li></Link>
        </ul>

        {/* Mobile Sidebar Footer with Social Media Icons */}
        <div className='flex justify-center gap-6 p-4 mt-auto border-t border-gray-200'>
          <Link href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <div className='bg-[#1877F2] p-2 rounded-full'>
              <FaFacebookF className='text-white text-xl cursor-pointer' />
            </div>
          </Link>
          <Link href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <div className='bg-[#1DA1F2] p-2 rounded-full'>
              <FaTwitter className='text-white text-xl cursor-pointer' />
            </div>
          </Link>
          <Link href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <div className='bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#833AB4] p-2 rounded-full'>
              <FaInstagram className='text-white text-xl cursor-pointer' />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;
