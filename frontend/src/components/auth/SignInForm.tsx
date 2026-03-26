import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Box } from "@mui/material";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError("Credenciais inválidas. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-5xl rounded-2xl bg-white shadow-2xl overflow-hidden min-h-[600px]">
        {/* Lado do Formulário */}
        <div className="w-full flex flex-col justify-center p-10 lg:w-1/2">
          <h2 className="mb-2 text-center text-4xl font-extrabold text-red-600">HUB GO</h2>
          <h3 className="mb-8 text-center text-xl text-gray-600">Acesso ao Sistema</h3>
          <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
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
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Entrando...
                  </span>
                ) : "Entrar"}
              </button>
            </div>
          </form>
          <div className="mt-6 text-center text-sm">
            Não tem conta?{' '}
            <Link to="/signup" className="text-red-600 transition-colors duration-200 hover:underline font-semibold">
              Cadastre-se
            </Link>
          </div>
        </div>

        {/* Lado da Imagem */}
        <div className="relative hidden w-1/2 items-center justify-center bg-gray-50 lg:flex">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.1)] z-10"></div>
          <div className="w-full h-full p-8 flex items-center justify-center relative overflow-hidden">
             <img
               src="/images/cards/hubGoMarket.jpg"
               alt="Carrinho de compras"
               className="w-full h-full object-cover rounded-xl shadow-lg border border-gray-100"
             />
          </div>
        </div>
      </div>
    </div>
  );
}