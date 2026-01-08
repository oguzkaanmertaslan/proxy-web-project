
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination: React.FC = () => {
    return (
        <div className="flex justify-center mt-12 mb-8">
            <div className="flex items-center gap-1 bg-card-dark p-1.5 rounded-lg border border-border-dark shadow-sm">
                <button className="size-10 flex items-center justify-center rounded-lg hover:bg-background-dark text-slate-400 transition-colors">
                    <ChevronLeft size={20} />
                </button>
                <button className="size-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-sm shadow-md shadow-primary/30">1</button>
                <button className="size-10 flex items-center justify-center rounded-lg hover:bg-background-dark text-slate-300 font-medium text-sm transition-colors">2</button>
                <button className="size-10 flex items-center justify-center rounded-lg hover:bg-background-dark text-slate-300 font-medium text-sm transition-colors">3</button>
                <span className="w-8 flex justify-center items-center text-slate-400">...</span>
                <button className="size-10 flex items-center justify-center rounded-lg hover:bg-background-dark text-slate-300 font-medium text-sm transition-colors">8</button>
                <button className="size-10 flex items-center justify-center rounded-lg hover:bg-background-dark text-slate-400 transition-colors">
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
