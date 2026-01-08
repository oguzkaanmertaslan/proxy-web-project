
import React from 'react';
import { CheckCircle } from 'lucide-react';

const Projects: React.FC = () => {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-slate-900 text-3xl md:text-4xl font-black tracking-tight mb-4">Güncel Projelerimiz</h2>
                    <p className="text-slate-500">Şehre değer katan, modern mimarinin en iyi örneklerini sunan prestijli projelerimizi inceleyin.</p>
                </div>
                <div className="space-y-12">
                    {/* Project 1 */}
                    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-lg flex flex-col md:flex-row group hover:border-primary/30 transition-colors">
                        <div className="md:w-1/2 relative min-h-[300px] overflow-hidden">
                            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXLC6L23LpOa9pTtXrJN2qYkeluGTddssMon0YjX9zXiLezH1D9hwf5zhqNNe-cvGtbqnGlssk09JTBZ3eXdSm4JKOG_scK6eFj6pv6HXoN651BZo8XVrmfqgAPGWmlT_kIikEwBeCFO9xdIQJgy1n3KKY0p0ITiBr47NGF4lwmKSt4IrAh0XlTQWGbSQ0kdPfV0mmWhmd7q2gkTu8M9SfQWkwPTi_SzUPcggT0ZQPaJ7JkhdsMRqyZT291gbrh1hJXjUiu8WE2BL9" alt="Skyline Towers" />
                        </div>
                        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">Yapım Aşamasında</span>
                                <span className="text-slate-500 text-sm">Teslim: 2025</span>
                            </div>
                            <h3 className="text-slate-900 text-2xl md:text-3xl font-bold mb-4">Skyline Towers</h3>
                            <p className="text-slate-500 mb-6 leading-relaxed">
                                İstanbul'un kalbinde, panoramik boğaz manzarası ve akıllı ev teknolojileriyle donatılmış 45 katlı ikonik bir yaşam projesi. Spa, spor salonu ve özel vale hizmetleri ile.
                            </p>
                            <ul className="space-y-2 mb-8 text-sm text-slate-600">
                                <li className="flex items-center gap-2"><CheckCircle className="text-primary" size={20} /><span>Merkezi Konum</span></li>
                                <li className="flex items-center gap-2"><CheckCircle className="text-primary" size={20} /><span>Yüksek Kira Getirisi</span></li>
                                <li className="flex items-center gap-2"><CheckCircle className="text-primary" size={20} /><span>Sosyal Donatılar</span></li>
                            </ul>
                            <div>
                                <button className="px-6 py-3 rounded-lg border border-slate-300 hover:bg-primary hover:text-white hover:border-primary text-slate-700 font-medium transition-colors">Projeyi İncele</button>
                            </div>
                        </div>
                    </div>

                    {/* Project 2 */}
                    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-lg flex flex-col md:flex-row-reverse group hover:border-primary/30 transition-colors">
                        <div className="md:w-1/2 relative min-h-[300px] overflow-hidden">
                            <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQLjfIAYC0fvEG7qSv8RUC28H0k5aM2bSdradrCg9mLkLJBkjJZfHrKsGTzm6AvCw5tpmZSJOdddnZBSeBnGNQh_2Tq9H6uqG9P5kXhX47v67EWjzFWDKvofSNVEEkKKH_jx2ahy3HhuF6UjV_jMYhiX8TJWFQ3DN0IP7HUslF7UZlphxyPnu6JtoJLx4asd-PwotpA16Ctdn9Z1Y4fJm0Jq2VUo0gqy2BCd30VoF2Wgdui-w0NYJtUwb8P-548Y2L6Nl4ZMTbuSkb" alt="Green Valley Villaları" />
                        </div>
                        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-200">Satışta</span>
                                <span className="text-slate-500 text-sm">Hemen Teslim</span>
                            </div>
                            <h3 className="text-slate-900 text-2xl md:text-3xl font-bold mb-4">Green Valley Villaları</h3>
                            <p className="text-slate-500 mb-6 leading-relaxed">
                                Doğayla iç içe, şehrin gürültüsünden uzak ama bir o kadar da ulaşılabilir. 20 dönüm arazi üzerine kurulu, özel havuzlu ve geniş bahçeli 12 seçkin villa.
                            </p>
                            <div className="flex gap-4 mb-8">
                                <div className="bg-slate-100 p-3 rounded-lg text-center flex-1"><span className="block text-xl font-bold text-slate-900">12</span><span className="text-xs text-slate-500">Villa</span></div>
                                <div className="bg-slate-100 p-3 rounded-lg text-center flex-1"><span className="block text-xl font-bold text-slate-900">500+</span><span className="text-xs text-slate-500">m² Bahçe</span></div>
                                <div className="bg-slate-100 p-3 rounded-lg text-center flex-1"><span className="block text-xl font-bold text-slate-900">7/24</span><span className="text-xs text-slate-500">Güvenlik</span></div>
                            </div>
                            <div>
                                <button className="px-6 py-3 rounded-lg border border-slate-300 hover:bg-primary hover:text-white hover:border-primary text-slate-700 font-medium transition-colors">Projeyi İncele</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;

