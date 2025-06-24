import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Character = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <Card className="max-w-md mx-auto">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Character Customization</h2>
          <p>Feature: skin tone, hair style, build selectors coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Character;