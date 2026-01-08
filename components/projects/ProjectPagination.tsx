
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProjectPagination: React.FC = () => {
    return (
        <div className="flex justify-center mt-12">
            <nav className="flex items-center gap-2">
                <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-border-dark text-text-secondary hover:bg-card-dark hover:text-white transition-colors">
                    <ChevronLeft size={20} />
                </button>
                <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-white font-bold text-sm">1</button>
                <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-border-dark text-text-secondary hover:bg-card-dark hover:text-white transition-colors">2</button>
                <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-border-dark text-text-secondary hover:bg-card-dark hover:text-white transition-colors">3</button>
                <span className="text-text-secondary px-2">...</span>
                <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-border-dark text-text-secondary hover:bg-card-dark hover:text-white transition-colors">
                    <ChevronRight size={20} />
                </button>
            </nav>
        </div>
    );
};

export default ProjectPagination;
