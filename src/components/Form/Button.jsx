import React from 'react';

const Button = ({ onClick, children }) => {
  return (
    <button 
      className="bg-primary px-4 py-3 rounded-full text-black transition-transform duration-200 hover:bg-primary-dark hover:scale-105 active:scale-95" 
      onClick={onClick}
    >
      {children}
    </button>
  );
};


export default Button;