import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';

// Image preview type
interface ImagePreview {
    file: File;
    previewUrl: string;
}

export default function AdminNewProjectPage() {
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
        location_text: '',
        starting_price: '',
        delivery_date: '',
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
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
        if (!formData.title) newErrors.title = 'Proje adı zorunludur.';
        if (!formData.location_text) newErrors.location_text = 'Konum bilgisi zorunludur.';
        if (!formData.starting_price || parseFloat(formData.starting_price) <= 0) newErrors.starting_price = 'Geçerli bir başlangıç fiyatı giriniz.';
        if (!formData.delivery_date) newErrors.delivery_date = 'Teslim tarihi zorunludur.';
        return newErrors;
    };

    // Upload images to Cloudflare R2 via API route
    const uploadImages = async (projectId: number): Promise<string[]> => {
        const uploadedUrls: string[] = [];
        
        for (let i = 0; i < selectedImages.length; i++) {
            const image = selectedImages[i];
            setUploadProgress(`Görsel yükleniyor: ${i + 1}/${selectedImages.length}`);
            
            const formDataUpload = new FormData();
            formDataUpload.append('file', image.file);
            
            const response = await fetch('/api/upload-project-image', {
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
            // Step 1: Insert into 'projects' table
            setUploadProgress('Proje kaydediliyor...');
            
            const projectData = {
                title: formData.title,
                location_text: formData.location_text,
                starting_price: parseFloat(formData.starting_price),
                delivery_date: formData.delivery_date,
                description: formData.description,
                currency: 'TRY',
            };

            const { data: insertedProject, error: projectError } = await supabase
                .from('projects')
                .insert(projectData)
                .select()
                .single();

            if (projectError) throw projectError;
            
            // Step 2: Upload images to Storage and save to project_images
            if (selectedImages.length > 0 && insertedProject) {
                const imageUrls = await uploadImages(insertedProject.id);
                
                setUploadProgress('Görseller veritabanına kaydediliyor...');
                
                // Insert all images to project_images table
                const imageRecords = imageUrls.map((url, index) => ({
                    project_id: insertedProject.id,
                    image_url: url,
                    is_primary: index === 0 // First image is primary
                }));
                
                const { error: imageError } = await supabase
                    .from('project_images')
                    .insert(imageRecords);
                
                if (imageError) {
                    console.error('Image DB insert failed:', imageError);
                    throw new Error('Görseller veritabanına eklenemedi: ' + imageError.message);
                }
            }

            // Clean up preview URLs
            selectedImages.forEach(img => URL.revokeObjectURL(img.previewUrl));

            setFormMessage({ type: 'success', text: 'Proje başarıyla kaydedildi!' });
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
        <AdminLayout activePath="/admin/projeler">
            <div className="flex flex-wrap items-center gap-2 text-sm mb-8">
                <Link className="text-[#616f89] hover:text-primary transition-colors font-medium" href="/">Ana Sayfa</Link>
                <span className="text-[#616f89] material-symbols-outlined text-sm">chevron_right</span>
                <Link className="text-[#616f89] hover:text-primary transition-colors font-medium" href="/projeler">Projeler</Link>
                <span className="text-[#616f89] material-symbols-outlined text-sm">chevron_right</span>
                <span className="text-primary font-medium bg-primary/10 px-2 py-0.5 rounded text-xs">Yeni Proje Ekle</span>
            </div>
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-[#111318] dark:text-white text-3xl font-bold tracking-tight">Yeni Proje Ekle</h1>
                <p className="text-[#616f89] dark:text-gray-400 text-base">Yeni bir inşaat projesi oluşturmak ve portföye eklemek için aşağıdaki formu eksiksiz doldurun.</p>
            </div>
            <form onSubmit={handleSubmit} noValidate>
            <div className="bg-white dark:bg-[#1e2736] rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden max-w-5xl">
                <div className="p-8">
                    <div className="flex flex-col gap-8">
                        {formMessage.text && (
                             <div className={`p-4 rounded-lg border ${formMessage.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'} flex items-center gap-3 text-sm font-medium`}>
                                 <span className="material-symbols-outlined">{formMessage.type === 'success' ? 'check_circle' : 'error'}</span>
                                 <span>{formMessage.text}</span>
                             </div>
                        )}
                        <div>
                            <h3 className="text-[#111318] dark:text-white text-lg font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">feed</span>
                                Temel Bilgiler
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <label className="flex flex-col gap-1">
                                    <span className="text-[#111318] dark:text-gray-200 text-sm font-medium">Proje Adı</span>
                                    <input name="title" value={formData.title} onChange={handleChange} className={`w-full h-12 px-4 rounded-lg border ${errors.title ? 'border-red-500' : 'border-[#dbdfe6] dark:border-slate-600'} bg-white dark:bg-[#101622] text-[#111318] dark:text-white placeholder:text-[#616f89]/80 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all`} placeholder="Örn: Mavi Vadi Konutları" type="text" />
                                    {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
                                </label>
                                <label className="flex flex-col gap-1">
                                    <span className="text-[#111318] dark:text-gray-200 text-sm font-medium">Konum</span>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#616f89]" style={{ fontSize: '20px' }}>location_on</span>
                                        <input name="location_text" value={formData.location_text} onChange={handleChange} className={`w-full h-12 pl-11 pr-4 rounded-lg border ${errors.location_text ? 'border-red-500' : 'border-[#dbdfe6] dark:border-slate-600'} bg-white dark:bg-[#101622] text-[#111318] dark:text-white placeholder:text-[#616f89]/80 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all`} placeholder="Örn: İstanbul, Kadıköy" type="text" />
                                    </div>
                                    {errors.location_text && <p className="text-red-500 text-xs">{errors.location_text}</p>}
                                </label>
                            </div>
                        </div>
                        <hr className="border-slate-100 dark:border-slate-700" />
                        <div>
                            <h3 className="text-[#111318] dark:text-white text-lg font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">analytics</span>
                                Detaylar &amp; Fiyatlandırma
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <label className="flex flex-col gap-1">
                                    <span className="text-[#111318] dark:text-gray-200 text-sm font-medium">Başlangıç Fiyatı (TL)</span>
                                    <div className="relative">
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#616f89] font-medium">₺</span>
                                        <input name="starting_price" value={formData.starting_price} onChange={handleChange} className={`w-full h-12 px-4 rounded-lg border ${errors.starting_price ? 'border-red-500' : 'border-[#dbdfe6] dark:border-slate-600'} bg-white dark:bg-[#101622] text-[#111318] dark:text-white placeholder:text-[#616f89]/80 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all`} placeholder="0.00" type="number" />
                                    </div>
                                    {errors.starting_price && <p className="text-red-500 text-xs">{errors.starting_price}</p>}
                                </label>
                                <label className="flex flex-col gap-1">
                                    <span className="text-[#111318] dark:text-gray-200 text-sm font-medium">Teslim Tarihi</span>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#616f89]" style={{ fontSize: '20px' }}>calendar_today</span>
                                        <input name="delivery_date" value={formData.delivery_date} onChange={handleChange} className={`w-full h-12 pl-11 pr-4 rounded-lg border ${errors.delivery_date ? 'border-red-500' : 'border-[#dbdfe6] dark:border-slate-600'} bg-white dark:bg-[#101622] text-[#111318] dark:text-white placeholder:text-[#616f89]/80 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all`} type="date" />
                                    </div>
                                    {errors.delivery_date && <p className="text-red-500 text-xs">{errors.delivery_date}</p>}
                                </label>
                            </div>
                        </div>
                        <hr className="border-slate-100 dark:border-slate-700" />
                        
                        {/* Image Upload Section */}
                        <div>
                            <h3 className="text-[#111318] dark:text-white text-lg font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">image</span>
                                Proje Görselleri <span className="text-[#616f89] font-normal text-sm">(Maksimum 10 adet)</span>
                            </h3>
                            
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
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-4">
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
                            
                            <p className="text-xs text-[#616f89] mt-2">
                                {selectedImages.length} / {MAX_IMAGES} görsel seçildi
                                {selectedImages.length > 0 && ' • İlk görsel kapak fotoğrafı olarak kullanılacak'}
                            </p>
                        </div>

                        <hr className="border-slate-100 dark:border-slate-700" />
                        <div>
                            <h3 className="text-[#111318] dark:text-white text-lg font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">description</span>
                                Açıklama ve Özellikler
                            </h3>
                            <div className="flex flex-col gap-6">
                                <label className="flex flex-col gap-1">
                                    <span className="text-[#111318] dark:text-gray-200 text-sm font-medium">Proje Açıklaması</span>
                                    <textarea name="description" value={formData.description} onChange={handleChange} className="w-full min-h-[160px] p-4 rounded-lg border border-[#dbdfe6] dark:border-slate-600 bg-white dark:bg-[#101622] text-[#111318] dark:text-white placeholder:text-[#616f89]/80 focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-y transition-all text-base leading-relaxed" placeholder="Proje hakkında detaylı bilgi giriniz..."></textarea>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/40 px-8 py-6 border-t border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button type="button" className="text-slate-500 dark:text-slate-400 font-medium hover:text-[#111318] dark:hover:text-white px-4 py-2 rounded-lg transition-colors">İptal Et</button>
                    <div className="flex items-center gap-4">
                        {uploadProgress && (
                            <div className="flex items-center gap-2 text-sm text-primary font-medium">
                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {uploadProgress}
                            </div>
                        )}
                        <button disabled={loading} type="submit" className="bg-primary hover:bg-blue-700 text-white text-base font-semibold px-8 py-3 rounded-lg shadow-lg shadow-primary/30 transition-all transform active:scale-95 flex items-center gap-2 disabled:bg-primary/50 disabled:cursor-not-allowed">
                           {loading ? (
                                <>
                                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                   </svg>
                                   Kaydediliyor...
                                </>
                           ) : (
                               <>
                                    <span className="material-symbols-outlined">save</span>
                                    Projeyi Kaydet
                               </>
                           )}
                        </button>
                    </div>
                </div>
            </div>
            </form>
        </AdminLayout>
    );
}
