import axiosInstance from './axios';

export const getAllProducts = async () => {
    try {
        const response = await axiosInstance.get('/products');
        console.log('API Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Products API Error:', error.response || error);
        throw error;
    }
};

export const getProductById = async (id) => {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
};

export const addProduct = async (product) => {
    const response = await axiosInstance.post('/products', product);
    return response.data;
};

export const updateProduct = async (id, product) => {
    const response = await axiosInstance.put(`/products/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
};