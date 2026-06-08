import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { Tool, ViewState } from '../types';

interface ToolCardProps {
  tool: Tool;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onNavigate: (view: ViewState) => void;
}

export default function ToolCard({ tool, isFavorite, onToggleFavorite, onNavigate }: ToolCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative overflow-hidden flex flex-col h-full group">
      <div className="absolute top-0 left-0 w-1 h-full bg-slate-300 group-hover:bg-emerald-500 transition-colors"></div>
      
      <div className="flex justify-between items-start mb-2 pl-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pt-2">
          {tool.category}
        </span>
        <button
          onClick={(e) => onToggleFavorite(tool.id, e)}
          className={`focus:outline-none focus:ring-2 focus:ring-slate-300 rounded-full transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center -mr-2 ${
            isFavorite ? 'text-red-400' : 'text-slate-300 hover:text-slate-400'
          }`}
          aria-label={isFavorite ? `Remove ${tool.title} from favorites` : `Add ${tool.title} to favorites`}
          aria-pressed={isFavorite}
        >
          <span className="text-xl leading-none" aria-hidden="true">{isFavorite ? '♥' : '♡'}</span>
        </button>
      </div>
      
      <h4 className="text-lg font-bold mb-1 pl-2 text-slate-800">{tool.title}</h4>
      <p className="text-xs text-slate-500 flex-grow pl-2 mb-4">{tool.description}</p>
      
      <div className="mt-auto flex items-center justify-between gap-3 pl-2 pt-2">
        <div className="bg-slate-50 text-slate-700 px-3 py-2 rounded-lg text-center flex-1 border border-slate-100 min-w-0">
          <p className="text-[9px] uppercase font-bold opacity-60 m-0">Outcome</p>
          <p className="text-[10px] font-bold truncate m-0" title={tool.primaryOutcome}>{tool.primaryOutcome}</p>
        </div>
        <button
          onClick={() => onNavigate(tool.viewPath)}
          aria-label={`Open ${tool.title}`}
          className="inline-flex items-center justify-center px-4 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[10px] font-bold rounded uppercase tracking-wider transition-colors border border-emerald-100 min-h-[48px] min-w-[70px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          Open
        </button>
      </div>
    </div>
  );
}
