import { useState, useEffect, useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import FilterBar, { PortfolioFilters, FilterOptions } from '@/components/portfolio/FilterBar';
import ListingCard from '@/components/portfolio/ListingCard';
import Pagination from '@/components/portfolio/Pagination';
import PortfolioFooter from '@/components/portfolio/PortfolioFooter';
import { PortfolioProperty } from '@/types';
import { fetchAllListings } from '@/lib/api';

// Fiyat aralığı sabitleri
const PRICE_RANGES = [
    { label: 'Fark etmez', min: 0, max: Infinity },
    { label: '0 - 5.000.000 ₺', min: 0, max: 5000000 },
    { label: '5.000.000 ₺ - 15.000.000 ₺', min: 5000000, max: 15000000 },
    { label: '15.000.000 ₺ +', min: 15000000, max: Infinity },
];

// Fiyat metninden sayı çıkar
const extractPrice = (priceStr: string): number => {
    const num = priceStr.replace(/[^\d]/g, '');
    return parseInt(num, 10) || 0;
};

export default function PortfolioPage() {
    const [allProperties, setAllProperties] = useState<PortfolioProperty[]>([]);
    const [filteredProperties, setFilteredProperties] = useState<PortfolioProperty[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('Önerilen');
    
    // Filtre state
    const [filters, setFilters] = useState<PortfolioFilters>({
        location: 'Tümü',
        propertyType: 'Tüm Tipler',
        priceRange: 'Fark etmez',
        rooms: 'Fark etmez',
    });

    // Verileri yükle
    useEffect(() => {
        const loadListings = async () => {
            setLoading(true);
            const data = await fetchAllListings();
            setAllProperties(data);
            setFilteredProperties(data);
            setLoading(false);
        };
        loadListings();
    }, []);

    // Dinamik filtre seçeneklerini oluştur
    const filterOptions: FilterOptions = useMemo(() => {
        const locationSet = new Set(allProperties.map(p => {
            const parts = (p.location || '').split(',');
            return parts[0]?.trim() || p.location || '';
        }).filter(Boolean));
        const locations = ['Tümü', ...Array.from(locationSet)];
        
        const roomSet = new Set(allProperties.map(p => p.rooms).filter(r => r && r !== '-'));
        const rooms = ['Fark etmez', ...Array.from(roomSet)];
        
        return {
            locations: locations.length > 1 ? locations : ['Tümü'],
            propertyTypes: ['Tüm Tipler', 'Daire', 'Villa', 'Rezidans', 'Ofis'],
            priceRanges: PRICE_RANGES.map(r => r.label),
            rooms: rooms.length > 1 ? rooms.sort((a, b) => {
                if (a === 'Fark etmez') return -1;
                if (b === 'Fark etmez') return 1;
                return a.localeCompare(b, 'tr');
            }) : ['Fark etmez'],
        };
    }, [allProperties]);

    // Filtre değişikliği
    const handleFilterChange = (key: keyof PortfolioFilters, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    // Filtreleme uygula
    const applyFilters = () => {
        let result = [...allProperties];

        // Konum filtresi
        if (filters.location !== 'Tümü') {
            result = result.filter(p => p.location.toLowerCase().includes(filters.location.toLowerCase()));
        }

        // Fiyat filtresi
        const priceRange = PRICE_RANGES.find(r => r.label === filters.priceRange);
        if (priceRange && filters.priceRange !== 'Fark etmez') {
            result = result.filter(p => {
                const price = extractPrice(p.price);
                return price >= priceRange.min && price <= priceRange.max;
            });
        }

        // Oda sayısı filtresi
        if (filters.rooms !== 'Fark etmez') {
            result = result.filter(p => p.rooms === filters.rooms);
        }

        // Sıralama uygula
        result = sortProperties(result, sortBy);

        setFilteredProperties(result);
    };

    // Sıralama fonksiyonu
    const sortProperties = (properties: PortfolioProperty[], sort: string): PortfolioProperty[] => {
        const sorted = [...properties];
        switch (sort) {
            case 'Fiyat (Düşükten Yükseğe)':
                return sorted.sort((a, b) => extractPrice(a.price) - extractPrice(b.price));
            case 'Fiyat (Yüksekten Düşüğe)':
                return sorted.sort((a, b) => extractPrice(b.price) - extractPrice(a.price));
            case 'En Yeni':
                return sorted.reverse();
            default:
                return sorted;
        }
    };

    // Sıralama değiştiğinde
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSort = e.target.value;
        setSortBy(newSort);
        setFilteredProperties(sortProperties(filteredProperties, newSort));
    };

    return (
        <div className="min-h-screen flex flex-col bg-white text-slate-900">
            <Header />
            <main className="flex-grow w-full max-w-[1440px] mx-auto px-6 lg:px-10 flex flex-col gap-8 pt-28 pb-8">
                {/* Page Heading & Breadcrumb */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1">
                        <span>Ana Sayfa</span>
                        <ChevronRight size={12} />
                        <span className="text-primary font-semibold">Portföy</span>
                    </div>
                    <div className="flex flex-wrap justify-between items-end gap-4">
                        <div className="max-w-2xl">
                            <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-slate-900">Güncel Portföyümüz</h1>
                            <p className="text-slate-500 text-base md:text-lg font-light">Hayalinizdeki gayrimenkulü seçkin ilanlarımız arasından bulun.</p>
                        </div>
                    </div>
                </div>

                <FilterBar 
                    filters={filters}
                    options={filterOptions}
                    onFilterChange={handleFilterChange}
                    onSearch={applyFilters}
                />

                {/* Sort & Count */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-2">
                    <p className="text-slate-600 font-medium"><span className="text-primary font-bold">{filteredProperties.length}</span> ilan bulundu</p>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-500">Sıralama:</span>
                        <select 
                            className="bg-transparent border-none text-sm font-bold text-slate-700 focus:ring-0 cursor-pointer pr-8 py-0 appearance-none"
                            value={sortBy}
                            onChange={handleSortChange}
                        >
                            <option>Önerilen</option>
                            <option>Fiyat (Düşükten Yükseğe)</option>
                            <option>Fiyat (Yüksekten Düşüğe)</option>
                            <option>En Yeni</option>
                        </select>
                    </div>
                </div>

                {/* Grid Layout */}
                {loading ? (
                    <div className="text-center py-12 text-slate-500">İlanlar Yükleniyor...</div>
                ) : filteredProperties.length === 0 ? (
                    <div className="text-center py-12 text-slate-500">
                        <p className="text-lg font-medium">Sonuç bulunamadı</p>
                        <p className="text-sm mt-2">Filtrelerinizi değiştirmeyi deneyin.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProperties.map(property => (
                            <ListingCard key={property.id} property={property} />
                        ))}
                    </div>
                )}

                <Pagination />
            </main>
            <PortfolioFooter />
        </div>
    );
}
