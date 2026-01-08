
import React from 'react';
import { useRouter } from 'next/router';
import Link from '../Link';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
    { href: "/admin/portfoy", icon: "domain", label: "Portföy Yönetimi" },
    { href: "/admin/projeler/yeni", icon: "assignment", label: "Proje Yönetimi" },
    { href: "/admin/musteriler", icon: "people", label: "Müşteriler" },
    { href: "/admin/raporlar", icon: "analytics", label: "Raporlar" },
];

interface AdminSidebarProps {
    activePath: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activePath }) => {
    const router = useRouter();
    const { user, signOut } = useAuth();

    const isActive = (href: string) => {
        return activePath.startsWith(href);
    }

    const handleLogout = async () => {
        await signOut();
        router.push('/admin');
    };

    return (
        <aside className="w-64 bg-navy-sidebar flex flex-col justify-between h-full shadow-xl z-20 shrink-0 transition-all duration-300">
            <div className="flex flex-col p-4 gap-6">
                <div className="flex items-center gap-3 px-2 pt-2">
                    <div className="bg-primary/20 flex items-center justify-center rounded-lg size-10 text-white">
                        <span className="material-symbols-outlined text-primary text-[28px]">real_estate_agent</span>
                    </div>
                    <h1 className="text-white text-lg font-bold tracking-wide">Emlak Panel</h1>
                </div>
                <nav className="flex flex-col gap-2 mt-4">
                    {navLinks.map(link => (
                        <Link 
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                                isActive(link.href)
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[22px] group-hover:scale-110 transition-transform">{link.icon}</span>
                            <span className="text-sm font-medium">{link.label}</span>
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="p-4 border-t border-white/10">
                <div 
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-2 py-2 cursor-pointer hover:bg-white/5 rounded-lg transition-colors"
                >
                    <div className="bg-primary/20 flex items-center justify-center rounded-full size-10 text-white">
                        <span className="material-symbols-outlined text-primary text-xl">person</span>
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <p className="text-white text-sm font-medium truncate">{user?.email || 'Admin'}</p>
                        <p className="text-slate-400 text-xs truncate">Yönetici</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-500 ml-auto hover:text-red-400 transition-colors">logout</span>
                </div>
            </div>
        </aside>
    );
};

export default AdminSidebar;

