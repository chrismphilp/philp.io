import React from 'react';
import { AiOutlineGithub, SiLeetcode } from 'react-icons/all';

const Footer = () => {
  return (
    <footer className='flex-1 bg-gray-700 text-gray-100 pt-10 pb-10 border-t border-zinc-100 pt-10'>
      <div className='flex justify-center'>
        <AiOutlineGithub size={35} onClick={() => window.open('https://github.com/chrismphilp')}
                         className='cursor-pointer' />
        <SiLeetcode size={35} onClick={() => window.open('https://leetcode.com/chrismphilp')}
                    className='cursor-pointer text-orange-400' />
      </div>
      <div className='flex justify-center'>© Christopher Philp</div>
    </footer>
  );
};

export default Footer;
