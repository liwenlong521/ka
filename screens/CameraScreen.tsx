import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../types';
import { analyzeFoodImage } from '../services/ai';

export default function CameraScreen() {
    const navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Start Camera
    useEffect(() => {
        let stream: MediaStream | null = null;

        const startCamera = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' },
                    audio: false
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Camera error:", err);
                setError("无法访问相机，请检查权限");
            }
        };

        startCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const handleCapture = async () => {
        if (!videoRef.current || !canvasRef.current || isAnalyzing) return;

        setIsAnalyzing(true);
        setError(null);

        try {
            // Draw video frame to canvas
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error("Could not get canvas context");
            
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Get base64 string
            const imageBase64 = canvas.toDataURL('image/jpeg', 0.8);

            // Call AI Service
            const analysis = await analyzeFoodImage(imageBase64);

            // Navigate to Result Screen with data
            navigate(`/${AppRoute.RESULT}`, { 
                state: { 
                    image: imageBase64,
                    analysis: analysis
                } 
            });

        } catch (err) {
            console.error(err);
            setError("识别失败，请重试");
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="font-mono text-bg-dark antialiased h-screen w-full overflow-hidden bg-bg-dark relative">
            {/* Hidden Canvas for Capture */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Camera View */}
            <div className="absolute inset-0 z-0 w-full h-full bg-black">
                <video 
                    ref={videoRef}
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none"></div>
            </div>

            {/* Top Bar */}
            <div className="absolute top-0 w-full z-20 pt-12 pb-4 px-6 flex items-center justify-between text-white">
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors">
                    <span className="material-symbols-outlined text-white" style={{ fontSize: '24px' }}>flash_off</span>
                </button>
                {isAnalyzing && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 animate-pulse">
                        <span className="material-symbols-outlined text-brand-yellow" style={{ fontSize: '18px' }}>auto_awesome</span>
                        <span className="text-xs font-medium tracking-wide uppercase">AI 识别中...</span>
                    </div>
                )}
                <button 
                    onClick={() => navigate(`/${AppRoute.HOME}`)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors"
                >
                    <span className="material-symbols-outlined text-white" style={{ fontSize: '24px' }}>close</span>
                </button>
            </div>

            {/* Error Toast */}
            {error && (
                <div className="absolute top-24 left-0 right-0 flex justify-center z-30 px-6">
                    <div className="bg-red-500/90 text-white px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-md shadow-lg">
                        {error}
                    </div>
                </div>
            )}

            {/* Scanning Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
                <div className={`relative w-64 h-64 border-[1.5px] border-white/90 rounded-xl transition-all duration-300 ${isAnalyzing ? 'border-brand-yellow shadow-[0_0_20px_rgba(244,209,37,0.4)]' : 'animate-pulse-sage'}`}>
                    {/* Corner Markers */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-white -mt-[2px] -ml-[2px] rounded-tl-sm"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-white -mt-[2px] -mr-[2px] rounded-tr-sm"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-white -mb-[2px] -ml-[2px] rounded-bl-sm"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-white -mb-[2px] -mr-[2px] rounded-br-sm"></div>
                    
                    {/* Scanning Line */}
                    {!isAnalyzing && <div className="absolute top-0 left-0 w-full h-1 bg-brand-sage-light/50 shadow-[0_0_10px_#9CAF88] animate-scan"></div>}
                </div>
                
                <div className="mt-6 px-4 py-2 bg-black/30 backdrop-blur-md rounded-lg border border-white/10">
                    <p className="text-white text-sm font-medium tracking-wide text-center">
                        {isAnalyzing ? "正在分析食物成分..." : "请将食物对准框内"}
                    </p>
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
                    {/* Gallery Preview (Static for now) */}
                    <button className="relative w-12 h-12 rounded-lg overflow-hidden border-2 border-white/20 hover:border-white transition-colors group">
                        <div 
                            className="w-full h-full bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity" 
                            style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBmY7P6-ZQ-ICWPicR1oXqRh2UoT5InLJi9fZATet-QYD-AkhOf8hwiXmZKrhVmRNsFYiMS6ut5QZZ4IgvwqcjbNFK-K3oXcUARwy_ON4WLS2MczWvrfFbRUNt3dge4x1PJKnkRYS7qnQ6Ziz05c51kwPUJTogQMItME46A4hKRxIzmNoF_KQuwl748SWzV4-xVWEw8hUVBDB1eB6Ebha1fQql0r5nJ9QstW0osBK3mAqR6nNThCLPhD1DpKEtTYhQH0QwTb7pGbmo')`}}
                        ></div>
                    </button>

                    {/* Shutter Button */}
                    <button 
                        onClick={handleCapture}
                        disabled={isAnalyzing}
                        className={`group relative flex items-center justify-center w-20 h-20 rounded-full border-4 border-white/30 bg-transparent transition-transform ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
                    >
                        <div className="w-16 h-16 rounded-full bg-brand-yellow shadow-[0_0_15px_rgba(244,209,37,0.4)] group-hover:bg-[#fce56e] transition-colors relative flex items-center justify-center">
                            {isAnalyzing ? (
                                <span className="material-symbols-outlined text-black animate-spin">progress_activity</span>
                            ) : (
                                <div className="w-14 h-14 rounded-full border border-white/20"></div>
                            )}
                        </div>
                    </button>

                    {/* Camera Flip (Visual only for demo) */}
                    <button className="flex items-center justify-center w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-colors">
                        <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>flip_camera_ios</span>
                    </button>
                </div>
            </div>
        </div>
    );
}