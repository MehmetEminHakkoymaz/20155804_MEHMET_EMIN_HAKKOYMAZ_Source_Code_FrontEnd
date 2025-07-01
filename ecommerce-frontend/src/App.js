import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// Layouts
import Layout from './components/Layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

// Components
import ProductForm from './components/Products/ProductForm';

// Utils
import PrivateRoute from './utils/PrivateRoute';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min';

import './App.css';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Layout>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/products/:id" element={<ProductDetailPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        {/* Protected Admin Routes */}
                        <Route
                            path="/admin"
                            element={
                                <PrivateRoute requireAdmin={true}>
                                    <AdminPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/admin/products/new"
                            element={
                                <PrivateRoute requireAdmin={true}>
                                    <ProductForm />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/admin/products/edit/:id"
                            element={
                                <PrivateRoute requireAdmin={true}>
                                    <ProductForm />
                                </PrivateRoute>
                            }
                        />

                        {/* 404 Route */}
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Layout>
            </Router>
        </Provider>
    );
}

export default App;
