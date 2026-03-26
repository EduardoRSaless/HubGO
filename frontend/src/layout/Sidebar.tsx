import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  // Ícones profissionais (Heroicons)
  const icons = {
    dashboard: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    pdv: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
    products: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
    sales: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-3.182-3.182m3.182 3.182v3.182H19.5M3 12h18M3 7.5h18m-18 9h18" />
      </svg>
    ),
    logout: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-3-3l-3 3m0 0l3 3m-3-3h12.75" />
      </svg>
    ),
    logo: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-red-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75v-2.25M12 21.75V15M12 15V9.75M5.25 9.75l2.25-1.313M5.25 9.75l2.25 1.313M18.75 9.75l-2.25-1.313M18.75 9.75l-2.25 1.313m0-2.626l2.25-1.313M12 3.75l2.25 1.313M12 3.75l-2.25 1.313M3 16.5l2.25-1.313M21 16.5l-2.25-1.313" />
      </svg>
    )
  };

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: icons.dashboard },
    { path: '/pdv', label: 'PDV', icon: icons.pdv },
    { path: '/products', label: 'Produtos', icon: icons.products },
    { path: '/sales', label: 'Vendas', icon: icons.sales },
  ];

  return (
    <aside className="
      w-20
      h-screen
      fixed left-0 top-0 z-50
      flex
      flex-col
      items-center
      justify-between
      bg-white
      border-r border-gray-200
      py-6
    ">
      
      {/* Topo: Logo e Menu */}
      <div className="flex flex-col items-center gap-8 w-full">

        {/* Logo */}
        <div className="w-12 h-12 flex items-center justify-center">
          <Link to="/" className="hover:scale-110 transition-transform duration-200">
            {icons.logo}
          </Link>
        </div>

        {/* Menu */}
        <nav className="flex flex-col items-center gap-4 w-full">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                title={item.label}
                className={`
                  w-12 h-12
                  flex items-center justify-center
                  rounded-xl
                  transition-all duration-200
                  ${isActive
                    ? "bg-red-100 text-red-600"
                    : "text-gray-500 hover:bg-gray-100 hover:text-red-600"
                  }
                `}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  {item.icon}
                </div>
              </Link>
            );
          })}
        </nav>

      </div>

      {/* Bottom: Logout */}
      <div className="flex flex-col items-center gap-4 mb-2">
        <button
          onClick={handleLogout}
          title="Sair"
          className={`
            w-12 h-12
            flex items-center justify-center
            rounded-xl
            transition-all duration-200
            text-gray-500 hover:bg-red-100/50 hover:text-red-600
          `}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            {icons.logout}
          </div>
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;