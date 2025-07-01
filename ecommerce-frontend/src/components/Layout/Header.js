import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

const Header = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/">E-Ticaret</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Ana Sayfa</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Urunler</Link>
                        </li>
                        {user && user.role === 'Admin' && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">Admin Panel</Link>
                            </li>
                        )}
                    </ul>
                    <ul className="navbar-nav">
                        {user ? (
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                >
                                    {user.username}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    {user.role === 'Admin' && (
                                        <li>
                                            <Link className="dropdown-item" to="/admin">
                                                Admin Panel
                                            </Link>
                                        </li>
                                    )}
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={handleLogout}
                                        >
                                            cikiS Yap
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Giris Yap</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Kayit Ol</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;