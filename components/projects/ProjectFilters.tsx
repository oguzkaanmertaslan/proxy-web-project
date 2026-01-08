
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export interface ProjectFiltersState {
    city: string;
    priceRange: string;
    deliveryDate: string;
    propertyType: string;
}

export interface ProjectFilterOptions {
    cities: string[];
    priceRanges: string[];
    deliveryDates: string[];
    propertyTypes: string[];
}

interface FilterDropdownProps {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ label, value, options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Dışarı tıklandığında kapat
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const displayValue = value === 'Tümü' ? `${label}: Tümü` : value;

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="group flex h-10 items-center gap-2 rounded-lg bg-white hover:bg-slate-50 px-4 transition-colors border border-slate-200 hover:border-primary shadow-sm"
            >
                <span className="text-slate-700 group-hover:text-primary text-sm font-medium">{displayValue}</span>
                <ChevronDown className={`text-slate-400 group-hover:text-primary transition-transform ${isOpen ? 'rotate-180' : ''}`} size={20} />
            </button>
            
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                    {options.map((option) => (
                        <button
                            key={option}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${
                                value === option ? 'text-primary font-semibold bg-primary/5' : 'text-slate-700'
                            }`}
                            onClick={() => {
                                onChange(option);
                                setIsOpen(false);
                            }}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

interface ProjectFiltersProps {
    filters: ProjectFiltersState;
    options: ProjectFilterOptions;
    onFilterChange: (key: keyof ProjectFiltersState, value: string) => void;
    resultCount: number;
}

const ProjectFilters: React.FC<ProjectFiltersProps> = ({ filters, options, onFilterChange, resultCount }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex flex-wrap gap-3">
                <FilterDropdown 
                    label="Şehir"
                    value={filters.city}
                    options={options.cities}
                    onChange={(v) => onFilterChange('city', v)}
                />
                <FilterDropdown 
                    label="Fiyat Aralığı"
                    value={filters.priceRange}
                    options={options.priceRanges}
                    onChange={(v) => onFilterChange('priceRange', v)}
                />
                <FilterDropdown 
                    label="Teslim Tarihi"
                    value={filters.deliveryDate}
                    options={options.deliveryDates}
                    onChange={(v) => onFilterChange('deliveryDate', v)}
                />
                <FilterDropdown 
                    label="Konut Tipi"
                    value={filters.propertyType}
                    options={options.propertyTypes}
                    onChange={(v) => onFilterChange('propertyType', v)}
                />
            </div>
            <div className="text-slate-500 text-sm font-medium">
                <span className="text-primary font-bold">{resultCount}</span> proje listeleniyor
            </div>
        </div>
    );
};

export default ProjectFilters;
