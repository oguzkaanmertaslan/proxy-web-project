import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectGallery from '@/components/project-detail/ProjectGallery';
import ProjectDescription from '@/components/project-detail/ProjectDescription';
import ProjectAmenities from '@/components/project-detail/ProjectAmenities';
import ProjectInfoCard from '@/components/project-detail/ProjectInfoCard';
import ContactForm from '@/components/project-detail/ContactForm';
import { ProjectDetail } from '@/types';
import { fetchProjectById } from '@/lib/api';

export default function ProjectDetailPage() {
    const router = useRouter();
    const { id } = router.query;
    
    const [project, setProject] = useState<ProjectDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProjectDetail = async () => {
            if (!id || typeof id !== 'string') return;
            
            setLoading(true);
            setError(null);

            const data = await fetchProjectById(id);
            
            if (data) {
                setProject(data);
            } else {
                setError('Proje bulunamadı veya yüklenirken bir sorun oluştu.');
            }
            setLoading(false);
        };

        loadProjectDetail();
    }, [id]);

    if (loading) {
        return <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center">Proje Yükleniyor...</div>;
    }

    if (error || !project) {
        return <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center">{error || 'Proje bulunamadı.'}</div>;
    }

    return (
        <div className="min-h-screen flex flex-col bg-white text-slate-900">
            <Header />
            <main className="flex-grow pt-20">
                <div className="max-w-[1440px] mx-auto px-4 md:px-10 py-6 md:py-10">
                    {/* Breadcrumbs */}
                    <div className="flex flex-wrap items-center gap-2 mb-6 text-sm font-medium">
                        <Link className="text-slate-500 hover:text-primary transition-colors" href="/">Ana Sayfa</Link>
                        <span className="text-slate-400">/</span>
                        <Link className="text-slate-500 hover:text-primary transition-colors" href="/projeler">Projeler</Link>
                        <span className="text-slate-400">/</span>
                        <span className="text-primary font-semibold">{project.title}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        {/* Left Column */}
                        <div className="col-span-12 lg:col-span-7 space-y-6">
                            <ProjectGallery gallery={project.gallery} tags={project.tags} />
                            <ProjectDescription 
                                description={project.description} 
                                highlights={project.investmentHighlights} 
                            />
                            <ProjectAmenities amenities={project.amenities} />
                        </div>
                        {/* Right Column (Sticky) */}
                        <div className="col-span-12 lg:col-span-5">
                            <div className="lg:sticky lg:top-24 space-y-6">
                               <ProjectInfoCard
                                    title={project.title}
                                    location={project.location}
                                    summary={project.summary}
                               />
                               <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
