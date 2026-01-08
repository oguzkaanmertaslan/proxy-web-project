
import React from 'react';

const ContactForm: React.FC = () => {
    return (
        <div className="bg-card-dark rounded-xl border border-border-dark p-6">
            <h3 className="text-white font-bold text-lg mb-4">Sizi Arayalım</h3>
            <form className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-text-secondary text-xs font-medium mb-1.5">Adınız Soyadınız</label>
                    <input id="name" name="name" className="w-full rounded-lg bg-[#111318] border border-border-dark text-white px-4 py-2.5 text-sm focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-text-secondary/50" placeholder="Ad Soyad" type="text" />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-text-secondary text-xs font-medium mb-1.5">Telefon Numaranız</label>
                    <input id="phone" name="phone" className="w-full rounded-lg bg-[#111318] border border-border-dark text-white px-4 py-2.5 text-sm focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-text-secondary/50" placeholder="05XX XXX XX XX" type="tel" />
                </div>
                <button type="submit" className="w-full h-10 rounded-lg bg-white text-black hover:bg-gray-200 font-bold text-sm transition-colors">
                    Gönder
                </button>
                <p className="text-[10px] text-text-secondary text-center pt-1">
                    Kişisel verileriniz KVKK kapsamında işlenmektedir.
                </p>
            </form>
        </div>
    );
};

export default ContactForm;
