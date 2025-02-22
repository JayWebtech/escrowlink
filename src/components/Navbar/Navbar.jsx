import React from 'react'
import Button from '../Form/Button'

const Navbar = () => {
  return (
    <div className='container mx-auto px-4 sm:px-10 md:px-8 lg:px-16 pt-5'>
      <div className="flex justify-between items-center backdrop-blur-xl py-3 px-5 rounded-full border-[1px] border-[#1e1e1e]">
        <div className="logo">
          <h1 className="text-2xl font-bold text-white font-bricolage"><span className='text-primary font-bricolage'>Escrow</span>Link</h1>
        </div>
        <div className="nav">
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="text-white">Home</a>
            </li>
            <li>
              <a href="/about" className="text-white">About</a>
            </li>
            <li>
              <a href="/services" className="text-white">Services</a>
            </li>
            <li>
              <a href="/contact" className="text-white">Contact</a>
            </li>
          </ul>
        </div>
        <Button>Get Started</Button>
      </div>
    </div>
  )
}

export default Navbar
