'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import api from '@/lib/axios';

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState('');
  const [initialCount, setInitialCount] = useState('');
  const [incrementStep, setIncrementStep] = useState('');

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    }
  };

  const handleAdd = async () => {
    if (!name.trim() || !initialCount) return;
    try {
      const payload = {
        name,
        currentCount: Number(initialCount),
        incrementStep: incrementStep ? Number(incrementStep) : 0,
      };
      const res = await api.post('/tasks', payload);
      setTasks(prev => [...prev, res.data]);
      setName('');
      setInitialCount('');
      setIncrementStep('');
    } catch (err) {
      console.error('Failed to add task', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  const handleUpdateIncrement = async (id, newStep) => {
    try {
      await api.put(`/tasks/${id}`, { incrementStep: newStep });
      setTasks(prev => prev.map(t => t.id === id ? { ...t, incrementStep: newStep } : t));
    } catch (err) {
      console.error('Failed to update increment', err);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-background text-foreground space-y-6">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="space-y-4">
          <h1 className="text-xl font-bold">Manage Tasks</h1>
          <div className="grid grid-cols-3 gap-2">
            <Input
              placeholder="Task name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Initial count"
              value={initialCount}
              onChange={(e) => setInitialCount(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Increment step"
              value={incrementStep}
              onChange={(e) => setIncrementStep(e.target.value)}
            />
          </div>
          <Button onClick={handleAdd}>Add Task</Button>
        </CardContent>
      </Card>

      <Card className="max-w-2xl mx-auto">
        <CardContent className="space-y-4">
          {tasks.map(task => (
            <div key={task.id} className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{task.name}</p>
                <p className="text-sm">
                  Today: {task.currentCount}{' '}
                  {task.incrementStep > 0 && `(inc. ${task.incrementStep})`}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  className="w-20"
                  defaultValue={task.incrementStep}
                  onBlur={(e) => handleUpdateIncrement(task.id, Number(e.target.value))}
                />
                <Button variant="destructive" onClick={() => handleDelete(task.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
