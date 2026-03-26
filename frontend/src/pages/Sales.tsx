import React, { useState, useEffect } from 'react';
import { saleService, Sale } from '../services/saleService';

const Sales: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true);
        const data = await saleService.getAllSales();
        setSales(data);
      } catch (err) {
        setError('Erro ao carregar o histórico de vendas.');
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Carregando vendas...</p>;
  if (error) return <p className="text-center text-red-500 bg-red-100 p-4 rounded-lg">{error}</p>;

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Histórico de Vendas</h1>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500 tracking-wider">ID da Venda</th>
              <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-gray-500 tracking-wider">Valor Total</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500 tracking-wider">Data</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500 tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sales.map((sale) => (
              <tr key={sale.id} className="group hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 text-sm font-medium text-gray-800 group-hover:text-red-600 transition-colors">
                  #{sale.id.substring(0, 8)}...
                </td>
                <td className="px-6 py-4 text-right text-sm font-bold text-gray-800">
                  R$ {sale.valorTotal.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(sale.data).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`
                    inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border
                    ${sale.status === 'Concluída' 
                      ? 'bg-green-100 text-green-800 border-green-200' 
                      : 'bg-yellow-100 text-yellow-800 border-yellow-200'}
                  `}>
                    {sale.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sales;