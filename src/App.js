import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import ProductosList from './components/ProductosList';
import Home from './pages/Home';
import About from './pages/About';

const App = () => {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/productos"
                        element={
                            <PrivateRoute>
                                <ProductosList />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/acerca" element={<About />} />
                    <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
