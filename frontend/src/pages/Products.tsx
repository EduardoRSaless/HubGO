import React, { useState, useEffect } from 'react';
import { productService, Product, ProductCreateUpdate } from '../services/productService';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductCreateUpdate>({
    name: '',
    barcode: '',
    price: 0,
    weight: 0,
    active: true,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError('Erro ao carregar produtos.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentProductId) {
        await productService.updateProduct(currentProductId, form);
      } else {
        await productService.createProduct(form);
      }
      closeModal();
      fetchProducts();
    } catch (err) {
      setError('Erro ao salvar produto.');
    }
  };

  const openModal = (product: Product | null = null) => {
    setError(null);
    if (product) {
      setCurrentProductId(product.id);
      setForm(product);
    } else {
      setCurrentProductId(null);
      setForm({ name: '', barcode: '', price: 0, weight: 0, active: true });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProductId(null);
  };

  const handleDelete = async (productId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await productService.deleteProduct(productId);
        fetchProducts();
      } catch (err) {
        setError('Erro ao excluir produto.');
      }
    }
  };

  const primaryButtonClass = "bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 px-6 py-3 transition-all duration-200";
  const secondaryButtonClass = "bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg flex items-center justify-center gap-2 px-6 py-3 transition-all duration-200";
  const inputClass = "w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500";

  if (loading) return <p className="text-center text-gray-500">Carregando produtos...</p>;

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Gerenciar Produtos</h1>
        <button
          onClick={() => openModal()}
          className={primaryButtonClass}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Novo Produto
        </button>
      </div>
      {error && <p className="mb-4 text-center text-red-600 bg-red-100 py-2 rounded-lg border border-red-200">{error}</p>}
      
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500 tracking-wider">Nome</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500 tracking-wider">Código</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-gray-500 tracking-wider">Preço</th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase text-gray-500 tracking-wider">Ativo</th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase text-gray-500 tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="group hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 group-hover:text-red-600 transition-colors">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{product.barcode}</td>
                  <td className="px-6 py-4 text-right text-sm font-bold text-gray-800">R$ {product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-center text-sm">
                    {product.active ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">Sim</span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">Não</span>
                    )}
                  </td>
                  <td className="flex justify-center gap-3 px-6 py-4 text-sm">
                    <button onClick={() => openModal(product)} className="text-red-600 hover:text-red-700 transition-colors duration-200 font-medium">Editar</button>
                    <button onClick={() => handleDelete(product.id)} className="text-gray-500 hover:text-gray-700 transition-colors duration-200 font-medium">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 m-4">
            <h2 className="mb-6 text-xl font-bold text-gray-800">{currentProductId ? 'Editar' : 'Novo'} Produto</h2>
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">Nome</label>
                <input type="text" name="name" value={form.name} onChange={handleInputChange} className={inputClass} required />
              </div>
              <div className="mb-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">Código de Barras</label>
                <input type="text" name="barcode" value={form.barcode} onChange={handleInputChange} className={inputClass} required />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Preço</label>
                  <input type="number" name="price" value={form.price} onChange={handleInputChange} className={inputClass} required />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Peso (kg)</label>
                  <input type="number" name="weight" value={form.weight} onChange={handleInputChange} className={inputClass} required />
                </div>
              </div>
              <div className="mb-6 flex items-center">
                <input
                  type="checkbox"
                  name="active"
                  checked={form.active}
                  onChange={handleInputChange}
                  className="mr-3 h-5 w-5 rounded text-red-600 focus:ring-red-500 border-gray-300"
                />
                <label className="text-gray-700 font-medium">Ativo</label>
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={closeModal} className={secondaryButtonClass}>
                  Cancelar
                </button>
                <button type="submit" className={primaryButtonClass}>
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;