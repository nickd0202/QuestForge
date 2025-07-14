'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6">
      <h1 className="text-4xl font-bold mb-6">Welcome to QuestForge</h1>
      <div className="space-x-4">
        <Link href="/auth/register">
          <Button>Sign Up</Button>
        </Link>
        <Link href="/auth/login">
          <Button>Login</Button>
        </Link>
      </div>
    </main>
  );
}