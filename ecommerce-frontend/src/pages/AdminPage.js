import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, removeProduct } from '../store/productSlice';
import { IMAGE_BASE_PATH } from '../config';

const AdminPage = () => {
    const dispatch = useDispatch();
    const { products, isLoading } = useSelector((state) => state.products);
    const { user } = useSelector((state) => state.auth);

    React.useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleDelete = async (id) => {
        if (window.confirm('Bu UrUnU silmek istediGinizden emin misiniz?')) {
            await dispatch(removeProduct(id));
        }
    };

    // Admin deGilse eriSimi engelle
    if (!user || user.role !== 'Admin') {
        return (
            <div className="container my-5">
                <div className="alert alert-danger">
                    Bu sayfaya eriSim yetkiniz bulunmuyor.
                </div>
            </div>
        );
    }

    return (
        <div className="container my-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>UrUn YOnetimi</h2>
                <Link to="/admin/products/new" className="btn btn-success">
                    Yeni UrUn Ekle
                </Link>
            </div>

            {isLoading ? (
                <div className="text-center my-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">YUkleniyor...</span>
                    </div>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Resim</th>
                                <th>UrUn Adi</th>
                                <th>Fiyat</th>
                                <th>Stok</th>
                                <th>ISlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>
                                        <img
                                            src={`${IMAGE_BASE_PATH}${product.imageUrl}`}
                                            alt={product.name}
                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://via.placeholder.com/50';
                                            }}
                                        />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.price.toFixed(2)} TL</td>
                                    <td>{product.stockQuantity}</td>
                                    <td>
                                        <Link
                                            to={`/admin/products/edit/${product.id}`}
                                            className="btn btn-sm btn-warning me-2"
                                        >
                                            DUzenle
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="btn btn-sm btn-danger"
                                        >
                                            Sil
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminPage;