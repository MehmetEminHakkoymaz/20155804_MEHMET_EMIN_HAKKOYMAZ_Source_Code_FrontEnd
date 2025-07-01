import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } from '../api/products';

// BaSlangic durumu
const initialState = {
    products: [],
    selectedProduct: null,
    isLoading: false,
    error: null,
};

// Async thunks
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            return await getAllProducts();
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Urunler yUklenemedi');
        }
    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id, { rejectWithValue }) => {
        try {
            return await getProductById(id);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'UrUn yUklenemedi');
        }
    }
);

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (product, { rejectWithValue }) => {
        try {
            return await addProduct(product);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'UrUn eklenemedi');
        }
    }
);

export const editProduct = createAsyncThunk(
    'products/editProduct',
    async ({ id, product }, { rejectWithValue, getState }) => {
        try {
            const response = await updateProduct(id, product);
            
            // API'den dönen yanıtı kullan veya mevcut product verisi ile birleştir
            return { id, ...product, ...response };
        } catch (error) {
            console.error('Ürün güncelleme hatası:', error);
            return rejectWithValue(error.response?.data?.message || 'Ürün güncellenemedi');
        }
    }
);

export const removeProduct = createAsyncThunk(
    'products/removeProduct',
    async (id, { rejectWithValue }) => {
        try {
            await deleteProduct(id);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'UrUn silinemedi');
        }
    }
);

// Product slice
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all products
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Fetch product by ID
            .addCase(fetchProductById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Create product
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products.push(action.payload);
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Edit product
            .addCase(editProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.products.findIndex((p) => p.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Delete product
            .addCase(removeProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(removeProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = state.products.filter((p) => p.id !== action.payload);
            })
            .addCase(removeProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default productSlice.reducer;