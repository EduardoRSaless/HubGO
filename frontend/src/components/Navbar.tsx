import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { logout, isAuthenticated } = useAuth();

  return (
    <div className="
      bg-surface
      border-b border-border
      px-6 py-4
      flex justify-between items-center
    ">
      <Link to="/" className="font-bold text-textPrimary text-xl">
        SmartMarket
      </Link>

      {isAuthenticated && (
        <div className="flex gap-4">
          <Link to="/" className="text-textSecondary hover:text-textPrimary transition-colors duration-200">
            Dashboard
          </Link>
          <Link to="/products" className="text-textSecondary hover:text-textPrimary transition-colors duration-200">
            Produtos
          </Link>
          <Link to="/pdv" className="text-textSecondary hover:text-textPrimary transition-colors duration-200">
            PDV
          </Link>
          <Link to="/sales" className="text-textSecondary hover:text-textPrimary transition-colors duration-200">
            Vendas
          </Link>
          <button
            onClick={logout}
            className="text-danger hover:text-red-400 transition-colors duration-200"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
