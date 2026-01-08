
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import PropertyCard from './PropertyCard';
import { Property } from '../types';
import Link from './Link';
import { fetchFeaturedListings } from '../lib/api';

const FeaturedProperties: React.FC = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProperties = async () => {
            setLoading(true);
            const data = await fetchFeaturedListings();
            setProperties(data);
            setLoading(false);
        };

        loadProperties();
    }, []);

    return (
        <section className="py-16 md:py-24 bg-slate-50">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <h2 className="text-slate-900 text-3xl font-bold tracking-tight mb-2">Öne Çıkan Portföyler</h2>
                        <p className="text-slate-500">Sizin için seçtiğimiz özel yaşam alanları</p>
                    </div>
                    <Link className="hidden sm:flex items-center gap-1 text-primary hover:text-primary-hover font-semibold text-sm transition-colors" href="/portfoy">
                        Tümünü Gör <ArrowRight size={18} />
                    </Link>
                </div>
                 {loading ? (
                    <div className="text-center text-slate-500">Yükleniyor...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {properties.map(property => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedProperties;