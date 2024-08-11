import React from 'react';
import { Input } from "@nextui-org/react";
import { AiOutlineSearch } from 'react-icons/ai';
import { HiMenuAlt3 } from "react-icons/hi";


const Header = () => {
  return (
    <div className='shadow-md flex justify-between items-center px-16 z-50 sticky top-0 bg-white'>
      <img className='h-14 p-2' src="/logo.png" alt="Logo" />
      <div>
        <ul className='flex gap-6'>
          <li>Home</li>
          <li>Cars</li>
          <li>Search</li>
          <li>Latest</li>
          <li>Popular</li>
        </ul>
      </div>
      <div className='relative w-96'>
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
      <div>
      <HiMenuAlt3 className='text-3xl'/>
      </div>
    </div>
  )
}

export default Header;
