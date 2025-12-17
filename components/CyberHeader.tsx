
import React from 'react';

interface CyberHeaderProps {
  onClear: () => void;
  fontSize: 'xs' | 'sm' | 'base';
  onToggleFontSize: () => void;
}

const CyberHeader: React.FC<CyberHeaderProps> = ({ onClear, fontSize, onToggleFontSize }) => {
  const fontSizeLabel = fontSize === 'xs' ? '極小' : fontSize === 'sm' ? '標準' : '較大';

  return (
    <header className="flex items-center justify-between p-3 md:p-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-2 md:gap-3">
        <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
        </div>
        <div>
          <h1 className="text-lg md:text-xl font-bold tracking-tight text-white uppercase leading-none">格式轉換複製工具</h1>
          <p className="hidden md:block text-[10px] text-cyan-400 font-mono tracking-widest leading-none mt-1 uppercase">V2.5 專業格式化系統</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={onToggleFontSize}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition-all active:scale-95 text-[10px] md:text-xs font-mono uppercase"
          title="調整字體大小"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V4h16v3"></path><path d="M9 20h6"></path><path d="M12 4v16"></path></svg>
          <span className="hidden sm:inline">縮放:</span> {fontSizeLabel}
        </button>

        <button 
          onClick={onClear}
          className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 transition-all duration-300 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-180 transition-transform duration-500"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
          <span className="text-[10px] md:text-xs font-semibold uppercase tracking-wider">清除</span>
        </button>
      </div>
    </header>
  );
};

export default CyberHeader;
