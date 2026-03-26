import { api } from './api';

export interface SaleItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface SaleCreate {
  items: SaleItem[];
  paymentMethod: string;
  totalAmount: number;
}

export interface Sale {
  id: string;
  valorTotal: number;
  data: string;
  status: string;
  mercadoId: string;
}

export const saleService = {
  getAllSales: async (): Promise<Sale[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 'sale-001', valorTotal: 150.75, data: new Date().toISOString(), status: 'Concluída', mercadoId: 'mercado-01' },
          { id: 'sale-002', valorTotal: 20.00, data: new Date(Date.now() - 3600000).toISOString(), status: 'Pendente', mercadoId: 'mercado-01' },
        ]);
      }, 500);
    });
  },

  getSalesToday: async (): Promise<{ totalToday: number; recentSales: Sale[] }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          totalToday: 1234.56,
          recentSales: [
            { id: 'sale-101', valorTotal: 120.50, data: new Date().toISOString(), status: 'Concluída', mercadoId: 'mercado-01' },
            { id: 'sale-102', valorTotal: 75.00, data: new Date(Date.now() - 600000).toISOString(), status: 'Pendente', mercadoId: 'mercado-01' },
            { id: 'sale-103', valorTotal: 200.00, data: new Date(Date.now() - 1200000).toISOString(), status: 'Concluída', mercadoId: 'mercado-01' },
          ],
        });
      }, 500);
    });
  },

  createSale: async (sale: SaleCreate): Promise<Sale> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...sale,
          id: `sale-${Date.now()}`,
          data: new Date().toISOString(),
          status: 'Concluída',
          mercadoId: 'mercado-01',
        });
      }, 500);
    });
  },
};
