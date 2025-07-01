import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100">
                <img
                    src={`https://localhost:5001${product.imageUrl}`}
                    className="card-img-top"
                    alt={product.name}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/300x200?text=UrUn+Resmi';
                    }}
                />
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">
                        {product.description?.length > 100
                            ? `${product.description.substring(0, 100)}...`
                            : product.description}
                    </p>
                    <p className="card-text text-primary fw-bold">{product.price.toFixed(2)} TL</p>
                    <Link to={`/products/${product.id}`} className="btn btn-primary">
                        Detaylari GOr
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;