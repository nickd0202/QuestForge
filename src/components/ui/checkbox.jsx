import React from 'react';

export function Checkbox({ checked, onCheckedChange, ...props }) {
  const handleChange = (e) => {
    if (onCheckedChange) onCheckedChange(e.target.checked);
  };

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={handleChange}
      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
      {...props}
    />
  );
}