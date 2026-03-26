import { api } from './api';

export interface Product {
  id: string;
  name: string;
  barcode: string;
  price: number;
  weight: number;
  active: boolean;
  stock: number; // Adicionado controle de estoque
  creationDate: string;
}

export interface ProductCreateUpdate {
  name: string;
  barcode: string;
  price: number;
  weight: number;
  active: boolean;
  stock: number;
}

const STORAGE_KEY = 'hubgo_products';

// Função auxiliar para carregar do LocalStorage
const loadProducts = (): Product[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // Dados iniciais se estiver vazio
    const initialData: Product[] = [
      { id: 'prod-001', name: 'Coca Cola 2L', barcode: '7891234567890', price: 12.00, weight: 2.1, active: true, stock: 50, creationDate: new Date().toISOString() },
      { id: 'prod-002', name: 'Pão de Forma', barcode: '7890987654321', price: 8.50, weight: 0.5, active: true, stock: 20, creationDate: new Date().toISOString() },
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(stored);
};

// Função auxiliar para salvar no LocalStorage
const saveProducts = (products: Product[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = loadProducts();
        resolve(products.filter(p => p.active));
      }, 300);
    });
  },

  getProductByBarcode: async (barcode: string): Promise<Product | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = loadProducts();
        const product = products.find(p => p.barcode === barcode && p.active);
        resolve(product || null);
      }, 200);
    });
  },

  createProduct: async (product: ProductCreateUpdate): Promise<Product> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const products = loadProducts();
        const newProduct: Product = {
          ...product,
          id: `prod-${Date.now()}`,
          creationDate: new Date().toISOString(),
        };
        products.push(newProduct);
        saveProducts(products);
        resolve(newProduct);
      }, 300);
    });
  },

  updateProduct: async (id: string, product: ProductCreateUpdate): Promise<Product> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const products = loadProducts();
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
          const updatedProduct = { ...products[index], ...product };
          products[index] = updatedProduct;
          saveProducts(products);
          resolve(updatedProduct);
        } else {
          reject(new Error('Product not found'));
        }
      }, 300);
    });
  },

  updateStock: async (id: string, quantityToRemove: number): Promise<void> => {
    return new Promise((resolve) => {
      const products = loadProducts();
      const index = products.findIndex(p => p.id === id);
      if (index !== -1) {
        products[index].stock = Math.max(0, products[index].stock - quantityToRemove);
        saveProducts(products);
      }
      resolve();
    });
  },

  deleteProduct: async (id: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let products = loadProducts();
        const initialLength = products.length;
        products = products.filter(p => p.id !== id);
        if (products.length < initialLength) {
          saveProducts(products);
          resolve();
        } else {
          reject(new Error('Product not found'));
        }
      }, 300);
    });
  },
};
