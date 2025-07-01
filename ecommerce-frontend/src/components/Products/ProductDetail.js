import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductById, removeProduct } from '../../store/productSlice';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { selectedProduct, isLoading, error } = useSelector((state) => state.products);
    const { user } = useSelector((state) => state.auth);

    const isAdmin = user && user.role === 'Admin';

    useEffect(() => {
        dispatch(fetchProductById(id));
    }, [dispatch, id]);

    const handleEdit = () => {
        navigate(`/admin/products/edit/${id}`);
    };

    const handleDelete = async () => {
        if (window.confirm('Bu UrUnU silmek istediGinizden emin misiniz?')) {
            try {
                await dispatch(removeProduct(id)).unwrap();
                navigate('/products');
            } catch (err) {
                // Error is handled by the reducer
            }
        }
    };

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
                <div className="spinner-grow text-primary" role="status">
                    <span className="visually-hidden">Yukleniyor...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container my-5">
                <div className="alert alert-danger shadow-sm border-0" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                </div>
            </div>
        );
    }

    if (!selectedProduct) {
        return (
            <div className="container my-5 text-center">
                <div className="alert alert-warning shadow-sm border-0" role="alert">
                    <i className="bi bi-search me-2"></i>
                    Urun bulunamadi!
                </div>
                <button
                    className="btn btn-outline-primary mt-3"
                    onClick={() => navigate('/products')}>
                    Urunlere Don
                </button>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/" className="text-decoration-none">Ana Sayfa</a></li>
                    <li className="breadcrumb-item"><a href="/products" className="text-decoration-none">Urunler</a></li>
                    <li className="breadcrumb-item active">{selectedProduct.name}</li>
                </ol>
            </nav>

            <div className="card border-0 shadow-sm overflow-hidden">
                <div className="row g-0">
                    <div className="col-md-6">
                        <div className="product-image-container">
                            <img
                                src={`https://localhost:5001${selectedProduct.imageUrl}`}
                                className="img-fluid rounded-start product-image"
                                alt={selectedProduct.name}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/600x400?text=Urun+Resmi';
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card-body p-4">
                            <h2 className="card-title mb-2">{selectedProduct.name}</h2>
                            <div className="badge bg-secondary mb-3">Kategori: {selectedProduct.categoryId}</div>
                            <h3 className="text-primary mb-3">{selectedProduct.price.toFixed(2)} TL</h3>
                            <div className="card-text mb-4 product-description">
                                {selectedProduct.description}
                            </div>

                            <div className="card bg-light p-3 mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <strong>Stok Durumu:</strong>
                                    {selectedProduct.stockQuantity > 0 ? (
                                        <span className="badge bg-success">{selectedProduct.stockQuantity} adet</span>
                                    ) : (
                                        <span className="badge bg-danger">Stokta yok</span>
                                    )}
                                </div>
                            </div>

                            <div className="d-flex flex-wrap gap-2">
                                {selectedProduct.stockQuantity > 0 && (
                                    <button className="btn btn-success btn-lg">
                                        <i className="bi bi-cart-plus me-2"></i>Sepete Ekle
                                    </button>
                                )}

                                {isAdmin && (
                                    <>
                                        <button
                                            className="btn btn-warning"
                                            onClick={handleEdit}
                                        >
                                            <i className="bi bi-pencil me-2"></i>Duzenle
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={handleDelete}
                                        >
                                            <i className="bi bi-trash me-2"></i>Sil
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS stilleri */}
            <style jsx>{`
                .product-image-container {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    background-color: #f8f9fa;
                }
                .product-image {
                    max-height: 500px;
                    object-fit: contain;
                    padding: 20px;
                }
                .product-description {
                    font-size: 1.1rem;
                    line-height: 1.6;
                }
            `}</style>
        </div>
    );
};

export default ProductDetail;