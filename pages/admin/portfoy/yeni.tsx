import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';
import {
    roomCountOptions,
    buildingAgeOptions,
    floorInfoOptions,
    heatingTypeOptions,
    bathroomCountOptions
} from '@/lib/formOptions';

// Image preview type
interface ImagePreview {
    file: File;
    previewUrl: string;
}

export default function AdminNewListingPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();

    // Auth check
    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/admin');
        }
    }, [user, authLoading, router]);

    const initialFormState = {
        title: '',
        price: '',
        status: '',
        location_text: '',
        room_count: '',
        area_sqm: '',
        building_age: '',
        floor_info: '',
        heating_type: '',
        bathroom_count: '',
        has_balcony: false,
        is_credit_eligible: false,
        agent_id: '',
        description: ''
    };

    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState<Partial<typeof initialFormState>>({});
    const [loading, setLoading] = useState(false);
    const [formMessage, setFormMessage] = useState({ type: '', text: '' });
    const [uploadProgress, setUploadProgress] = useState('');
    
    // Image upload state
    const [selectedImages, setSelectedImages] = useState<ImagePreview[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const MAX_IMAGES = 10;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    // File handling functions
    const handleFileSelect = (files: FileList | null) => {
        if (!files) return;
        
        const validFiles: ImagePreview[] = [];
        const remainingSlots = MAX_IMAGES - selectedImages.length;
        
        for (let i = 0; i < Math.min(files.length, remainingSlots); i++) {
            const file = files[i];
            if (file.type.startsWith('image/')) {
                validFiles.push({
                    file,
                    previewUrl: URL.createObjectURL(file)
                });
            }
        }
        
        setSelectedImages(prev => [...prev, ...validFiles]);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFileSelect(e.target.files);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFileSelect(e.dataTransfer.files);
    };

    const removeImage = (index: number) => {
        setSelectedImages(prev => {
            const newImages = [...prev];
            URL.revokeObjectURL(newImages[index].previewUrl);
            newImages.splice(index, 1);
            return newImages;
        });
    };

    const validateForm = () => {
        const newErrors: Partial<typeof initialFormState> = {};
        if (!formData.title) newErrors.title = 'İlan başlığı zorunludur.';
        if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Geçerli bir fiyat giriniz.';
        if (!formData.status) newErrors.status = 'Durum seçimi zorunludur.';
        if (!formData.location_text) newErrors.location_text = 'Konum bilgisi zorunludur.';
        if (!formData.room_count) newErrors.room_count = 'Oda sayısı zorunludur.';
        if (!formData.area_sqm) newErrors.area_sqm = 'Metrekare bilgisi zorunludur.';
        return newErrors;
    };

    // Upload images to Cloudflare R2 via API route
    const uploadImages = async (listingId: number): Promise<string[]> => {
        const uploadedUrls: string[] = [];
        
        for (let i = 0; i < selectedImages.length; i++) {
            const image = selectedImages[i];
            setUploadProgress(`Görsel yükleniyor: ${i + 1}/${selectedImages.length}`);
            
            const formDataUpload = new FormData();
            formDataUpload.append('file', image.file);
            
            const response = await fetch('/api/upload-listing-image', {
                method: 'POST',
                body: formDataUpload,
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Görsel yüklenemedi: ${error.error || 'Bilinmeyen hata'}`);
            }
            
            const { url } = await response.json();
            uploadedUrls.push(url);
        }
        
        return uploadedUrls;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormMessage({ type: '', text: '' });
        setUploadProgress('');
        
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);

        try {
            // Step 1: Insert into 'listings' table
            const listing_uid = `PXY-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
            setUploadProgress('İlan kaydediliyor...');

            const listingData = {
                title: formData.title,
                price: parseFloat(formData.price),
                status: formData.status,
                location_text: formData.location_text,
                room_count: formData.room_count || null,
                area_sqm: formData.area_sqm || null,
                building_age: formData.building_age ? parseInt(formData.building_age, 10) : null,
                floor_info: formData.floor_info,
                heating_type: formData.heating_type,
                bathroom_count: formData.bathroom_count || null,
                has_balcony: formData.has_balcony,
                is_credit_eligible: formData.is_credit_eligible,
                description: formData.description,
                listing_uid: listing_uid,
                currency: 'TRY',
                agent_id: formData.agent_id ? parseInt(formData.agent_id, 10) : null,
            };

            const { data: insertedListing, error: listingError } = await supabase
                .from('listings')
                .insert(listingData)
                .select()
                .single();

            if (listingError) throw listingError;

            // Step 2: Upload images to Storage and save to listing_images
            if (selectedImages.length > 0 && insertedListing) {
                const imageUrls = await uploadImages(insertedListing.id);
                
                setUploadProgress('Görseller veritabanına kaydediliyor...');
                
                // Insert all images to listing_images table
                const imageRecords = imageUrls.map((url, index) => ({
                    listing_id: insertedListing.id,
                    image_url: url,
                    is_primary: index === 0 // First image is primary
                }));
                
                const { error: imageError } = await supabase
                    .from('listing_images')
                    .insert(imageRecords);
                
                if (imageError) {
                    console.error('Image DB insert failed:', imageError);
                    throw new Error('Görseller veritabanına eklenemedi: ' + imageError.message);
                }
            }
            
            // Clean up preview URLs
            selectedImages.forEach(img => URL.revokeObjectURL(img.previewUrl));
            
            setFormMessage({ type: 'success', text: 'İlan başarıyla yayınlandı! ID: ' + listing_uid });
            setFormData(initialFormState);
            setSelectedImages([]);
            setErrors({});
            setUploadProgress('');

        } catch (error: any) {
            console.error("Submit error:", error);
            setFormMessage({ type: 'error', text: 'Bir hata oluştu: ' + error.message });
            setUploadProgress('');
        } finally {
            setLoading(false);
        }
    };

    // Show loading while checking auth
    if (authLoading) {
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
                <Link className="text-[#616f89] hover:text-primary transition-colors font-medium" href="/admin/portfoy">Portföy</Link>
                <span className="text-[#616f89] material-symbols-outlined text-sm">chevron_right</span>
                <span className="text-primary font-medium bg-primary/10 px-2 py-0.5 rounded text-xs">Yeni İlan</span>
            </div>
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-[#111318] dark:text-white text-3xl font-bold tracking-tight">Yeni Gayrimenkul İlanı</h1>
                <p className="text-[#616f89] dark:text-gray-400 text-base">Lütfen yeni ilanınıza ait detayları aşağıdaki formu doldurarak sisteme kaydediniz.</p>
            </div>
            <div className="bg-white dark:bg-[#1e2736] rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 max-w-5xl">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" onSubmit={handleSubmit} noValidate>
                    {formMessage.text && (
                         <div className={`col-span-1 md:col-span-2 p-4 rounded-lg border ${formMessage.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'} flex items-center gap-3 text-sm font-medium`}>
                             <span className="material-symbols-outlined">{formMessage.type === 'success' ? 'check_circle' : 'error'}</span>
                             <span>{formMessage.text}</span>
                         </div>
                    )}
                    <div className="col-span-1 md:col-span-2 space-y-1">
                        <label className="block text-sm font-medium text-[#111318] dark:text-gray-200">İlan Başlığı</label>
                        <input name="title" value={formData.title} onChange={handleChange} className={`w-full h-12 px-4 rounded-lg border ${errors.title ? 'border-red-500' : 'border-[#dbdfe6] dark:border-slate-600'} bg-white dark:bg-[#101622] text-[#111318] dark:text-white placeholder:text-[#616f89] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm`} placeholder="Örn: Kadıköy Moda'da Deniz Manzaralı 3+1" type="text" />
                        {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-[#111318] dark:text-gray-200">Fiyat</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#616f89] font-medium">₺</span>
                            <input name="price" value={formData.price} onChange={handleChange} className={`w-full h-12 pl-10 pr-4 rounded-lg border ${errors.price ? 'border-red-500' : 'border-[#dbdfe6] dark:border-slate-600'} bg-white dark:bg-[#101622] text-[#111318] dark:text-white placeholder:text-[#616f89] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm`} placeholder="0.00" type="number" />
                        </div>
                        {errors.price && <p className="text-red-500 text-xs">{errors.price}</p>}
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-[#111318] dark:text-gray-200">Durum</label>
                        <div className="relative">
                            <select name="status" value={formData.status} onChange={handleChange} className={`w-full h-12 px-4 rounded-lg border ${errors.status ? 'border-red-500' : 'border-[#dbdfe6] dark:border-slate-600'} bg-white dark:bg-[#101622] text-[#111318] dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none transition-all text-sm cursor-pointer`}>
                                <option disabled value="">Seçiniz</option>
                                <option value="Satılık">Satılık</option>
                                <option value="Kiralık">Kiralık</option>
                                <option value="Devren">Devren</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#616f89] pointer-events-none">expand_more</span>
                        </div>
                        {errors.status && <p className="text-red-500 text-xs">{errors.status}</p>}
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-[#111318] dark:text-gray-200">Konum</label>
                        <div className="relative">
                            <input name="location_text" value={formData.location_text} onChange={handleChange} className={`w-full h-12 pl-10 pr-4 rounded-lg border ${errors.location_text ? 'border-red-500' : 'border-[#dbdfe6] dark:border-slate-600'} bg-white dark:bg-[#101622] text-[#111318] dark:text-white placeholder:text-[#616f89] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm`} placeholder="İlçe, Mahalle" type="text" />
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#616f89] text-[20px]">location_on</span>
                        </div>
                        {errors.location_text && <p className="text-red-500 text-xs">{errors.location_text}</p>}
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-[#111318] dark:text-gray-200">Oda Sayısı</label>
                        <div className="relative">
                            <select name="room_count" value={formData.room_count} onChange={handleChange} className={`w-full h-12 px-4 rounded-lg border ${errors.room_count ? 'border-red-500' : 'border-[#dbdfe6] dark:border-slate-600'} bg-white dark:bg-[#101622] text-[#111318] dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none transition-all text-sm cursor-pointer`}>
                                <option disabled value="">Seçiniz</option>
                                {roomCountOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#616f89] pointer-events-none">expand_more</span>
                        </div>
                        {errors.room_count && <p className="text-red-500 text-xs">{errors.room_count}</p>}
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-[#111318] dark:text-gray-200">Brüt / Net m²</label>
                        <input name="area_sqm" value={formData.area_sqm} onChange={handleChange} className={`w-full h-12 px-4 rounded-lg border ${errors.area_sqm ? 'border-red-500' : 'border-[#dbdfe6] dark:border-slate-600'} bg-white dark:bg-[#101622] text-[#111318] dark:text-white placeholder:text-[#616f89] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm`} placeholder="Örn: 120 / 100" type="text" />
                        {errors.area_sqm && <p className="text-red-500 text-xs">{errors.area_sqm}</p>}
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-[#111318] dark:text-gray-200">Bina Yaşı</label>
                        <div className="relative">
                            <select name="building_age" value={formData.building_age} onChange={handleChange} className="w-full h-12 px-4 rounded-lg border border-[#dbdfe6] dark:border-slate-600 bg-white dark:bg-[#101622] text-[#111318] dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none transition-all text-sm cursor-pointer">
                                <option disabled value="">Seçiniz</option>
                                {buildingAgeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#616f89] pointer-events-none">expand_more</span>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-[#111318] dark:text-gray-200">Kat Bilgisi</label>
                        <div className="relative">
                            <select name="floor_info" value={formData.floor_info} onChange={handleChange} className="w-full h-12 px-4 rounded-lg border border-[#dbdfe6] dark:border-slate-600 bg-white dark:bg-[#101622] text-[#111318] dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none transition-all text-sm cursor-pointer">
                                <option disabled value="">Seçiniz</option>
                                {floorInfoOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#616f89] pointer-events-none">expand_more</span>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-[#111318] dark:text-gray-200">Isıtma</label>
                        <div className="relative">
                            <select name="heating_type" value={formData.heating_type} onChange={handleChange} className="w-full h-12 px-4 rounded-lg border border-[#dbdfe6] dark:border-slate-600 bg-white dark:bg-[#101622] text-[#111318] dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none transition-all text-sm cursor-pointer">
                                <option disabled value="">Seçiniz</option>
                                {heatingTypeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#616f89] pointer-events-none">expand_more</span>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-[#111318] dark:text-gray-200">Banyo Sayısı</label>
                        <div className="relative">
                            <select name="bathroom_count" value={formData.bathroom_count} onChange={handleChange} className="w-full h-12 px-4 rounded-lg border border-[#dbdfe6] dark:border-slate-600 bg-white dark:bg-[#101622] text-[#111318] dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none transition-all text-sm cursor-pointer">
                                <option disabled value="">Seçiniz</option>
                                {bathroomCountOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#616f89] pointer-events-none">expand_more</span>
                        </div>
                    </div>
                    <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 border border-[#dbdfe6] dark:border-slate-600 rounded-lg p-4 bg-slate-50 dark:bg-slate-800/50">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input name="has_balcony" checked={formData.has_balcony} onChange={handleChange} className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer" type="checkbox" />
                            <span className="text-sm font-medium text-[#111318] dark:text-gray-200 group-hover:text-primary transition-colors">Balkon</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input name="is_credit_eligible" checked={formData.is_credit_eligible} onChange={handleChange} className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary cursor-pointer" type="checkbox" />
                            <span className="text-sm font-medium text-[#111318] dark:text-gray-200 group-hover:text-primary transition-colors">Krediye Uygun</span>
                        </label>
                    </div>
                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-[#111318] dark:text-gray-200">Danışman</label>
                        <div className="relative">
                            <select name="agent_id" value={formData.agent_id} onChange={handleChange} className="w-full h-12 px-4 rounded-lg border border-[#dbdfe6] dark:border-slate-600 bg-white dark:bg-[#101622] text-[#111318] dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none transition-all text-sm cursor-pointer">
                                <option disabled value="">Danışman Seçin</option>
                                <option value="1">Ahmet Yılmaz</option>
                                <option value="2">Ayşe Demir</option>
                                <option value="3">Mehmet Öz</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#616f89] pointer-events-none">expand_more</span>
                        </div>
                    </div>

                    {/* Image Upload Section */}
                    <div className="col-span-1 md:col-span-2 space-y-3">
                        <label className="block text-sm font-medium text-[#111318] dark:text-gray-200">
                            Görseller <span className="text-[#616f89] font-normal">(Maksimum 10 adet)</span>
                        </label>
                        
                        {/* Drop Zone */}
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                                isDragging
                                    ? 'border-primary bg-primary/10'
                                    : 'border-[#dbdfe6] dark:border-slate-600 hover:border-primary hover:bg-primary/5'
                            } ${selectedImages.length >= MAX_IMAGES ? 'opacity-50 pointer-events-none' : ''}`}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileInputChange}
                                className="hidden"
                                disabled={selectedImages.length >= MAX_IMAGES}
                            />
                            <div className="flex flex-col items-center gap-2">
                                <span className="material-symbols-outlined text-4xl text-primary">cloud_upload</span>
                                <p className="text-sm font-medium text-[#111318] dark:text-gray-200">
                                    {selectedImages.length >= MAX_IMAGES
                                        ? 'Maksimum görsel sayısına ulaşıldı'
                                        : 'Görselleri sürükleyip bırakın veya tıklayın'}
                                </p>
                                <p className="text-xs text-[#616f89]">
                                    PNG, JPG, WEBP (Maks. 10 görsel)
                                </p>
                            </div>
                        </div>

                        {/* Image Previews */}
                        {selectedImages.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                {selectedImages.map((image, index) => (
                                    <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600">
                                        <img
                                            src={image.previewUrl}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        {index === 0 && (
                                            <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-0.5 rounded font-medium">
                                                Kapak
                                            </span>
                                        )}
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeImage(index);
                                            }}
                                            className="absolute top-2 right-2 size-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <span className="material-symbols-outlined text-sm">close</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        <p className="text-xs text-[#616f89]">
                            {selectedImages.length} / {MAX_IMAGES} görsel seçildi
                            {selectedImages.length > 0 && ' • İlk görsel kapak fotoğrafı olarak kullanılacak'}
                        </p>
                    </div>

                    <div className="col-span-1 md:col-span-2 space-y-1">
                        <label className="block text-sm font-medium text-[#111318] dark:text-gray-200">Açıklama</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} className="w-full min-h-[140px] p-4 rounded-lg border border-[#dbdfe6] dark:border-slate-600 bg-white dark:bg-[#101622] text-[#111318] dark:text-white placeholder:text-[#616f89] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm resize-y" placeholder="İlan hakkında detaylı açıklama yazınız..."></textarea>
                    </div>
                    <div className="col-span-1 md:col-span-2 border-t border-slate-100 dark:border-slate-700 my-2"></div>
                    <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row justify-end gap-3">
                        {uploadProgress && (
                            <div className="flex items-center gap-2 text-sm text-primary font-medium">
                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {uploadProgress}
                            </div>
                        )}
                        <button disabled={loading} className="flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg shadow-primary/30 w-full md:w-auto disabled:bg-primary/50 disabled:cursor-not-allowed" type="submit">
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Yayınlanıyor...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined">publish</span>
                                    <span>İlanı Yayınla</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
