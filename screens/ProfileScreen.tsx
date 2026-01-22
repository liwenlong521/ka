import React from 'react';
import { useAppContext } from '../context/AppContext';

export default function ProfileScreen() {
    const { getTodayStats } = useAppContext();
    const stats = getTodayStats();
    
    // Generate calendar days
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    
    // Macros max values (approximate)
    const MAX_PROTEIN = 140;
    const MAX_CARBS = 250;
    const MAX_FAT = 70;

    return (
        <div className="flex flex-col w-full h-full pb-32">
             {/* Header */}
            <header className="flex items-center justify-between p-4 pt-6 sticky top-0 z-20 bg-bg-light/90 dark:bg-bg-dark/90 backdrop-blur-md">
                <div className="w-12"></div> 
                <h2 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">个人中心</h2>
                <button className="flex w-12 items-center justify-center rounded-full h-10 hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-slate-900 dark:text-white">settings</span>
                </button>
            </header>

            <section className="flex flex-col items-center px-6 pt-2 pb-6 gap-6">
                <div className="flex flex-col items-center gap-3">
                    <div className="relative group cursor-pointer">
                        <div 
                            className="w-28 h-28 rounded-full bg-cover bg-center shadow-soft border-4 border-white dark:border-surface-dark" 
                            style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAzdUglbzhE-trNPlEBT74NsqyJvpctX2DFIzh5xQLxGb4qp_H_4ftfBn238P4AjMV5_8EBPYbI2yei5Q5zCfoFMPtervIiscoLif4HJscR64QrK4Zv6uoX34NVJU1JyMYGuh4WistHTnXdF07SdpFWRtZgMA7_224Ah2WU5SHyo_Fq9RlRRBvtOhMa5yE0kiLgekOC5wzvdgwzQpS4BZH8If1NTOVf7zJ9Rsco6Y44mF-zzZGNIO4KAQXW05CWNO-DfsqeBcEDAmQ')` }}
                        ></div>
                        <div className="absolute bottom-0 right-0 bg-brand-green rounded-full p-1.5 border-4 border-bg-light dark:border-bg-dark shadow-sm">
                            <span className="material-symbols-outlined text-black text-[16px] block">edit</span>
                        </div>
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">你好，Alex</h1>
                        <p className="text-brand-sage dark:text-brand-sage-light/80 text-sm font-medium mt-1">今天也要达成目标哦！</p>
                    </div>
                </div>

                <div className="flex w-full gap-3">
                    <div className="flex-1 bg-surface-light dark:bg-surface-dark p-4 rounded-2xl shadow-soft flex flex-col items-center justify-center gap-1 border border-sage-100 dark:border-white/5">
                        <div className="flex items-center gap-1.5 text-brand-sage dark:text-brand-sage-light mb-1">
                            <span className="material-symbols-outlined text-[18px]">local_fire_department</span>
                            <span className="text-xs font-semibold uppercase tracking-wider">连续天数</span>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">12</p>
                        <p className="text-xs text-gray-400">天</p>
                    </div>
                    <div className="flex-1 bg-surface-light dark:bg-surface-dark p-4 rounded-2xl shadow-soft flex flex-col items-center justify-center gap-1 border border-sage-100 dark:border-white/5">
                        <div className="flex items-center gap-1.5 text-brand-sage dark:text-brand-sage-light mb-1">
                            <span className="material-symbols-outlined text-[18px]">nutrition</span>
                            <span className="text-xs font-semibold uppercase tracking-wider">平均摄入</span>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white">2,100</p>
                        <p className="text-xs text-gray-400">千卡</p>
                    </div>
                </div>
            </section>

            {/* Calendar Grid */}
            <section className="px-4 pb-6">
                <div className="bg-surface-light dark:bg-surface-dark rounded-3xl p-5 shadow-soft border border-sage-100 dark:border-white/5">
                    <div className="flex items-center justify-between mb-4 px-1">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-slate-900 dark:text-white transition-colors">
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <span className="text-base font-bold text-slate-900 dark:text-white">2023年10月</span>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-slate-900 dark:text-white transition-colors">
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-7 gap-y-1 mb-2">
                        {['日', '一', '二', '三', '四', '五', '六'].map(d => (
                             <div key={d} className="text-center text-xs font-medium text-brand-sage mb-2">{d}</div>
                        ))}
                       
                        {/* Empty slots for start of month */}
                        <div className="h-10"></div>
                        <div className="h-10"></div>
                        <div className="h-10"></div>

                        {days.map(day => (
                            <button key={day} className="h-10 w-full flex flex-col items-center justify-center relative group">
                                {day === 5 ? (
                                    <div className="w-9 h-9 rounded-full bg-brand-green flex items-center justify-center shadow-md">
                                        <span className="text-sm font-bold text-black">{day}</span>
                                    </div>
                                ) : (
                                    <>
                                        <span className="text-sm font-medium text-slate-900 dark:text-gray-300">{day}</span>
                                        {[2, 3, 4, 6, 8, 10].includes(day) && (
                                             <span className="w-1 h-1 rounded-full bg-brand-sage mt-1"></span>
                                        )}
                                    </>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Daily Summary (Real Data) */}
            <section className="px-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 ml-1">今日小结</h3>
                <div className="bg-surface-light dark:bg-surface-dark rounded-3xl p-5 shadow-soft border border-sage-100 dark:border-white/5">
                    <div className="flex items-center gap-6">
                        <div className="relative w-24 h-24 flex-shrink-0">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                <path className="text-gray-100 dark:text-white/5" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
                                <path 
                                    className="text-brand-green drop-shadow-[0_0_2px_rgba(93,230,25,0.5)]" 
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeDasharray={`${(stats.consumed / stats.target) * 100}, 100`}
                                    strokeLinecap="round" 
                                    strokeWidth="3.5"
                                ></path>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-[8px] font-bold uppercase text-brand-sage tracking-wide">总计</span>
                                <span className="text-lg font-bold text-slate-900 dark:text-white leading-none">{stats.consumed}</span>
                                <span className="text-[9px] text-gray-400 font-medium">千卡</span>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col gap-3">
                             {/* Protein Bar */}
                            <div className="flex flex-col gap-1.5">
                                <div className="flex justify-between items-end text-xs">
                                    <span className="font-medium text-slate-900 dark:text-gray-200">蛋白质</span>
                                    <span className="font-bold text-slate-900 dark:text-white">{stats.protein}g <span className="text-gray-400 font-normal">/ {MAX_PROTEIN}g</span></span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-brand-sage rounded-full" style={{ width: `${Math.min(100, (stats.protein/MAX_PROTEIN)*100)}%` }}></div>
                                </div>
                            </div>
                             {/* Carbs Bar */}
                             <div className="flex flex-col gap-1.5">
                                <div className="flex justify-between items-end text-xs">
                                    <span className="font-medium text-slate-900 dark:text-gray-200">碳水</span>
                                    <span className="font-bold text-slate-900 dark:text-white">{stats.carbs}g <span className="text-gray-400 font-normal">/ {MAX_CARBS}g</span></span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#E6C919] rounded-full" style={{ width: `${Math.min(100, (stats.carbs/MAX_CARBS)*100)}%` }}></div>
                                </div>
                            </div>
                             {/* Fat Bar */}
                             <div className="flex flex-col gap-1.5">
                                <div className="flex justify-between items-end text-xs">
                                    <span className="font-medium text-slate-900 dark:text-gray-200">脂肪</span>
                                    <span className="font-bold text-slate-900 dark:text-white">{stats.fat}g <span className="text-gray-400 font-normal">/ {MAX_FAT}g</span></span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#E69119] rounded-full" style={{ width: `${Math.min(100, (stats.fat/MAX_FAT)*100)}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="w-full mt-5 bg-bg-light dark:bg-white/5 border border-sage-100 dark:border-white/10 hover:border-brand-green dark:hover:border-brand-green text-slate-900 dark:text-white py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 group">
                        查看详情
                        <span className="material-symbols-outlined text-brand-sage group-hover:text-brand-green text-[18px] transition-colors">arrow_forward</span>
                    </button>
                </div>
            </section>
        </div>
    );
}