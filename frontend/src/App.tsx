import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInForm from './components/auth/SignInForm';
import SignInFormTest from './components/auth/SignInFormTest'; // Importando sua tela de teste
import SignUpForm from './components/auth/SignUpForm'; // Voltando para o original
import PDV from './pages/PDV';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Sales from './pages/Sales';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './layout/Layout';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            
            {/* Rota de Teste para sua nova tela de login */}
            <Route path="/test-login" element={<SignInFormTest />} />

            {/* Rotas Protegidas */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/pdv"
              element={
                <PrivateRoute>
                  <Layout>
                    <PDV />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <Layout>
                    <Products />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/sales"
              element={
                <PrivateRoute>
                  <Layout>
                    <Sales />
                  </Layout>
                </PrivateRoute>
              }
            />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
