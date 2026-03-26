import React from 'react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-[#0D1117] text-[#E6EDF3]">
      <div className="w-full max-w-md rounded-lg bg-[#161B22] p-10 shadow-xl">
        <h2 className="mb-2 text-center text-4xl font-extrabold text-[#FACC15]">HUB GO</h2>
        <h3 className="mb-8 text-center text-xl text-[#8B949E]">Cadastro de Usuário</h3>
        <p className="text-center text-lg mb-6">Esta é a página de cadastro.</p>
        <div className="text-center">
          <Link to="/login" className="text-[#FACC15] transition-colors duration-200 hover:underline">
            Voltar para o Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;