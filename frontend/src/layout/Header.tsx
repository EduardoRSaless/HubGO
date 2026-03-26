import React from 'react';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case '/': return 'Dashboard';
      case '/pdv': return 'Ponto de Venda (PDV)';
      case '/products': return 'Gerenciar Produtos';
      case '/sales': return 'Histórico de Vendas';
      default: return 'Hub Go';
    }
  };

  return (
    <header className="
      sticky top-0 z-40
      bg-gray-50/75
      backdrop-blur-lg
      border-b border-gray-200
      px-6 py-4
      flex justify-between items-center
      transition-all duration-300
    ">
      {/* Título da Página */}
      <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
        {getPageTitle(location.pathname)}
      </h1>

      {/* Área Direita (Usuário) */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-800">Admin User</p>
            <p className="text-xs text-gray-500">Administrador</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold shadow-lg shadow-red-500/20 border-2 border-white">
            AU
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;