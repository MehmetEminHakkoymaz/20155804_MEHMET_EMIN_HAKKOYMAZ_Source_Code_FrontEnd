// utils/auth.js
/**
 * Kimlik doGrulama iSlemleri icin yardimci fonksiyonlar
 */

// JWT tokenini localStorage'a kaydet
export const setToken = (token) => {
    localStorage.setItem('token', token);
};

// JWT tokenini localStorage'dan al
export const getToken = () => {
    return localStorage.getItem('token');
};

// JWT tokenini localStorage'dan kaldir
export const removeToken = () => {
    localStorage.removeItem('token');
};

// Kullanici bilgilerini localStorage'a kaydet
export const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

// Kullanici bilgilerini localStorage'dan al
export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

// Kullanici bilgilerini localStorage'dan kaldir
export const removeUser = () => {
    localStorage.removeItem('user');
};

// Kullanicinin Giris yapmiS olup olmadiGini kontrol et
export const isAuthenticated = () => {
    return getToken() !== null;
};

// Kullanicinin admin olup olmadiGini kontrol et
export const isAdmin = () => {
    const user = getUser();
    return user && user.role === 'Admin';
};

// Oturumu kapat
export const logout = () => {
    removeToken();
    removeUser();
};