import React from 'react';

export function Input({ className = '', ...props }) {
  const base = 'px-3 py-2 border rounded focus:outline-none focus:ring';
  return <input className={`${base} ${className}`} {...props} />;
}
