import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="container text-center my-5">
            <h1>404</h1>
            <h2>Sayfa Bulunamadi</h2>
            <p>AradiGiniz sayfa mevcut deGil veya taSinmiS olabilir.</p>
            <Link to="/" className="btn btn-primary">
                Ana Sayfaya DOn
            </Link>
        </div>
    );
};

export default NotFoundPage;