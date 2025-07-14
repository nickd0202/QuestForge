'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import api from '@/lib/axios';

const slots = ['Head', 'Weapon', 'Chest', 'Legs', 'Feet'];

export default function InventoryPage() {
  const [equipped, setEquipped] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slotItems, setSlotItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEquipped();
  }, []);

  const fetchEquipped = async () => {
    try {
      const res = await api.get('/inventory');
      setEquipped(res.data);
    } catch (err) {
      console.error('Failed to fetch equipped items', err);
    }
  };

  const handleSlotClick = async (slot) => {
    setSelectedSlot(slot);
    try {
      const res = await api.get('/inventory/items', { params: { slot } });
      setSlotItems(res.data);
    } catch (err) {
      console.error('Failed to fetch items for slot', err);
    }
  };

  const handleEquip = async (item) => {
    try {
      await api.post('/inventory/equip', { slot: selectedSlot, itemId: item.id });
      setEquipped((prev) => ({ ...prev, [selectedSlot]: item }));
    } catch (err) {
      console.error('Equip failed', err);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-background text-foreground space-y-6">
      <h1 className="text-2xl font-bold text-center">Inventory</h1>

      {/* Equipment Slots Grid */}
      <Card className="max-w-2xl mx-auto">
        <CardContent className="grid grid-cols-5 gap-4">
          {slots.map((slot) => (
            <div key={slot} className="flex flex-col items-center space-y-2">
              <div
                className="w-16 h-16 bg-gray-200 dark:bg-gray-700 flex items-center justify-center cursor-pointer rounded"
                onClick={() => handleSlotClick(slot)}
              >
                {equipped[slot]?.name || slot}
              </div>
              <span className="text-sm">{slot}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Slot Items List */}
      {selectedSlot && (
        <Card className="max-w-2xl mx-auto">
          <CardContent className="space-y-4">
            <h2 className="text-lg font-semibold">Available {selectedSlot} Items</h2>
            {slotItems.length === 0 ? (
              <p className="text-sm text-muted-foreground">No items available</p>
            ) : (
              slotItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-2 border rounded"
                >
                  <span>{item.name}</span>
                  <Button onClick={() => handleEquip(item)}>Equip</Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </main>
  );
}
