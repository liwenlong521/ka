import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppRoute } from '../types';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.replace('/', '');

  return (
    <>
        {/* Floating Camera Button */}
        <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none">
            <button 
                onClick={() => navigate(`/${AppRoute.SCAN}`)}
                className="pointer-events-auto flex items-center justify-center size-16 rounded-full bg-brand-cream text-slate-800 shadow-fab hover:scale-105 active:scale-95 transition-all duration-300 border-4 border-white dark:border-bg-dark"
            >
                <span 
                    className="material-symbols-outlined text-[32px] fill-current text-slate-800" 
                    style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}
                >
                    photo_camera
                </span>
            </button>
        </div>

        {/* Navigation Bar */}
        <div className="fixed bottom-0 left-0 right-0 h-20 bg-white/90 dark:bg-surface-dark/95 backdrop-blur-md border-t border-sage-100 dark:border-white/5 flex justify-between items-center px-12 pb-4 z-40 safe-area-bottom">
            <button 
                onClick={() => navigate(`/${AppRoute.HOME}`)}
                className={`flex flex-col items-center gap-1 transition-colors ${currentPath === AppRoute.HOME ? 'text-brand-green' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
            >
                <span className={`material-symbols-outlined ${currentPath === AppRoute.HOME ? 'material-symbols-filled' : ''}`}>home</span>
                <span className="text-[10px] font-bold">首页</span>
            </button>
            
            <div className="w-12"></div> {/* Spacer for FAB */}

            <button 
                onClick={() => navigate(`/${AppRoute.PROFILE}`)}
                className={`flex flex-col items-center gap-1 transition-colors ${currentPath === AppRoute.PROFILE ? 'text-brand-green' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
            >
                <span className={`material-symbols-outlined ${currentPath === AppRoute.PROFILE ? 'material-symbols-filled' : ''}`}>person</span>
                <span className="text-[10px] font-medium">我的</span>
            </button>
        </div>
    </>
  );
}