import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="container my-5">
            {/* Hero Section - Geliştirilmiş başlık alanı */}
            <div className="bg-light rounded-3 p-5 mb-5 shadow-sm">
                <div className="container-fluid py-4">
                    <h1 className="display-4 fw-bold text-primary">E-Ticaret XML API Demosuna Hoş Geldiniz!</h1>
                    <p className="col-md-8 fs-5 mt-3">
                        Bu uygulama, modern bir e-ticaret platformunu XML tabanli API'ler kullanarak gosterir.
                    </p>
                    <hr className="my-4" />
                    <p>
                        Urun listesini gormek, kullanici girisi yapmak ve admin ozelliklerine erismek icin
                        asagidaki baglantilari kullanabilirsiniz.
                    </p>
                    <div className="mt-4">
                        <Link to="/products" className="btn btn-primary btn-lg me-3 px-4">
                            <i className="bi bi-box me-2"></i>Urunlere Gozat
                        </Link>
                        <Link to="/register" className="btn btn-outline-secondary btn-lg px-4">
                            <i className="bi bi-person-plus me-2"></i>Kayit Ol
                        </Link>
                    </div>
                </div>
            </div>

            {/* Özellikler - Kart tasarımları iyileştirildi */}
            <h3 className="text-center mb-4 text-secondary">Platform Özellikleri</h3>
            <div className="row mt-4 g-4">
                <div className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm hover-card">
                        <div className="card-body text-center p-4">
                            <div className="feature-icon bg-primary bg-gradient text-white rounded-circle mb-3">
                                <i className="bi bi-code-slash"></i>
                            </div>
                            <h5 className="card-title">XML Yapi</h5>
                            <p className="card-text">
                                Urun ve kullanici verileri XML formatinda saklanir ve islenir.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm hover-card">
                        <div className="card-body text-center p-4">
                            <div className="feature-icon bg-success bg-gradient text-white rounded-circle mb-3">
                                <i className="bi bi-shield-check"></i>
                            </div>
                            <h5 className="card-title">Guvenli Kimlik Dogrulama</h5>
                            <p className="card-text">
                                JWT token tabanli kimlik dogrulama ile guvenli erisim.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card h-100 border-0 shadow-sm hover-card">
                        <div className="card-body text-center p-4">
                            <div className="feature-icon bg-danger bg-gradient text-white rounded-circle mb-3">
                                <i className="bi bi-gear"></i>
                            </div>
                            <h5 className="card-title">Admin Paneli</h5>
                            <p className="card-text">
                                Admin kullanicilari icin ozel urun yonetim arayuzu.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS stilleri ekleniyor */}
            <style jsx>{`
                .hover-card {
                    transition: transform 0.3s ease;
                }
                .hover-card:hover {
                    transform: translateY(-10px);
                }
                .feature-icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 60px;
                    height: 60px;
                    font-size: 1.5rem;
                }
            `}</style>
        </div>
    );
};

export default HomePage;