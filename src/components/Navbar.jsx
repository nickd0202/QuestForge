'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const path = usePathname();
  const links = [
    { href: '/home', label: 'Home' },
    { href: '/tasks', label: 'Tasks' },
    { href: '/inventory', label: 'Inventory' }
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex space-x-4">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  path === href
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
          <div>
            <Link
              href="/settings"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-700 hover:text-white"
            >
              Settings
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
