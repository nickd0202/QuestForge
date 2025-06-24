import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Inventory = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <Card className="max-w-md mx-auto">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Inventory</h2>
          <p>Equipped items will appear here. Inventory UI coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;