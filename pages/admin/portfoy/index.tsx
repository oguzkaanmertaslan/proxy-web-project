import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import AdminLayout from '@/components/admin/AdminLayout';

export default function AdminPortfolioPage() {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/admin');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <AdminLayout activePath="/admin/portfoy">
            <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
                <Link className="text-[#616f89] hover:text-primary transition-colors font-medium" href="/">Ana Sayfa</Link>
                <span className="text-[#616f89] material-symbols-outlined text-sm">chevron_right</span>
                <span className="text-primary font-medium bg-primary/10 px-2 py-0.5 rounded text-xs">Portföy Yönetimi</span>
            </div>
            
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-[#111318] dark:text-white text-3xl font-bold tracking-tight">Portföy Yönetimi</h1>
                <p className="text-[#616f89] dark:text-gray-400 text-base">Gayrimenkul ilanlarınızı yönetin ve yeni ilanlar ekleyin.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Yeni İlan Kartı */}
                <Link 
                    href="/admin/portfoy/yeni"
                    className="bg-white dark:bg-[#1e2736] rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 hover:border-primary hover:shadow-lg transition-all group"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <span className="material-symbols-outlined text-primary text-2xl">add_home</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#111318] dark:text-white">Yeni İlan Ekle</h3>
                            <p className="text-sm text-[#616f89]">Portföye yeni gayrimenkul ekleyin</p>
                        </div>
                    </div>
                    <div className="flex items-center text-primary text-sm font-medium">
                        <span>İlan Oluştur</span>
                        <span className="material-symbols-outlined ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </div>
                </Link>

                {/* Tüm İlanlar Kartı */}
                <Link 
                    href="/portfoy"
                    className="bg-white dark:bg-[#1e2736] rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 hover:border-primary hover:shadow-lg transition-all group"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                            <span className="material-symbols-outlined text-green-500 text-2xl">list_alt</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#111318] dark:text-white">Tüm İlanlar</h3>
                            <p className="text-sm text-[#616f89]">Mevcut ilanları görüntüleyin</p>
                        </div>
                    </div>
                    <div className="flex items-center text-green-500 text-sm font-medium">
                        <span>İlanları Görüntüle</span>
                        <span className="material-symbols-outlined ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </div>
                </Link>
            </div>
        </AdminLayout>
    );
}
