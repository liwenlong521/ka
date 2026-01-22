import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';

export default function ResultScreen() {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-bg-light dark:bg-bg-dark pb-24">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between bg-bg-light/80 dark:bg-bg-dark/80 p-4 backdrop-blur-md">
            <button 
                onClick={() => navigate(-1)}
                className="flex size-10 items-center justify-center rounded-full bg-transparent transition-colors hover:bg-black/5 dark:hover:bg-white/10"
            >
                <span className="material-symbols-outlined text-[#121b0e] dark:text-white" style={{ fontSize: '24px' }}>arrow_back</span>
            </button>
            <h2 className="text-lg font-bold leading-tight tracking-tight text-[#121b0e] dark:text-white">分析结果</h2>
            <button className="flex h-10 items-center justify-center px-2 text-sm font-bold text-brand-sage transition-opacity hover:opacity-80">
                编辑
            </button>
        </header>

        <main className="flex flex-col gap-6 px-5 pt-2">
            {/* Image */}
            <div className="w-full">
                <div 
                    className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gray-200 shadow-sm"
                    style={{ 
                        backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB9J9cEp714DdvncMEwqOP2laR8zBuM_fwjHyxQoCaXHKP6Mx75v4vwpQG3vn1p6j2U3OYX22eymvGrrLGmuinQq5boP5Im6HrFtOJPB2-4cLDPSnUafTygPd3BAwHXLTx5n9_VMFQ6sYn3XlqN3l4ml3RVqAp50OWPlTUUSkBWC44-Mi_HY2LmdV7LSpbEtW6s0meiKajv-AmUe9I3cE5u3HY_8V4eWzPwznXdvymSOH-QcqmbGA3swiwcJ93TCLmmcVQ-O6FEwho')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-40"></div>
                </div>
            </div>

            {/* Title Info */}
            <div className="text-center">
                <h1 className="text-3xl font-extrabold tracking-tight text-[#121b0e] dark:text-white">牛油果鸡肉沙拉</h1>
                <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">碗装 • 350克</p>
            </div>

            {/* Main Card */}
            <div className="mx-auto w-full max-w-md rounded-3xl bg-surface-light dark:bg-surface-dark p-6 shadow-sm ring-1 ring-black/5 dark:ring-white/5">
                <div className="flex items-center justify-between gap-6">
                    <div className="flex flex-1 flex-col justify-center">
                        <span className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">总热量</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-5xl font-extrabold tracking-tight text-brand-sage">420</span>
                            <span className="text-xl font-bold text-brand-sage/70">kcal</span>
                        </div>
                        <p className="mt-2 text-sm font-medium leading-normal text-gray-600 dark:text-gray-300">
                            符合您的每日午餐目标。
                        </p>
                    </div>
                    {/* Donut Chart */}
                    <div className="relative flex size-32 shrink-0 items-center justify-center">
                        <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                            <path className="text-gray-200 dark:text-gray-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5"></path>
                            {/* Fat - Yellow */}
                            <path className="text-brand-accent-yellow" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="20, 100" strokeWidth="3.5"></path>
                            {/* Carbs - Light Green */}
                            <path className="text-brand-sage-light" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="45, 100" strokeDashoffset="-20" strokeWidth="3.5"></path>
                            {/* Protein - Main Green */}
                            <path className="text-brand-sage" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="35, 100" strokeDashoffset="-65" strokeWidth="3.5"></path>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="material-symbols-outlined text-brand-sage/80" style={{ fontSize: '28px' }}>pie_chart</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-between border-t border-gray-100 dark:border-white/5 pt-4">
                    <div className="flex items-center gap-2">
                        <div className="size-2.5 rounded-full bg-brand-sage"></div>
                        <span className="text-xs font-bold text-gray-600 dark:text-gray-300">蛋白质</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="size-2.5 rounded-full bg-brand-sage-light"></div>
                        <span className="text-xs font-bold text-gray-600 dark:text-gray-300">碳水</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="size-2.5 rounded-full bg-brand-accent-yellow"></div>
                        <span className="text-xs font-bold text-gray-600 dark:text-gray-300">脂肪</span>
                    </div>
                </div>
            </div>

            {/* Macro Grid */}
            <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center justify-center rounded-2xl bg-brand-sage/10 p-4 text-center">
                    <span className="mb-1 text-xs font-bold uppercase tracking-wide text-brand-sage">蛋白质</span>
                    <span className="text-xl font-bold text-[#121b0e] dark:text-white">35g</span>
                    <div className="mt-2 h-1 w-8 rounded-full bg-brand-sage/20">
                        <div className="h-full w-3/4 rounded-full bg-brand-sage"></div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center rounded-2xl bg-[#ebf3e7] dark:bg-[#2c3327] p-4 text-center">
                    <span className="mb-1 text-xs font-bold uppercase tracking-wide text-brand-sage-light">碳水</span>
                    <span className="text-xl font-bold text-[#121b0e] dark:text-white">42g</span>
                    <div className="mt-2 h-1 w-8 rounded-full bg-brand-sage-light/20">
                        <div className="h-full w-1/2 rounded-full bg-brand-sage-light"></div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center rounded-2xl bg-[#fff9e0] dark:bg-[#332f20] p-4 text-center">
                    <span className="mb-1 text-xs font-bold uppercase tracking-wide text-[#d4af37]">脂肪</span>
                    <span className="text-xl font-bold text-[#121b0e] dark:text-white">12g</span>
                    <div className="mt-2 h-1 w-8 rounded-full bg-[#d4af37]/20">
                        <div className="h-full w-1/4 rounded-full bg-[#d4af37]"></div>
                    </div>
                </div>
            </div>

            {/* Confidence Score */}
            <div className="flex items-center justify-between rounded-xl border border-dashed border-gray-300 p-4 dark:border-gray-700">
                <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                        <span className="material-symbols-outlined text-brand-sage text-sm">auto_awesome</span>
                    </div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">AI 识别可信度</p>
                </div>
                <span className="text-sm font-bold text-brand-sage">98%</span>
            </div>
        </main>

        {/* Bottom CTA */}
        <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-bg-light via-bg-light to-transparent px-5 pb-8 pt-12 dark:from-bg-dark dark:via-bg-dark z-40">
            <button 
                onClick={() => navigate(`/${AppRoute.HOME}`)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-sage px-6 py-4 text-base font-bold text-white shadow-lg shadow-brand-sage/30 transition-transform active:scale-[0.98]"
            >
                <span className="material-symbols-outlined">add_circle</span>
                记录饮食
            </button>
        </div>
    </div>
  );
}