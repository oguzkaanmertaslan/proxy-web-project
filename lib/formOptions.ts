/**
 * Form seçenekleri için merkezi yapı
 * Tüm dropdown seçenekleri buradan yönetilir
 */

export interface FormOption {
  value: string;
  label: string;
}

// Oda Sayısı seçenekleri
export const roomCountOptions: FormOption[] = [
  { value: '1+0', label: '1+0 (Stüdyo)' },
  { value: '1+1', label: '1+1' },
  { value: '2+0', label: '2+0' },
  { value: '2+1', label: '2+1' },
  { value: '3+1', label: '3+1' },
  { value: '3+2', label: '3+2' },
  { value: '4+1', label: '4+1' },
  { value: '4+2', label: '4+2' },
  { value: '5+1', label: '5+1' },
  { value: '5+2', label: '5+2' },
  { value: '6+1', label: '6+1' },
  { value: '6+2', label: '6+2' },
  { value: '7+', label: '7 ve üzeri' },
];

// Bina Yaşı seçenekleri
export const buildingAgeOptions: FormOption[] = [
  { value: '0', label: 'Sıfır Bina' },
  { value: '1', label: '1 Yaşında' },
  { value: '2', label: '2 Yaşında' },
  { value: '3', label: '3 Yaşında' },
  { value: '4', label: '4 Yaşında' },
  { value: '5', label: '5-10 Yaş Arası' },
  { value: '10', label: '11-15 Yaş Arası' },
  { value: '15', label: '16-20 Yaş Arası' },
  { value: '20', label: '21-25 Yaş Arası' },
  { value: '25', label: '26-30 Yaş Arası' },
  { value: '30', label: '31 ve Üzeri' },
];

// Kat Bilgisi seçenekleri
export const floorInfoOptions: FormOption[] = [
  { value: 'Bodrum Kat', label: 'Bodrum Kat' },
  { value: 'Zemin Kat', label: 'Zemin Kat' },
  { value: 'Bahçe Katı', label: 'Bahçe Katı' },
  { value: 'Giriş Kat', label: 'Giriş Kat' },
  { value: 'Yüksek Giriş', label: 'Yüksek Giriş' },
  { value: '1. Kat', label: '1. Kat' },
  { value: '2. Kat', label: '2. Kat' },
  { value: '3. Kat', label: '3. Kat' },
  { value: '4. Kat', label: '4. Kat' },
  { value: '5. Kat', label: '5. Kat' },
  { value: '6. Kat', label: '6. Kat' },
  { value: '7. Kat', label: '7. Kat' },
  { value: '8. Kat', label: '8. Kat' },
  { value: '9. Kat', label: '9. Kat' },
  { value: '10. Kat', label: '10. Kat' },
  { value: '11-15 Kat', label: '11-15 Kat Arası' },
  { value: '16-20 Kat', label: '16-20 Kat Arası' },
  { value: '21+ Kat', label: '21 ve Üzeri Kat' },
  { value: 'Çatı Katı', label: 'Çatı Katı' },
  { value: 'Dubleks', label: 'Dubleks' },
  { value: 'Tripleks', label: 'Tripleks' },
];

// Isıtma Tipi seçenekleri
export const heatingTypeOptions: FormOption[] = [
  { value: 'Doğalgaz (Kombi)', label: 'Doğalgaz (Kombi)' },
  { value: 'Doğalgaz (Kat Kalörifer)', label: 'Doğalgaz (Kat Kalörifer)' },
  { value: 'Merkezi Sistem', label: 'Merkezi Sistem' },
  { value: 'Merkezi (Pay Ölçer)', label: 'Merkezi (Pay Ölçer)' },
  { value: 'Yerden Isıtma', label: 'Yerden Isıtma' },
  { value: 'Soba', label: 'Soba' },
  { value: 'Klima', label: 'Klima' },
  { value: 'Güneş Enerjisi', label: 'Güneş Enerjisi' },
  { value: 'Jeotermal', label: 'Jeotermal' },
  { value: 'Isı Pompası', label: 'Isı Pompası' },
  { value: 'Elektrikli Radyatör', label: 'Elektrikli Radyatör' },
  { value: 'VRF', label: 'VRF' },
  { value: 'Fancoil', label: 'Fancoil' },
  { value: 'Yok', label: 'Yok' },
];

// Banyo Sayısı seçenekleri
export const bathroomCountOptions: FormOption[] = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6+', label: '6 ve üzeri' },
];

// İlan Durumu seçenekleri
export const listingStatusOptions: FormOption[] = [
  { value: 'Satılık', label: 'Satılık' },
  { value: 'Kiralık', label: 'Kiralık' },
  { value: 'Devren', label: 'Devren' },
];
