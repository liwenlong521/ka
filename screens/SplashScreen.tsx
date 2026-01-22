import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(`/${AppRoute.HOME}`);
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center p-6 bg-bg-light dark:bg-bg-dark overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent dark:from-[#162111] dark:to-transparent opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-green/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-100/40 dark:bg-yellow-900/10 blur-[60px] rounded-full pointer-events-none"></div>

      <div className="flex flex-col items-center justify-center gap-8 w-full max-w-md z-10">
        <div className="group relative animate-float">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-brand-green/30 to-yellow-100 opacity-50 blur-xl transition duration-500 group-hover:opacity-75"></div>
          <div className="relative flex h-40 w-40 items-center justify-center rounded-[2.5rem] bg-white shadow-soft dark:bg-[#1f2e18]">
            <div className="h-28 w-28 bg-contain bg-center bg-no-repeat relative rounded-2xl overflow-hidden" >
                {/* Simulated Logo based on prompt description */}
                <div className="absolute inset-0 flex items-center justify-center bg-[#fdfdf6]">
                     <span 
                        className="material-symbols-outlined text-brand-sage text-[7rem] absolute opacity-90 z-10" 
                        style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                        eco
                    </span>
                    <span 
                        className="material-symbols-outlined text-yellow-200 text-[4rem] absolute translate-y-2 translate-x-2 mix-blend-multiply dark:mix-blend-normal opacity-80 z-0" 
                        style={{ fontVariationSettings: "'FILL' 0, 'wght' 600" }}
                    >
                        lens_blur
                    </span>
                </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-2 mt-4">
          <h1 className="text-[#121b0e] dark:text-gray-50 tracking-tight text-[36px] font-bold leading-tight px-4 pb-1">
            CalorieAI
          </h1>
          <p className="text-brand-sage dark:text-brand-green text-base font-medium tracking-wide">
            智能营养管家
          </p>
        </div>
      </div>

      <div className="absolute bottom-12 flex flex-col items-center gap-4 opacity-80">
        <div className="h-1.5 w-32 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
          <div className="h-full w-1/3 rounded-full bg-brand-green animate-[width_2s_ease-in-out_infinite]"></div>
        </div>
        <span className="text-xs text-gray-400 font-medium tracking-widest uppercase">V1.0.2</span>
      </div>
    </div>
  );
}