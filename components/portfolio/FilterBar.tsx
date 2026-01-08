
import React from 'react';
import { MapPin, Home, Wallet, Bed, Search, ChevronDown } from 'lucide-react';

export interface PortfolioFilters {
    location: string;
    propertyType: string;
    priceRange: string;
    rooms: string;
}

export interface FilterOptions {
    locations: string[];
    propertyTypes: string[];
    priceRanges: string[];
    rooms: string[];
}

interface SelectInputProps {
    label: string;
    icon: React.ElementType;
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ label, icon: Icon, options, value, onChange }) => (
    <div className="relative">
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">{label}</label>
        <div className="relative">
            <select 
                className="w-full h-12 bg-white border border-slate-200 rounded-lg pl-10 pr-4 text-sm font-medium text-slate-700 appearance-none focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        </div>
    </div>
);

interface FilterBarProps {
    filters: PortfolioFilters;
    options: FilterOptions;
    onFilterChange: (key: keyof PortfolioFilters, value: string) => void;
    onSearch: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, options, onFilterChange, onSearch }) => {
    return (
        <div className="bg-slate-50 rounded-xl p-4 md:p-6 border border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <SelectInput 
                    label="Konum" 
                    icon={MapPin} 
                    options={options.locations}
                    value={filters.location}
                    onChange={(v) => onFilterChange('location', v)}
                />
                <SelectInput 
                    label="Emlak Tipi" 
                    icon={Home} 
                    options={options.propertyTypes}
                    value={filters.propertyType}
                    onChange={(v) => onFilterChange('propertyType', v)}
                />
                <SelectInput 
                    label="Fiyat Aralığı" 
                    icon={Wallet} 
                    options={options.priceRanges}
                    value={filters.priceRange}
                    onChange={(v) => onFilterChange('priceRange', v)}
                />
                <SelectInput 
                    label="Oda Sayısı" 
                    icon={Bed} 
                    options={options.rooms}
                    value={filters.rooms}
                    onChange={(v) => onFilterChange('rooms', v)}
                />
                <div className="flex items-end">
                    <button 
                        onClick={onSearch}
                        className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
                    >
                        <Search size={18} />
                        <span>Filtrele</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
