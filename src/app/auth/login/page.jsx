'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import api from '@/lib/axios';

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post('/login', {
        username,
        password,
        remember: rememberMe,
      });

      // Store token or handle auth logic here
      router.push('/home');
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-sm p-6">
        <CardContent>
          <h1 className="text-xl font-bold mb-4 text-center">Login to QuestForge</h1>
          <div className="space-y-4">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <Checkbox
                  checked={rememberMe}
                  onCheckedChange={() => setRememberMe(!rememberMe)}
                />
                <span className="text-sm">Remember me</span>
              </label>
              <Link href="/auth/reset" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button className="w-full" onClick={handleLogin}>
              Login
            </Button>
            <p className="text-center text-sm mt-2">
              Don’t have an account?{' '}
              <Link href="/auth/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
