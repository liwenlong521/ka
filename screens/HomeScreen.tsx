import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute, MealType } from '../types';
import { useAppContext } from '../context/AppContext';

export default function HomeScreen() {
    const navigate = useNavigate();
    const { getTodayStats, getLogsByMeal } = useAppContext();
    const stats = getTodayStats();

    // Progress Calculation
    const progressPercentage = Math.min(100, (stats.consumed / stats.target) * 100);
    const circleCircumference = 2 * Math.PI * 40; // r=40
    const strokeDashoffset = circleCircumference - (progressPercentage / 100) * circleCircumference;

    const renderMealCard = (type: MealType, icon: string, label: string) => {
        const logs = getLogsByMeal(type);
        const calories = logs.reduce((sum, log) => sum + log.calories, 0);
        const hasLogs = logs.length > 0;

        return (
            <div 
                key={type}
                onClick={() => {
                    // Could navigate to details, for now navigate to scan if empty to encourage adding
                    if (!hasLogs) navigate(`/${AppRoute.SCAN}`);
                }}
                className={`flex flex-col items-center justify-between gap-3 rounded-3xl p-4 transition-colors cursor-pointer group h-40 ${
                    hasLogs 
                    ? 'bg-sage-100 dark:bg-slate-800/50 hover:bg-sage-200 dark:hover:bg-slate-800' 
                    : 'border-2 border-dashed border-sage-200 dark:border-slate-700 bg-transparent hover:bg-sage-50 dark:hover:bg-slate-800/30'
                }`}
            >
                <div className={`size-10 rounded-full flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 ${
                    hasLogs ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white' : 'bg-sage-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:text-brand-green'
                }`}>
                    <span className="material-symbols-outlined text-[20px]">{hasLogs ? icon : 'add'}</span>
                </div>
                <div className="text-center">
                    <p className={`text-xs font-semibold uppercase tracking-wide ${hasLogs ? 'text-slate-500 dark:text-slate-400' : 'text-slate-400 dark:text-slate-500'}`}>{label}</p>
                    <p className={`text-lg font-bold ${hasLogs ? 'text-slate-800 dark:text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-brand-green'}`}>
                        {hasLogs ? calories : '添加'}
                    </p>
                    <p className={`text-[10px] ${hasLogs ? 'text-slate-400' : 'text-transparent select-none'}`}>千卡</p>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col w-full h-full pb-32">
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
                <div className="flex items-center gap-3">
                    <div 
                        className="bg-center bg-no-repeat bg-cover rounded-full size-10 border-2 border-white shadow-sm ring-1 ring-sage-100" 
                        style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuD2BmbqQMD_UGt1T3S8mJ2og7FYLYmtmjKjVNj8SlnEz5wDI18oifnSdLQpRKVE14LYndSK4oVvaflA6bUbLWBXngUwzPNIHnuqrnd2SQQTXyPu9fD8yZkWd2M1YbsSyhLigXsrzkbHyg0oWJotP0kJ071zG-p7ltcEDXQqexoAAKmMO2rruzcnnDxl4CJn-qfEtJXWxJvDhFS_ohGnyP-cu7OEw6lKVYry_K3rQrFHUcyjLfaez-S7OsU2UgKgnmD4cCV0t1JGfSM")`}}
                    ></div>
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">欢迎回来，</span>
                        <span className="text-sm font-bold text-slate-800 dark:text-white">Sarah</span>
                    </div>
                </div>
                <button className="flex items-center justify-center size-10 rounded-full bg-sage-50 dark:bg-slate-800 text-slate-800 dark:text-white hover:bg-sage-100 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">calendar_month</span>
                </button>
            </div>

            {/* Title */}
            <div className="px-6 pt-4">
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white">今日</h2>
                <p className="text-slate-500 dark:text-slate-300 text-sm font-medium">
                    {stats.remaining > 0 ? "继续保持！" : "目标已达成！"}
                </p>
            </div>

            {/* Circular Progress */}
            <div className="flex flex-col items-center justify-center py-8">
                <div className="relative size-72 flex items-center justify-center">
                    <svg className="size-full transform -rotate-90" viewBox="0 0 100 100">
                        {/* Track */}
                        <circle 
                            className="dark:stroke-slate-800" 
                            cx="50" cy="50" r="40" 
                            fill="transparent" 
                            stroke="#e3ebe1" 
                            strokeLinecap="round" 
                            strokeWidth="12"
                        ></circle>
                        {/* Progress */}
                        <circle 
                            className="drop-shadow-sm transition-all duration-1000 ease-out" 
                            cx="50" cy="50" r="40" 
                            fill="transparent" 
                            stroke={stats.remaining > 0 ? "#5de619" : "#f4d125"} 
                            strokeDasharray={circleCircumference} 
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round" 
                            strokeWidth="12"
                        ></circle>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-wider mb-1">
                            {stats.remaining >= 0 ? "剩余" : "超额"}
                        </span>
                        <span className="text-6xl font-black text-slate-800 dark:text-white tracking-tighter leading-none">
                            {Math.abs(Math.round(stats.remaining))}
                        </span>
                        <span className="text-slate-400 dark:text-slate-500 text-sm font-medium mt-1">千卡</span>
                    </div>
                </div>
            </div>

            {/* Meals Grid */}
            <div className="flex flex-col gap-4 px-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white">饮食记录</h3>
                    <button className="text-brand-green text-sm font-bold">查看详情</button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    {renderMealCard('Breakfast', 'bakery_dining', '早餐')}
                    {renderMealCard('Lunch', 'soup_kitchen', '午餐')}
                    {renderMealCard('Dinner', 'dinner_dining', '晚餐')}
                </div>
            </div>
        </div>
    );
}