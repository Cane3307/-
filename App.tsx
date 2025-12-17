
import React, { useState, useMemo } from 'react';
import { SegmentType, ContentSegment } from './types';
import CyberHeader from './components/CyberHeader';
import CopyButton from './components/CopyButton';

const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [isInputCollapsed, setIsInputCollapsed] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'xs' | 'sm' | 'base'>('sm');
  
  // Memoized parsing logic
  const segments = useMemo((): ContentSegment[] => {
    if (!inputText) return [];

    const result: ContentSegment[] = [];
    const parts = inputText.split(/(```[\s\S]*?```)/g);

    parts.forEach(part => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const innerContent = part.slice(3, -3).trim();
        result.push({
          type: SegmentType.CODE,
          content: innerContent
        });
      } else if (part.trim().length > 0 || part.includes('\n')) {
        result.push({
          type: SegmentType.TEXT,
          content: part
        });
      }
    });

    return result;
  }, [inputText]);

  const handleClear = () => {
    setInputText('');
  };

  const toggleSidebar = () => {
    setIsInputCollapsed(!isInputCollapsed);
  };

  const toggleFontSize = () => {
    const sequence: ('xs' | 'sm' | 'base')[] = ['xs', 'sm', 'base'];
    const currentIndex = sequence.indexOf(fontSize);
    setFontSize(sequence[(currentIndex + 1) % sequence.length]);
  };

  // Dynamic class for font size
  const fontSizeClass = fontSize === 'xs' ? 'text-xs' : fontSize === 'sm' ? 'text-sm' : 'text-base';
  const spacingClass = fontSize === 'xs' ? 'gap-2 p-3' : fontSize === 'sm' ? 'gap-4 p-6' : 'gap-6 p-8';

  return (
    <div className={`flex flex-col h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans ${fontSize === 'xs' ? 'md:p-0' : ''}`}>
      <CyberHeader 
        onClear={handleClear} 
        fontSize={fontSize} 
        onToggleFontSize={toggleFontSize} 
      />

      <main className="flex-1 flex flex-col md:flex-row gap-2 md:gap-0 p-2 md:p-4 min-h-0 overflow-hidden relative">
        
        {/* Preview Panel (Left on Desktop, Top on Mobile) */}
        <section className={`flex-1 flex flex-col min-h-0 transition-all duration-500 ease-in-out ${isInputCollapsed ? 'h-full md:w-full' : 'h-[60%] md:h-full md:mr-4'}`}>
          <div className="mb-1.5 md:mb-2 flex items-center justify-between">
            <span className="text-[10px] md:text-xs font-mono text-slate-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
              渲染引擎：運作中
            </span>
            <button 
              onClick={toggleSidebar}
              className="text-[9px] md:text-[10px] font-mono bg-slate-800/80 hover:bg-slate-700 px-2 py-0.5 md:py-1 rounded border border-slate-700 text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              {isInputCollapsed ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  <span>展開輸入區 (OPEN)</span>
                </>
              ) : (
                <>
                  <span>收納輸入區 (HIDE)</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </>
              )}
            </button>
          </div>
          <div className="flex-1 relative overflow-hidden bg-slate-900/50 border border-slate-800 rounded-xl flex flex-col shadow-inner">
            <div className={`flex-1 overflow-y-auto scroll-smooth ${spacingClass}`}>
              {segments.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-3 opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  <p className="text-[10px] md:text-xs font-mono tracking-wider italic">等待內容輸入中...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {segments.map((seg, idx) => (
                    <div key={idx} className="animate-in fade-in slide-in-from-bottom-1 duration-300">
                      {seg.type === SegmentType.CODE ? (
                        <div className="relative group/code rounded-lg border border-slate-700 bg-slate-800/40 overflow-hidden shadow-sm transition-all hover:border-cyan-500/30">
                          <div className="flex items-center justify-start bg-slate-800/80 px-3 py-1.5 border-b border-slate-700 gap-3">
                            <CopyButton text={seg.content} />
                            <span className="text-[9px] md:text-[10px] font-mono text-slate-500 uppercase tracking-widest truncate">程式碼區塊</span>
                          </div>
                          <pre className={`p-3 md:p-4 overflow-x-auto bg-slate-900/20`}>
                            <code className={`text-cyan-50 font-mono block whitespace-pre-wrap break-all leading-relaxed ${fontSizeClass}`}>
                              {seg.content}
                            </code>
                          </pre>
                        </div>
                      ) : (
                        <div className={`whitespace-pre-wrap text-slate-300 leading-relaxed font-light ${fontSizeClass}`}>
                          {seg.content}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="px-3 py-1.5 md:py-2 bg-slate-900/80 border-t border-slate-800 flex justify-between items-center backdrop-blur-sm">
              <div className="flex gap-3">
                <div className="flex items-center gap-1 text-[9px] md:text-[10px] text-slate-500 font-mono">
                  <span>字數統計:</span>
                  <span className="text-cyan-500">{inputText.length}</span>
                </div>
                <div className="flex items-center gap-1 text-[9px] md:text-[10px] text-slate-500 font-mono">
                  <span>區塊數量:</span>
                  <span className="text-purple-500">{segments.length}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div>
                <span className="text-[9px] md:text-[10px] text-slate-500 font-mono uppercase tracking-tighter">系統就緒 (READY)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Input Panel (Right on Desktop, Bottom on Mobile) */}
        <section className={`flex flex-col min-h-0 transition-all duration-500 ease-in-out ${isInputCollapsed ? 'h-0 opacity-0 pointer-events-none' : 'h-[40%] md:h-full w-full md:w-[350px] lg:w-[450px] opacity-100'}`}>
          <div className="mb-1.5 md:mb-2 flex items-center justify-between">
            <span className="text-[10px] md:text-xs font-mono text-slate-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
              原始內容輸入區
            </span>
          </div>
          <div className="flex-1 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-sm opacity-30 group-focus-within:opacity-100 transition duration-500"></div>
            <textarea
              className={`relative w-full h-full bg-slate-900/60 border border-slate-800 rounded-xl p-3 md:p-4 font-mono resize-none focus:outline-none focus:border-cyan-500/30 transition-all placeholder:text-slate-700 shadow-inner ${fontSizeClass}`}
              placeholder="請在此貼上原始文字... (支援 ``` 自動偵測)"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>
        </section>

      </main>

      {/* Background Decor */}
      <div className="fixed bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-cyan-900/5 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
      <div className="fixed top-[20%] right-[-5%] w-[30%] h-[30%] bg-purple-900/5 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
    </div>
  );
};

export default App;
