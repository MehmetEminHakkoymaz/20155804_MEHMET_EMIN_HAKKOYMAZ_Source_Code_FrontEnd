import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, fetchProductById, editProduct } from '../../store/productSlice';

const ProductForm = () => {
    const { id } = useParams();
    const isEditMode = Boolean(id);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { selectedProduct, isLoading, error } = useSelector((state) => state.products);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        categoryId: '',
        imageUrl: '',
        stockQuantity: ''
    });

    useEffect(() => {
        if (isEditMode) {
            dispatch(fetchProductById(id));
        }
    }, [dispatch, id, isEditMode]);

    useEffect(() => {
        if (isEditMode && selectedProduct) {
            setFormData({
                name: selectedProduct.name,
                description: selectedProduct.description,
                price: selectedProduct.price,
                categoryId: selectedProduct.categoryId,
                imageUrl: selectedProduct.imageUrl,
                stockQuantity: selectedProduct.stockQuantity
            });
        }
    }, [selectedProduct, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form verilerini doğru formata dönüştür
        const productData = {
            ...formData,
            price: parseFloat(formData.price),
            categoryId: parseInt(formData.categoryId),
            stockQuantity: parseInt(formData.stockQuantity)
        };

        try {
            if (isEditMode) {
                await dispatch(editProduct({ id, product: productData })).unwrap();
                console.log("Ürün başarıyla güncellendi");
                navigate('/admin'); // Admin sayfasına yönlendir
            } else {
                await dispatch(createProduct(productData)).unwrap();
                navigate('/products');
            }
        } catch (err) {
            console.error("İşlem hatası:", err);
            // Error is handled by the reducer
        }
    };

    if (isEditMode && isLoading) {
        return (
            <div className="text-center my-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">YUkleniyor...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container my-4">
            <h2>{isEditMode ? 'UrUn DUzenle' : 'Yeni UrUn Ekle'}</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">UrUn Adi</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Aciklama</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="3"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Fiyat</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="categoryId" className="form-label">Kategori ID</label>
                    <input
                        type="number"
                        className="form-control"
                        id="categoryId"
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        min="1"
                        max="10"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label">Resim URL</label>
                    <input
                        type="text"
                        className="form-control"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="/images/ornek.jpg"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="stockQuantity" className="form-label">Stok Miktari</label>
                    <input
                        type="number"
                        className="form-control"
                        id="stockQuantity"
                        name="stockQuantity"
                        value={formData.stockQuantity}
                        onChange={handleChange}
                        min="0"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    {isLoading ? 'Kaydediliyor...' : (isEditMode ? 'GUncelle' : 'OluStur')}
                </button>

                <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => navigate(-1)}
                >
                    Iptal
                </button>
            </form>
        </div>
    );
};

export default ProductForm;