import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectFilters, { ProjectFiltersState, ProjectFilterOptions } from '@/components/projects/ProjectFilters';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectPagination from '@/components/projects/ProjectPagination';
import { Project } from '@/types';
import { fetchAllProjects } from '@/lib/api';

// Fiyat aralığı sabitleri
const PRICE_RANGES = [
    { label: 'Tümü', min: 0, max: Infinity },
    { label: '0 - 5.000.000 ₺', min: 0, max: 5000000 },
    { label: '5.000.000 ₺ - 15.000.000 ₺', min: 5000000, max: 15000000 },
    { label: '15.000.000 ₺ +', min: 15000000, max: Infinity },
];

// Fiyat metninden sayı çıkar
const extractPrice = (priceStr: string): number => {
    const num = priceStr.replace(/[^\d]/g, '');
    return parseInt(num, 10) || 0;
};

export default function ProjectsPage() {
    const [allProjects, setAllProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    // Filtre state
    const [filters, setFilters] = useState<ProjectFiltersState>({
        city: 'Tümü',
        priceRange: 'Tümü',
        deliveryDate: 'Tümü',
        propertyType: 'Tümü',
    });

    useEffect(() => {
        const loadProjects = async () => {
            setLoading(true);
            const data = await fetchAllProjects();
            setAllProjects(data);
            setFilteredProjects(data);
            setLoading(false);
        };

        loadProjects();
    }, []);

    // Dinamik filtre seçeneklerini oluştur
    const filterOptions: ProjectFilterOptions = useMemo(() => {
        const citySet = new Set(allProjects.map(p => {
            const parts = (p.location || '').split(',');
            return parts[parts.length - 1]?.trim() || parts[0]?.trim() || '';
        }).filter(Boolean));
        
        // Teslim tarihlerini details'den çıkar
        const deliverySet = new Set(allProjects.flatMap(p => 
            (p.details || [])
                .filter(d => d.label?.toLowerCase().includes('teslim'))
                .map(d => d.value)
        ).filter(Boolean));

        return {
            cities: ['Tümü', ...Array.from(citySet)],
            priceRanges: PRICE_RANGES.map(r => r.label),
            deliveryDates: ['Tümü', ...Array.from(deliverySet)],
            propertyTypes: ['Tümü', 'Daire', 'Villa', 'Rezidans'],
        };
    }, [allProjects]);

    // Filtre değişikliği
    const handleFilterChange = (key: keyof ProjectFiltersState, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        
        // Anında filtrele
        setTimeout(() => {
            applyFilters({ ...filters, [key]: value });
        }, 0);
    };

    // Filtreleme uygula
    const applyFilters = (currentFilters: ProjectFiltersState) => {
        let result = [...allProjects];

        // Şehir filtresi
        if (currentFilters.city !== 'Tümü') {
            result = result.filter(p => 
                (p.location || '').toLowerCase().includes(currentFilters.city.toLowerCase())
            );
        }

        // Fiyat filtresi
        const priceRange = PRICE_RANGES.find(r => r.label === currentFilters.priceRange);
        if (priceRange && currentFilters.priceRange !== 'Tümü') {
            result = result.filter(p => {
                const price = extractPrice(p.price);
                return price >= priceRange.min && price <= priceRange.max;
            });
        }

        // Teslim tarihi filtresi
        if (currentFilters.deliveryDate !== 'Tümü') {
            result = result.filter(p => 
                (p.details || []).some(d => 
                    d.label?.toLowerCase().includes('teslim') && 
                    d.value === currentFilters.deliveryDate
                )
            );
        }

        setFilteredProjects(result);
    };

    return (
        <div className="min-h-screen flex flex-col bg-white text-slate-900">
            <Header />
            <main className="flex-grow pt-20">
                <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-6 md:py-10">
                    {/* Breadcrumbs */}
                    <div className="flex flex-wrap items-center gap-2 mb-6 text-sm font-medium">
                        <Link className="text-slate-500 hover:text-primary transition-colors" href="/">Ana Sayfa</Link>
                        <span className="text-slate-400">/</span>
                        <span className="text-primary font-semibold">Projeler</span>
                    </div>
                    
                    {/* Page Heading */}
                    <div className="border-b border-slate-200 pb-8 mb-8">
                        <div className="max-w-2xl">
                            <h1 className="text-slate-900 text-3xl md:text-5xl font-black leading-tight tracking-tight mb-4">
                                Yatırım Fırsatları ve Projeler
                            </h1>
                            <p className="text-slate-500 text-lg font-normal leading-relaxed">
                                Geleceğinizi güvence altına alacak, yüksek getiri potansiyeline sahip en seçkin gayrimenkul projelerini inceleyin.
                            </p>
                        </div>
                    </div>

                    <ProjectFilters 
                        filters={filters}
                        options={filterOptions}
                        onFilterChange={handleFilterChange}
                        resultCount={filteredProjects.length}
                    />

                    {/* Project Grid */}
                    {loading ? (
                        <div className="text-center py-12 text-slate-500">Projeler Yükleniyor...</div>
                    ) : filteredProjects.length === 0 ? (
                        <div className="text-center py-12 text-slate-500">
                            <p className="text-lg font-medium">Sonuç bulunamadı</p>
                            <p className="text-sm mt-2">Filtrelerinizi değiştirmeyi deneyin.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {filteredProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>
                    )}

                    <ProjectPagination />
                </div>
            </main>
            <Footer />
        </div>
    );
}
