import React from 'react';


export function Button({ children, variant = 'default', className = '', ...props }) {
  const base = 'px-4 py-2 rounded shadow focus:outline-none';
  const variants = {
    default: 'bg-blue-600 hover:bg-blue-700 text-white',
    destructive: 'bg-red-600 hover:bg-red-700 text-white',
  };
  const classes = `${base} ${variants[variant]} ${className}`;
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
