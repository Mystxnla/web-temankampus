import React, { createContext, useContext, useState, useEffect } from 'react';
import initialTasks from '../mock-data/tasks.json';
import { hasStorageConsent } from './PrivacyContext';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('temankampus_tasks_v2');
      if (saved) return JSON.parse(saved);
      const oldSaved = localStorage.getItem('temankampus_tasks');
      if (oldSaved && !oldSaved.includes('2024') && !oldSaved.includes('2026-09')) {
        return JSON.parse(oldSaved);
      }
    } catch {
      // ignore storage errors
    }
    return initialTasks;
  });

  const [activeFocusTaskId, setActiveFocusTaskId] = useState('tsk_01');

  useEffect(() => {
    if (hasStorageConsent()) {
      localStorage.setItem('temankampus_tasks_v2', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (newTask) => {
    const taskWithId = {
      id: `tsk_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Belum Selesai',
      ...newTask
    };
    setTasks(prev => [taskWithId, ...prev]);
    return taskWithId;
  };

  const toggleTaskStatus = (id) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === id) {
          const newStatus = task.status === 'Selesai' ? 'Belum Selesai' : 'Selesai';
          return { ...task, status: newStatus };
        }
        return task;
      })
    );
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const editTask = (id, updatedFields) => {
    setTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, ...updatedFields } : task))
    );
  };

  const urgentTasks = tasks.filter(t => t.status !== 'Selesai' && t.priority === 'Tinggi');
  const pendingTasks = tasks.filter(t => t.status !== 'Selesai');
  const completedTasks = tasks.filter(t => t.status === 'Selesai');

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleTaskStatus,
        deleteTask,
        editTask,
        urgentTasks,
        pendingTasks,
        completedTasks,
        activeFocusTaskId,
        setActiveFocusTaskId
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
