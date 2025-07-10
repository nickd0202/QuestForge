'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete daily quest', done: false },
    { id: 2, text: 'Review your progress', done: false },
    { id: 3, text: 'Slay the procrastination dragon', done: false },
  ]);

  const level = 2;
  const xp = 150;
  const xpToNext = 300;

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  return (
    <main className="min-h-screen p-6 bg-background text-foreground">
      <Card className="max-w-xl mx-auto mb-6">
        <CardContent className="py-6">
          <h2 className="text-xl font-bold mb-2 text-center">Level {level}</h2>
          <div className="flex items-center justify-between text-sm mb-1">
            <span>XP: {xp}/{xpToNext}</span>
          </div>
          <Progress value={(xp / xpToNext) * 100} />
        </CardContent>
      </Card>

      <Card className="max-w-xl mx-auto">
        <CardContent className="py-6">
          <h2 className="text-lg font-semibold mb-4">Your Tasks</h2>
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li key={task.id} className="flex items-center space-x-3">
                <Checkbox
                  checked={task.done}
                  onCheckedChange={() => toggleTask(task.id)}
                />
                <span
                  className={cn('text-base', {
                    'line-through text-muted-foreground': task.done,
                  })}
                >
                  {task.text}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}