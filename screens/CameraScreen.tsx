import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';

export default function CameraScreen() {
    const navigate = useNavigate();

    return (
        <div className="font-mono text-bg-dark antialiased h-screen w-full overflow-hidden bg-bg-dark relative">
            {/* Camera View (Simulated) */}
            <div className="absolute inset-0 z-0 w-full h-full bg-black">
                <div 
                    className="w-full h-full bg-cover bg-center opacity-90 transition-transform duration-700 hover:scale-105" 
                    style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCdOzY_5b_k2_67y-c9nOrDGFTQGkCSOoMU2m3k2BzargdcF8D9vsODDh6wZrAOScnJeIrgaKWxVC94aSIcdNMgU93m0XXq54rN-K1yWTM58UdizJxCZbqXtbhrFzey4kFGIpO4M1xJDJRxiIFL-va6geHkVgkuGNq96WNaVJzYiKswYJTWIQF2ztsZsdRbn62rMbgiT1znRBQusoXN22Rnuw65K4j_Xz7sEf3noUsCZKd6w2lUsYR1_Rg_chcvbPcDqdHjc2TiJK8')`}}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none"></div>
            </div>

            {/* Top Bar */}
            <div className="absolute top-0 w-full z-20 pt-12 pb-4 px-6 flex items-center justify-between text-white">
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors">
                    <span className="material-symbols-outlined text-white" style={{ fontSize: '24px' }}>flash_off</span>
                </button>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-sm border border-white/10">
                    <span className="material-symbols-outlined text-brand-yellow" style={{ fontSize: '18px' }}>auto_awesome</span>
                    <span className="text-xs font-medium tracking-wide uppercase">AI 识别中</span>
                </div>
                <button 
                    onClick={() => navigate(`/${AppRoute.HOME}`)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors"
                >
                    <span className="material-symbols-outlined text-white" style={{ fontSize: '24px' }}>close</span>
                </button>
            </div>

            {/* Scanning Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
                <div className="relative w-64 h-64 border-[1.5px] border-white/90 rounded-xl animate-pulse-sage">
                    {/* Corner Markers */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-white -mt-[2px] -ml-[2px] rounded-tl-sm"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-white -mt-[2px] -mr-[2px] rounded-tr-sm"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-white -mb-[2px] -ml-[2px] rounded-bl-sm"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-white -mb-[2px] -mr-[2px] rounded-br-sm"></div>
                    
                    {/* Scanning Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-brand-sage-light/50 shadow-[0_0_10px_#9CAF88] animate-scan"></div>
                </div>
                
                <div className="mt-6 px-4 py-2 bg-black/30 backdrop-blur-md rounded-lg border border-white/10">
                    <p className="text-white text-sm font-medium tracking-wide text-center">请将食物对准框内</p>
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 w-full z-20 flex flex-col items-center pb-10 pt-16 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="flex items-center justify-center gap-8 mb-8">
                    <button className="text-white/60 text-sm font-medium hover:text-white transition-colors">历史</button>
                    <button className="text-brand-yellow text-sm font-bold tracking-wide drop-shadow-sm scale-110">拍照</button>
                    <button className="text-white/60 text-sm font-medium hover:text-white transition-colors">条形码</button>
                </div>
                <div className="w-full flex items-center justify-evenly px-8">
                    {/* Gallery Preview */}
                    <button className="relative w-12 h-12 rounded-lg overflow-hidden border-2 border-white/20 hover:border-white transition-colors group">
                        <div 
                            className="w-full h-full bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity" 
                            style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBmY7P6-ZQ-ICWPicR1oXqRh2UoT5InLJi9fZATet-QYD-AkhOf8hwiXmZKrhVmRNsFYiMS6ut5QZZ4IgvwqcjbNFK-K3oXcUARwy_ON4WLS2MczWvrfFbRUNt3dge4x1PJKnkRYS7qnQ6Ziz05c51kwPUJTogQMItME46A4hKRxIzmNoF_KQuwl748SWzV4-xVWEw8hUVBDB1eB6Ebha1fQql0r5nJ9QstW0osBK3mAqR6nNThCLPhD1DpKEtTYhQH0QwTb7pGbmo')`}}
                        ></div>
                    </button>

                    {/* Shutter Button */}
                    <button 
                        onClick={() => navigate(`/${AppRoute.RESULT}`)}
                        className="group relative flex items-center justify-center w-20 h-20 rounded-full border-4 border-white/30 bg-transparent transition-transform active:scale-95"
                    >
                        <div className="w-16 h-16 rounded-full bg-brand-yellow shadow-[0_0_15px_rgba(244,209,37,0.4)] group-hover:bg-[#fce56e] transition-colors relative flex items-center justify-center">
                            <div className="w-14 h-14 rounded-full border border-white/20"></div>
                        </div>
                    </button>

                    {/* Camera Flip */}
                    <button className="flex items-center justify-center w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-colors">
                        <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>flip_camera_ios</span>
                    </button>
                </div>
            </div>
        </div>
    );
}