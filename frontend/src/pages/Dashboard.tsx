import React, { useState, useEffect } from 'react';
import { saleService, Sale } from '../services/saleService';
import { useNavigate } from 'react-router-dom';
import MonthlySalesChart from '../components/charts/MonthlySalesChart';

const Dashboard: React.FC = () => {
  const [totalToday, setTotalToday] = useState<number>(0);
  const [salesTodayCount, setSalesTodayCount] = useState<number>(0);
  const [recentSales, setRecentSales] = useState<Sale[]>([]);
  const [monthlySalesData, setMonthlySalesData] = useState<{ name: string; total: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const allSales = await saleService.getAllSales();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const salesFromToday = allSales.filter(sale => {
          const saleDate = new Date(sale.data);
          saleDate.setHours(0, 0, 0, 0);
          return saleDate.getTime() === today.getTime();
        });

        const total = salesFromToday.reduce((sum, sale) => sum + sale.valorTotal, 0);
        setTotalToday(total);
        setSalesTodayCount(salesFromToday.length);
        
        // Pegar as 5 vendas mais recentes para a tabela
        const sortedSales = [...allSales].sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
        setRecentSales(sortedSales.slice(0, 5));

        const monthlyData: { [key: string]: number } = {};
        allSales.forEach(sale => {
          const month = new Date(sale.data).toLocaleString('default', { month: 'short', year: '2-digit' });
          if (!monthlyData[month]) {
            monthlyData[month] = 0;
          }
          monthlyData[month] += sale.valorTotal;
        });

        const chartData = Object.keys(monthlyData).map(month => ({
          name: month,
          total: monthlyData[month],
        })).sort((a, b) => new Date(`01 ${a.name}`).getTime() - new Date(`01 ${b.name}`).getTime());
        setMonthlySalesData(chartData);

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError('Erro ao carregar dados do dashboard.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="flex h-full items-center justify-center text-gray-500"><p>Carregando Dashboard...</p></div>;
  }

  if (error) {
    return <div className="flex h-full items-center justify-center text-red-500"><p>{error}</p></div>;
  }

  const primaryButtonClass = "bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 py-2.5 transition-all duration-200";
  const secondaryButtonClass = "bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg flex items-center justify-center gap-2 py-2.5 transition-all duration-200";

  return (
    <div>
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 mb-8">
        <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Vendido Hoje</h4>
            <p className="mt-2 text-3xl font-bold text-gray-800">R$ {totalToday.toFixed(2)}</p>
          </div>
          <div className="p-3 rounded-2xl bg-gray-200 text-gray-600 border border-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Vendas Realizadas Hoje</h4>
            <p className="mt-2 text-3xl font-bold text-gray-800">{salesTodayCount}</p>
          </div>
          <div className="p-3 rounded-2xl bg-gray-200 text-gray-600 border border-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Ações Rápidas</h4>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => navigate('/pdv')} className={primaryButtonClass}>PDV</button>
            <button onClick={() => navigate('/products')} className={secondaryButtonClass}>Produtos</button>
          </div>
        </div>
      </div>

      {/* Seção Principal: Gráfico e Vendas Recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <MonthlySalesChart data={monthlySalesData} />
        </div>
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Últimas Vendas</h3>
          <div className="space-y-4">
            {recentSales.map(sale => (
              <div key={sale.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${sale.status === 'Concluída' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${sale.status === 'Concluída' ? 'text-green-600' : 'text-yellow-600'}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">#{sale.id.substring(0, 8)}</p>
                    <p className="text-xs text-gray-500">{new Date(sale.data).toLocaleDateString()}</p>
                  </div>
                </div>
                <p className="font-bold text-gray-800">R$ {sale.valorTotal.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;