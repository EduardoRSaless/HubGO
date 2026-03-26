import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { productService, SaleItem } from '../services/productService';
import { saleService } from '../services/saleService';
import PaymentModal from '../components/pdv/PaymentModal';
import { useNavigate } from 'react-router-dom';

const PDV: React.FC = () => {
  const { cart, addToCart, removeFromCart, clearCart, getTotal } = useCart();
  const [barcodeInput, setBarcodeInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const inputElement = document.getElementById('barcode-input');
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  const handleBarcodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!barcodeInput) return;

    try {
      const product = await productService.getProductByBarcode(barcodeInput);
      if (product) {
        if (product.stock > 0) {
          addToCart({ id: product.id, name: product.name, price: product.price });
          setBarcodeInput('');
        } else {
          setError(`Produto "${product.name}" sem estoque.`);
        }
      } else {
        setError('Produto não encontrado.');
      }
    } catch (err) {
      console.error("Error fetching product by barcode:", err);
      setError('Erro ao buscar produto. Verifique o código ou a conexão.');
    }
  };

  const handleOpenPaymentModal = () => {
    if (cart.length === 0) {
      setError('Adicione produtos ao carrinho antes de pagar.');
      return;
    }
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = async (paymentMethod: string) => {
    try {
      // 1. Dar baixa no estoque
      for (const item of cart) {
        await productService.updateStock(item.id, item.quantity);
      }

      // 2. Criar o registro da venda
      const saleItems: SaleItem[] = cart.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      await saleService.createSale({
        items: saleItems,
        paymentMethod: paymentMethod,
        totalAmount: getTotal(),
      });

      alert('Venda registrada com sucesso e estoque atualizado!');
      clearCart();
      setIsPaymentModalOpen(false);
      navigate('/');
    } catch (err) {
      console.error("Error creating sale:", err);
      setError('Erro ao registrar a venda.');
    }
  };

  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-140px)] text-primary">
      {/* Barcode Input Card */}
      <div className="glass-card p-4">
        <form onSubmit={handleBarcodeSubmit} className="flex gap-4">
          <input
            id="barcode-input"
            type="text"
            value={barcodeInput}
            onChange={(e) => setBarcodeInput(e.target.value)}
            placeholder="Escanear código de barras..."
            className="glass-input flex-grow px-4 py-2"
            autoFocus
          />
          <button
            type="submit"
            className="btn-primary px-6 py-2"
          >
            Adicionar
          </button>
        </form>
        {error && <p className="mt-2 text-center text-sm text-red-500">{error}</p>}
      </div>

      {/* Cart Items Card */}
      <div className="glass-card flex-grow overflow-hidden flex flex-col p-0">
        <div className="p-4 border-b border-white/10 bg-white/5">
          <h2 className="text-lg font-semibold text-primary">Itens no Carrinho</h2>
        </div>
        
        <div className="flex-grow overflow-y-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/5 sticky top-0 z-10 backdrop-blur-md">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-secondary tracking-wider">Produto</th>
                <th className="px-6 py-3 text-center text-xs font-semibold uppercase text-secondary tracking-wider">Qtd</th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-secondary tracking-wider">Preço Unit.</th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-secondary tracking-wider">Total</th>
                <th className="px-6 py-3 text-center text-xs font-semibold uppercase text-secondary tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 bg-transparent">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors duration-150">
                    <td className="whitespace-nowrap px-6 py-3 text-sm font-medium text-primary">{item.name}</td>
                    <td className="whitespace-nowrap px-6 py-3 text-center text-sm text-secondary">{item.quantity}</td>
                    <td className="whitespace-nowrap px-6 py-3 text-right text-sm text-secondary">R$ {item.price.toFixed(2)}</td>
                    <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-bold text-primary">R$ {(item.price * item.quantity).toFixed(2)}</td>
                    <td className="whitespace-nowrap px-6 py-3 text-center text-sm">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="
                          p-1.5 rounded-lg
                          text-secondary hover:text-red-500 hover:bg-red-500/10
                          transition-all duration-200
                        "
                        title="Remover item"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-secondary">
                    <div className="flex flex-col items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 opacity-20">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                      </svg>
                      <p>O carrinho está vazio.</p>
                      <p className="text-xs opacity-60">Escaneie um produto para começar.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Total and Payment Card */}
      <div className="glass-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xl font-bold text-primary">TOTAL</span>
          <span className="text-4xl font-extrabold text-blue-500 drop-shadow-sm">R$ {getTotal().toFixed(2)}</span>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <button
            onClick={() => { clearCart(); setError(null); }}
            className="btn-secondary py-3 px-6 text-red-500 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20"
          >
            Cancelar
          </button>
          <button
            onClick={handleOpenPaymentModal}
            className="
              bg-green-600 hover:bg-green-500
              text-white
              py-3 px-6
              rounded-xl
              font-bold text-lg
              shadow-lg shadow-green-500/20 hover:shadow-green-500/40
              transition-all duration-300
              flex items-center justify-center gap-2
              active:scale-95
            "
          >
            <span>Finalizar Venda</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        total={getTotal()}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default PDV;
