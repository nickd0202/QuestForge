'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await api.post('/logout');
    router.push('/auth/login');
  };

  return (
    <main className="min-h-screen p-6 bg-background text-foreground">
      <Card className="max-w-md mx-auto">
        <CardContent>
          <h1 className="text-xl font-bold mb-4">Settings</h1>
          <ul className="space-y-3">
            <li>
              <Link
                href="/character"
                className="text-blue-600 hover:underline"
              >
                Character
              </Link>
            </li>
            <li>
              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </li>
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}