import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4 mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h5>E-Ticaret API Demo</h5>
                        <p>XML tabanli modern e-ticaret uygulamasi</p>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <p>&copy; 2023 ECommerceAPI. TUm haklari saklidir.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;