
import { supabase } from './supabaseClient';
import { Property, PortfolioProperty, ListingDetail, Project, ProjectDetail, ListingSpec } from '@/types';
import { formatPrice } from '@/utils/formatters';
import { Square, BedDouble, Home, Layers, Thermometer, Bath, Building, CheckCircle, Calendar, Wallet, Percent, Star, Building2, BadgeCheck, TrendingUp, KeyRound } from 'lucide-react';

// --- Icon Maps ---
const listingIconMap = { Square, BedDouble, Home, Layers, Thermometer, Bath, Building, CheckCircle };
const projectIconMap = { Calendar, Wallet, CheckCircle, Percent, Star, Building, Building2, BadgeCheck, TrendingUp, KeyRound };

// --- Helper Functions ---

/**
 * DEFANSİF PROGRAMLAMA: Gelen her türlü değeri güvenli bir string'e dönüştürür.
 * Bu fonksiyon, "React error #31" hatasının ana çözümüdür.
 * null, undefined ve nesne türlerini ele alarak render edilmesini güvenli hale getirir.
 */
const safeString = (value: any, fallback: string = '-'): string => {
    if (value === null || value === undefined) return fallback;
    if (typeof value === 'object') {
        // Nesne içinde anlamlı bir metin bulmaya çalışır.
        return String(value.label || value.name || value.text || fallback);
    }
    return String(value);
};

// --- Data Mappers ---

/**
 * Ham Supabase listeleme verisini, tüm alanları güvenli hale getirilmiş,
 * temiz `Property` veya `PortfolioProperty` formatına dönüştürür.
 */
const mapListingData = (item: any): Property & PortfolioProperty => {
    const primaryImage = item.listing_images?.find((img: any) => img.is_primary) || item.listing_images?.[0];
    const bathroomText = safeString(item.bathroom_count);
    const areaText = safeString(item.area_sqm);

    return {
        id: item.id,
        status: safeString(item.status, 'Satılık'),
        image: safeString(primaryImage?.image_url, 'https://via.placeholder.com/400x300'),
        title: safeString(item.title, 'Başlıksız İlan'),
        price: formatPrice(item.price, item.currency),
        location: safeString(item.location_text, 'Konum Belirtilmemiş'),
        features: [
            { icon: BedDouble, label: safeString(item.room_count) },
            { icon: Bath, label: `${bathroomText} Banyo` },
            { icon: Square, label: `${areaText} m²` },
        ],
        // PortfolioProperty için özel alanlar
        rooms: safeString(item.room_count),
        baths: `${bathroomText} Banyo`,
        area: `${areaText} m²`,
        listingId: safeString(item.listing_uid, 'N/A'),
    };
};

/**
 * Ham Supabase proje verisini, tüm alanları güvenli hale getirilmiş,
 * temiz `Project` formatına dönüştürür.
 */
const mapProjectData = (project: any): Project => {
    const primaryImage = project.project_images?.find((img: any) => img.is_primary) || project.project_images?.[0];
    return {
        id: project.id,
        image: safeString(primaryImage?.image_url, 'https://via.placeholder.com/400x300'),
        tags: (project.project_tag_relations || []).map((rel: any) => ({
            text: safeString(rel.tags?.tag_text, 'Etiket'),
            style: safeString(rel.tags?.style_class, 'primary'),
        })),
        location: safeString(project.location_text, 'Konum Belirtilmemiş'),
        title: safeString(project.title, 'Başlıksız Proje'),
        price: formatPrice(project.starting_price, project.currency),
        details: (project.project_summary_items || []).slice(0, 2).map((item: any) => ({
            label: safeString(item.item_label, 'Detay'),
            value: safeString(item.item_value),
            icon: projectIconMap[item.icon_name as keyof typeof projectIconMap] || Calendar,
        })),
    };
};


// --- Public API Functions ---

export const fetchFeaturedListings = async (): Promise<Property[]> => {
    const { data, error } = await supabase
        .from('listings')
        .select('*, listing_images(image_url, is_primary)')
        .limit(3);

    if (error) {
        console.error('API Hatası: fetchFeaturedListings', error);
        return [];
    }
    return data.map(mapListingData);
};

export const fetchAllListings = async (): Promise<PortfolioProperty[]> => {
     const { data, error } = await supabase
        .from('listings')
        .select('*, listing_images(image_url, is_primary)');

    if (error) {
        console.error('API Hatası: fetchAllListings', error);
        return [];
    }
    return data.map(mapListingData);
};

