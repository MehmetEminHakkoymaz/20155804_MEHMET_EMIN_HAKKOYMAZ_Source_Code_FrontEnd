import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error, user } = useSelector((state) => state.auth);

    // Kullanici zaten Giris yapmiSsa ana sayfaya yOnlendir
    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const validateForm = () => {
        setFormError('');

        if (!username.trim()) {
            setFormError('Kullanici adi boS olamaz');
            return false;
        }

        if (!password) {
            setFormError('Sifre boS olamaz');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await dispatch(login({ username, password })).unwrap();
            // BaSarili Giris sonrasi ana sayfaya yOnlendir
            navigate('/');
        } catch (err) {
            // Error is handled by the reducer
            console.error('Giris hatasi:', err);
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card border-0 shadow-lg rounded-3">
                        <div className="card-header bg-gradient text-white py-3" 
                             style={{backgroundColor: '#4361ee'}}>
                            <h4 className="mb-0 text-center">Giris Yap</h4>
                        </div>
                        <div className="card-body p-4">
                            {(error || formError) && (
                                <div className="alert alert-danger border-0 rounded-3 shadow-sm">
                                    <i className="bi bi-exclamation-circle-fill me-2"></i>
                                    {formError || error}
                                </div>
                            )}
                            
                            <form onSubmit={handleSubmit} className="mt-2">
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        placeholder="Kullanici adi"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        autoFocus
                                    />
                                    <label htmlFor="username">Kullanici Adi</label>
                                </div>
                                
                                <div className="form-floating mb-4">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Sifre"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="password">Sifre</label>
                                </div>
                                
                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-primary py-3"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Giris Yapiliyor...
                                            </>
                                        ) : (
                                            'Giris Yap'
                                        )}
                                    </button>
                                </div>
                            </form>
                            
                            <div className="mt-4 text-center">
                                <p>Hesabiniz yok mu? <Link to="/register" className="text-decoration-none fw-bold">Kaydolun</Link></p>
                                <div className="card bg-light mt-3 p-2">
                                    <p className="text-muted small mb-0">
                                        <i className="bi bi-info-circle me-1"></i>
                                        Test Hesabi: admin / password123
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;