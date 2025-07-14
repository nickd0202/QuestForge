'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import api from '@/lib/axios';

export default function ResetPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async () => {
    try {
      await api.post('/reset-password', { email });
      setMessage('Email sent with reset instructions.');
    } catch {
      setMessage('Failed to send reset email.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="p-6 max-w-sm w-full">
        <CardContent>
          <h1 className="text-xl font-bold mb-4 text-center">Reset Password</h1>
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4"
          />
          <Button className="w-full" onClick={handleReset}>Send Reset Link</Button>
          {message && <p className="mt-4 text-center text-sm">{message}</p>}
        </CardContent>
      </Card>
    </div>
  );
}