export const fetchListingByUid = async (listingUid: string): Promise<ListingDetail | null> => {
     const { data: listingData, error: listingError } = await supabase
        .from('listings')
        .select('*, listing_images(*), agents(*)')
        .eq('listing_uid', listingUid)
        .maybeSingle();
    
    if (listingError || !listingData) {
        console.error('API Hatası: fetchListingByUid', listingError);
        return null;
    }

    const primaryImage = listingData.listing_images?.find((img: any) => img.is_primary) || listingData.listing_images?.[0];
    const thumbnails = (listingData.listing_images || [])
        .filter((img: any) => !img.is_primary)
        .map((img: any) => safeString(img.image_url, 'https://via.placeholder.com/100x75'));
      
    // Listing tablosundaki alanlardan specs oluştur
    const finalSpecs: ListingSpec[] = [
        listingData.room_count && { label: 'Oda Sayısı', value: safeString(listingData.room_count), icon: BedDouble },
        listingData.bathroom_count && { label: 'Banyo Sayısı', value: safeString(listingData.bathroom_count), icon: Bath },
        listingData.area_sqm && { label: 'Brüt / Net m²', value: safeString(listingData.area_sqm), icon: Square },
        listingData.building_age !== null && listingData.building_age !== undefined && { label: 'Bina Yaşı', value: `${safeString(listingData.building_age)} Yıl`, icon: Building },
        listingData.floor_info && { label: 'Kat Bilgisi', value: safeString(listingData.floor_info), icon: Layers },
        listingData.heating_type && { label: 'Isıtma', value: safeString(listingData.heating_type), icon: Thermometer },
    ].filter(Boolean) as ListingSpec[];

    // Öne çıkan özellikler listesi
    const highlightedFeatures: string[] = [
        listingData.room_count && `Oda Sayısı: ${safeString(listingData.room_count)}`,
        listingData.bathroom_count && `Banyo Sayısı: ${safeString(listingData.bathroom_count)}`,
        listingData.area_sqm && `Alan: ${safeString(listingData.area_sqm)}`,
        listingData.floor_info && `Kat: ${safeString(listingData.floor_info)}`,
        listingData.heating_type && `Isıtma: ${safeString(listingData.heating_type)}`,
        listingData.has_balcony && 'Balkon Mevcut',
        listingData.is_credit_eligible && 'Krediye Uygun',
    ].filter(Boolean) as string[];
    
    const defaultAvatar = "https://storage.googleapis.com/aida-images/8e5a7d76-d188-4382-b169-2f5a6396f642.png";

    return {
        id: listingData.id,
        tags: [{ text: safeString(listingData.status, 'SATILIK').toUpperCase(), type: 'info' }],
        title: safeString(listingData.title, 'Başlıksız İlan'),
        location: safeString(listingData.location_text, 'Konum Belirtilmemiş'),
        listingId: safeString(listingData.listing_uid),
        lastUpdated: new Date(listingData.last_updated_at).toLocaleDateString('tr-TR'),
        gallery: { 
            main: safeString(primaryImage?.image_url, 'https://via.placeholder.com/800x600'), 
            thumbnails 
        },
        description: {
            paragraphs: safeString(listingData.description, '').split('\n').filter(p => p.trim()),
            features: highlightedFeatures,
        },
        price: formatPrice(listingData.price, listingData.currency),
        specs: finalSpecs,
        agent: listingData.agents ? {
            name: safeString(listingData.agents.name, 'Danışman'),
            title: safeString(listingData.agents.title, 'Proxy'),
            avatar: safeString(listingData.agents.avatar_url, defaultAvatar),
            rating: listingData.agents.rating || 5,
        } : {
            name: "Emlak Danışmanı", 
            title: "Proxy Gayrimenkul", 
            avatar: defaultAvatar, 
            rating: 5,
        },
        mapLocationImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgP65UB7cdC65G6-X2Wj-FEVlIuuEvnPndO3UEIOdyacqh6du_FQIzBEU_rvXVd01wMSEX9pT1_Le4sv39T0VMOcC6ysW3cEU2b8-m3ZMURjEF6pg_YgrNfg0VU6D978UW3vf9SZEE6aVrStg_VN_JPGXauOX8Ru2w3Rszyuvj7ahoXaqPLdXHooC_ulhnVl0JptttPTiKEYmnkm5WzvbYNXULPrBvQLLkXxK4mhPXOO4STDnBMRDGe9uTaseYUMbbXB8WlvsCxlnE",
    };
};

export const fetchAllProjects = async (): Promise<Project[]> => {
    const { data, error } = await supabase
        .from('projects')
        .select(`*, project_tag_relations(*, tags(*)), project_summary_items(*), project_images(*)`);

    if (error) {
        console.error('API Hatası: fetchAllProjects', error);
        return [];
    }
    return data.map(mapProjectData);
};

export const fetchProjectById = async (projectId: string): Promise<ProjectDetail | null> => {
     const { data, error } = await supabase
        .from('projects')
        .select(`*, project_images(*), project_tag_relations(*, tags(*)), project_summary_items(*), project_amenities(*)`)
        .eq('id', projectId)
        .maybeSingle();

    if (error || !data) {
        console.error('API Hatası: fetchProjectById', error);
        return null;
    }

    const primaryImage = data.project_images?.find((img: any) => img.is_primary) || data.project_images?.[0];
    const thumbnails = (data.project_images || [])
        .filter((img: any) => !img.is_primary)
        .map((img: any) => safeString(img.image_url, 'https://via.placeholder.com/100x75'));

    return {
        id: data.id,
        title: safeString(data.title, 'Başlıksız Proje'),
        location: safeString(data.location_text, 'Konum Belirtilmemiş'),
        tags: (data.project_tag_relations || []).map((rel: any) => ({ 
            text: safeString(rel.tags?.tag_text, 'Etiket'), 
            style: safeString(rel.tags?.style_class, 'primary') 
        })),
        gallery: { 
            main: safeString(primaryImage?.image_url, 'https://via.placeholder.com/800x600'), 
            thumbnails, 
            totalCount: data.project_images?.length || 0 
        },
        description: safeString(data.description, '').split('\n'),
        investmentHighlights: [], // Bu verinin veritabanında olması gerekir
        amenities: (data.project_amenities || []).map((a: any) => safeString(a.amenity_name)),
        summary: {
            price: formatPrice(data.starting_price, data.currency),
            items: (data.project_summary_items || []).map((item: any) => ({
                label: safeString(item.item_label, 'Detay'),
                value: safeString(item.item_value),
                icon: projectIconMap[item.icon_name as keyof typeof projectIconMap] || Square
            }))
        }
    };
};
