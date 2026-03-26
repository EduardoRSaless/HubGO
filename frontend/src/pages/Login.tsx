import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Box } from '@mui/material';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
    } catch (err) {
      setError('Credenciais inválidas. Por favor, tente novamente.');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl rounded-lg bg-white shadow-2xl">
        {/* Lado do Formulário */}
        <div className="w-full p-10 lg:w-1/2">
          <h2 className="mb-2 text-center text-4xl font-extrabold text-red-600">HUB GO</h2>
          <h3 className="mb-8 text-center text-xl text-gray-600">Acesso ao Sistema</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                type="password"
                id="password"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                value={password}
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="mb-4 text-center text-sm text-red-600">{error}</p>}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-full rounded-lg bg-red-600 py-3 px-4 text-lg font-bold text-white transition-all duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Entrar
              </button>
            </div>
          </form>
          <div className="mt-6 text-center text-sm">
            Não tem conta?{' '}
            <Link to="/register" className="text-red-600 transition-colors duration-200 hover:underline">
              Cadastre-se
            </Link>
          </div>
        </div>

        {/* Lado da Imagem */}
        <div className="relative hidden w-1/2 items-center justify-center lg:flex">
          <div className="absolute left-0 h-full w-px bg-white"></div>
          <Box
            sx={{
              width: 350,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src="/images/Cards/hubGoMarket.jpg"
              alt="Carrinho de compras"
              className="h-full w-full object-cover"
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Login;