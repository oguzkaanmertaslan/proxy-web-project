
import React from 'react';
import AdminSidebar from './AdminSidebar';

interface AdminLayoutProps {
    children: React.ReactNode;
    activePath: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activePath }) => {
    return (
        <div className="flex h-screen w-full bg-background-light dark:bg-background-dark text-[#111318] dark:text-white antialiased overflow-hidden">
            <AdminSidebar activePath={activePath} />
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                <div className="flex-1 overflow-y-auto p-8 lg:px-12 pb-24">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
