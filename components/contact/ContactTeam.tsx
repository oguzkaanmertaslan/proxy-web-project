
import React from 'react';
import { Phone, Mail } from 'lucide-react';

const agents = [
    {
        name: 'Ahmet Yılmaz',
        title: 'Gayrimenkul Danışmanı',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuSAHJOS2stZE5IJArt1qEDyTpq6WoAbreWGKofL4Y4CJ3-TSOH4hOukuPPbfXVqfLlMmWMapUMgCYS60WDExp0SeafEPr_siWXSGC3vMmK5UZEGZcqgAm4JdnTKl-8kjueCNUbJpXFt63PKYqkaGNwAVXJlmH35u1tIGK-BcP_KGpSk0fEl5KOemb8U8j2rxD_F3S0FvV5Mx0UWWLV3QrWB3I_lWFuJKLn_XPDacyxLBdz9nSVzc3ftrqKpu-2wh4A6n7fI0VnFEQ',
        phone: '0532 111 22 33',
        email: 'ahmet@proxy.com'
    },
    {
        name: 'Ayşe Demir',
        title: 'Satış Müdürü',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOi3iCs4qCU4ZWhsVMHzsXuWQJBccXDsrbq1oOjdSbKObu660-hK4ALBaCiAV9ZUJxY5d01Iw69jYTZ-IQ2hBHeV5yb5mPhfwMLK4YRkWlGCcbV_F4a2h7KA--yLh9aT19vy_Aken6suzLnIpGWS67pkM9CmZWrHJJwgkVhwu_w0SLBYl6jLy34inqy5Ks0M50-MJiMUL7ZfyuxVd6aZ_GxrMa_gVV8LJoUNe5BipEChA3njLlCQeweAbKSWKCORf-8GQGax_3L3Nk',
        phone: '0533 444 55 66',
        email: 'ayse@proxy.com'
    },
    {
        name: 'Mehmet Kaya',
        title: 'Kiralama Uzmanı',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJix0BOWnfSIlfvoSkBMNmdWACSGL6QQjw_XPn_HT8cInBuuY5rGMzZ4ZqjzqY6zZ0DJMyo5At1mDO7eaz2b6_95vBh7Gci0An4MIt8wZL-NZHCxx5-GIZs6Bkp2dKrXeQt--MSLh6LsAfZrH0n2LkgUkiM_By5-cCj7oPIP4qVRMfqxhYT-VCGSabJ-t17mHqLGjN7ETHICOkctYJLUA4GG6alz4v8O31agdlcWHsn_2rnm0okywmZ3lZH-Nl7YgDDiGk98XKX__q',
        phone: '0535 777 88 99',
        email: 'mehmet@proxy.com'
    },
    {
        name: 'Zeynep Çelik',
        title: 'Danışman',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAu_g_9OWNvC7CpUQtkjexQm_GrnoHDsod79kGCM8isPkIurKZZzlZaEMzDoZVe8KqtS9VFrqax3SeiYKwAn8liGpJILNjMLCZN8d97oUD6AFHA3-uw7nPvszvUyNR9E8bIGGXJXCjqoOlEkHl1Smu7bVvb-N_4jf9DDe2oTDHfufxoK6HxRw5Y7zuJ19wnnpLukZAAZi8wYhaFSrffhWNcFBuJ0if0dRqcgR3gunzqxD-oczDDjs2hbsH604RyEFQSZ7O2Wmc-tBl',
        phone: '0542 000 11 22',
        email: 'zeynep@proxy.com'
    }
];

const ContactTeam: React.FC = () => {
    return (
        <div className="w-full max-w-[1280px] px-4 sm:px-10 py-10">
            <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] mb-8 text-slate-900">Profesyonel Ekibimiz</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {agents.map(agent => (
                    <div key={agent.name} className="group flex flex-col gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all">
                        <div className="w-full aspect-square bg-center bg-cover rounded-lg overflow-hidden relative" style={{ backgroundImage: `url("${agent.image}")` }}>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                        </div>
                        <div>
                            <p className="text-lg font-bold text-slate-900">{agent.name}</p>
                            <p className="text-sm font-medium text-primary mb-2">{agent.title}</p>
                            <div className="flex items-center gap-2 text-slate-600 text-sm mt-3 pt-3 border-t border-slate-100">
                                <Phone size={16} />
                                <span>{agent.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600 text-sm mt-1">
                                <Mail size={16} />
                                <span className="truncate">{agent.email}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactTeam;
