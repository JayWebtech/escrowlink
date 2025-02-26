import React from "react";

const Button = ({
  onClick,
  size = "sm",
  type = "default",
  className = "",
  children,
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={`${
        type === "default"
          ? "bg-primary text-black"
          : "bg-transparent border-2 border-primary text-white"
      } rounded-full transition-transform duration-200 hover:bg-primary-dark hover:scale-105 active:scale-95 ${
        size === "sm" ? "px-4 py-3 text-sm" : "px-8 py-5 text-base"
      } ${className}`}
      onClick={onClick}
      {...props}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
