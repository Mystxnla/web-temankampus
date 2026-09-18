import React, { createContext, useContext, useState, useEffect } from 'react';
import initialTasks from '../mock-data/tasks.json';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('temankampus_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [activeFocusTaskId, setActiveFocusTaskId] = useState('tsk_01');

  useEffect(() => {
    localStorage.setItem('temankampus_tasks', JSON.stringify(tasks));
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
