// src/config.js
// API ve uygulama yapilandirmasi

// API temel URL'si 
// Not: HTTP ve HTTPS'i doğru portla eşleştirin
export const API_URL = 'https://localhost:5001/api';

// Tam URL kullanmak isterseniz (proxy kullanmiyorsaniz):
// export const API_URL = 'http://localhost:5000/api';

// Uygulama adi ve telif hakki bilgileri
export const APP_NAME = 'E-Ticaret API Demo';
export const COPYRIGHT = `© ${new Date().getFullYear()} E-Ticaret API Demo`;

// Sayfalama ayarlari
export const PAGE_SIZE = 10;

// DiGer sabitler
export const DEFAULT_CURRENCY = 'TL';
export const IMAGE_BASE_PATH = 'https://localhost:5001';

// Kategori isimleri (API'den alinamadiGi durumlar icin)
export const CATEGORY_NAMES = {
    1: 'Elektronik',
    2: 'Bilgisayar',
    3: 'Telefon',
    4: 'Oyun Konsollari',
    5: 'Ev Aletleri',
    6: 'UlaSim',
    7: 'Kamera',
    8: 'Spor',
    9: 'Moda',
    10: 'Kitap'
};