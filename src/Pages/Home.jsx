import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const XPTracker = ({ xp }) => {
  const level = Math.floor(xp / 100);
  const nextLevelXP = (level + 1) * 100;
  const progress = ((xp % 100) / 100) * 100;

  return (
    <Card className="w-full max-w-md mx-auto mt-6 p-4">
      <CardContent>
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">XP Tracker</h2>
          <p className="mb-1">Current XP: {xp}</p>
          <p className="mb-2">Level: {level}</p>
          <div className="w-full bg-gray-300 h-4 rounded overflow-hidden mb-4">
            <div
              className="bg-green-500 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TaskList = ({ gainXP }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [useInterval, setUseInterval] = useState(false);
  const [intervalValue, setIntervalValue] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([
      ...tasks,
      { name: newTask, completed: false, useInterval, interval: intervalValue }
    ]);
    setNewTask("");
    setUseInterval(false);
    setIntervalValue("");
  };

  const completeTask = (index) => {
    const updated = [...tasks];
    if (!updated[index].completed) gainXP(10);
    updated[index].completed = true;
    setTasks(updated);
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-6 p-4">
      <CardContent>
        <h3 className="text-lg font-semibold mb-4">Task List</h3>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Input
            placeholder="New task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Checkbox
            checked={useInterval}
            onCheckedChange={() => setUseInterval(!useInterval)}
          />
          <span>Interval?</span>
          {useInterval && (
            <Input
              className="w-16"
              placeholder="ex. 5d"
              value={intervalValue}
              onChange={(e) => setIntervalValue(e.target.value)}
            />
          )}
          <Button onClick={addTask}>Add</Button>
        </div>
        <ul className="space-y-2">
          {tasks.map((task, idx) => (
            <li key={idx} className="flex justify-between items-center">
              <span className={task.completed ? "line-through" : ""}>
                {task.name} {task.useInterval && `(every ${task.interval})`}
              </span>
              {!task.completed && (
                <Button size="sm" onClick={() => completeTask(idx)}>
                  Complete
                </Button>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const Home = () => {
  const [xp, setXp] = useState(0);
  const gainXP = (amount) => setXp((prev) => prev + amount);

  return (
    <div className="min-h-screen p-6 bg-background text-foreground">
      <h1 className="text-2xl font-bold text-center mb-6">Welcome to QuestForge</h1>
      <XPTracker xp={xp} />
      <TaskList gainXP={gainXP} />
    </div>
  );
};

export default Home;