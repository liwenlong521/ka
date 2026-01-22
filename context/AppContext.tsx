import React, { createContext, useContext, useState, useEffect } from 'react';
import { FoodLog, DailyStats, MealType } from '../types';

interface AppContextType {
  logs: FoodLog[];
  addLog: (log: Omit<FoodLog, 'id' | 'timestamp'>) => void;
  getTodayStats: () => DailyStats;
  getLogsByMeal: (type: MealType) => FoodLog[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'calorie_ai_logs_v1';
const DEFAULT_TARGET = 2100;

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logs, setLogs] = useState<FoodLog[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setLogs(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse logs", e);
      }
    }
  }, []);

  // Save to local storage whenever logs change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  }, [logs]);

  const addLog = (logData: Omit<FoodLog, 'id' | 'timestamp'>) => {
    const newLog: FoodLog = {
      ...logData,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    setLogs(prev => [newLog, ...prev]);
  };

  const getTodayLogs = () => {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    return logs.filter(log => log.timestamp >= startOfDay);
  };

  const getTodayStats = (): DailyStats => {
    const todayLogs = getTodayLogs();
    const consumed = todayLogs.reduce((sum, log) => sum + log.calories, 0);
    const protein = todayLogs.reduce((sum, log) => sum + log.protein, 0);
    const carbs = todayLogs.reduce((sum, log) => sum + log.carbs, 0);
    const fat = todayLogs.reduce((sum, log) => sum + log.fat, 0);

    return {
      target: DEFAULT_TARGET,
      consumed,
      remaining: Math.max(0, DEFAULT_TARGET - consumed),
      protein,
      carbs,
      fat
    };
  };

  const getLogsByMeal = (type: MealType) => {
    const todayLogs = getTodayLogs();
    return todayLogs.filter(log => log.mealType === type);
  };

  return (
    <AppContext.Provider value={{ logs, addLog, getTodayStats, getLogsByMeal }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
