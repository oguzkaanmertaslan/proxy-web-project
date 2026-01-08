
import React from 'react';
import Link from '../Link';
import { ArrowRight } from 'lucide-react';
import { TeamMember } from '../../types';

const team: TeamMember[] = [
    {
        name: 'Ahmet Yılmaz',
        title: 'Kurucu Ortak',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIUVBZihWqPdGe0VkqMylJrSu7WJI3I3R3Wf5MsbSusxpaPp1VKHA5EohGVOVi2Ri0FTmW2wZktIXvsShHSSXSeb6xJdrcLAYDLU_7VOq8-rCmlr13RNZQWsGDbuWgsmrbl2y0FBTMxWBENUg3tca8u9BhNsE3_l3dPx84GBXrUYRCW7muzGXDPXk8IjBB3WlxZHbdzWgx2KOec_lsB1YYYtze0S3xcKB3sItcUeqRy-RRrb_Ca05Xe2hJ27SIMu0QWf5MmrfkV1tu'
    },
    {
        name: 'Zeynep Kaya',
        title: 'Genel Müdür',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgiIFMBDGWRrsELwzVRXaYbdH3ny0d4WsOQgE-Prj-P0K3Yo-Wrxxg2pV2vHQM7ktSNp5L9dsbRHjrmerzjXRQNT9vJIYamprndDoBVfyAP1cK2W7-O1qGfql-VsQT1zYeL173mLSNXCujPFJ5zzTz0a_N9bFY8TWzARGTAxArT0ga1kdaOwoBJgsbQSijc2oRt3KQb5SkKAjN0fW39GDrAo4ucnvPqLPiWpEOk-KH4KlzU8pL542l0zUAKV0QpaCoSOdKZQSJg7zD'
    },
    {
        name: 'Mehmet Demir',
        title: 'Satış Direktörü',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYn0EuF5w7h9uAHhNstItCONT3z1Cx0ymiWQfLhbXab76Xr--6o7Z5A9A-ISzp7Uw-q8Z7URKiQ3sKR9Iu_2b4rbY78TBlxj1a7a9E57uztJZ9j3H54zgN4554YWmBc1rcDEev5hfFhtOLUcqQivv7jVt1ta9hjXbevdDzzm3pcJOW-y6mA3Meall3qtZJgYgIhq1lvOTpXZZz6IX3U2UU6a3hVHcFJ7wB2pEyGwDLsraGfW9WohySzC5ZbWy8IYzf1zEQbE1GVoPf'
    },
    {
        name: 'Ayşe Yıldız',
        title: 'Müşteri İlişkileri',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCR56fUsoO0DIpM-UvukS8DEbfBSqqMCcVbQgs8iOmUGnPil_kvjeNGVgHlEp4CmsX_5_aXn74xANt9OXKsCbaOmzuzXPM6hk7_9BLQFQ9iy_LhgEbMK9GSKkdzjaHXjhtyE3Mz-lNrsnA6Erwzih2MCoDXl936XIGHUb5Tw0URs8LRV8yC24-bKfL7FstJPRdHSJJgwE0YCe3AwcZlI8030INeRItYVWIkhGaF_0Mb9_SbSh32KmXQUywnxV3pHrQb5u18NxPN80uV'
    }
];

const TeamSection: React.FC = () => {
    return (
        <section className="py-20 px-4 md:px-10 bg-white">
            <div className="max-w-[1280px] mx-auto">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Yönetim Kadrosu</h2>
                        <p className="text-slate-600 mt-2">Deneyimli liderlerimizle tanışın</p>
                    </div>
                    <Link className="hidden md:flex items-center gap-1 text-primary font-bold hover:gap-2 transition-all" href="#">
                        Tüm Ekibi Gör <ArrowRight size={16} />
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {team.map(member => (
                        <div key={member.name} className="group relative overflow-hidden rounded-xl">
                            <div className="aspect-[3/4] w-full bg-slate-100 relative">
                                <img src={member.image} alt={`Portrait of ${member.name}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                                <div className="absolute bottom-0 left-0 p-4 w-full">
                                    <h3 className="text-white font-bold text-lg">{member.name}</h3>
                                    <p className="text-gray-300 text-sm">{member.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8 text-center md:hidden">
                    <Link className="inline-flex items-center gap-1 text-primary font-bold" href="#">
                        Tüm Ekibi Gör <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
