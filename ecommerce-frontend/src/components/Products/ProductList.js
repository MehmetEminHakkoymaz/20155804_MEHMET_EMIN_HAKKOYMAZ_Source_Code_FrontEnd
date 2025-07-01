import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/productSlice';
import ProductCard from './ProductCard';

const ProductList = () => {
    const dispatch = useDispatch();
    const { products, isLoading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="text-center my-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">YUkleniyor...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                {error}
            </div>
        );
    }

    return (
        <div className="container my-4">
            <h2 className="mb-4">Urunler</h2>
            <div className="row">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div className="col-12">
                        <p className="text-center">UrUn bulunamadi.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;