import React, { useState } from 'react';

interface PaymentModalProps {
  total: number;
  onClose: () => void;
  onPaymentSuccess: (method: string) => void;
  isOpen: boolean;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ total, onClose, onPaymentSuccess, isOpen }) => {
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleProcessPayment = async () => {
    if (!paymentMethod) {
      setError('Selecione um método de pagamento.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      onPaymentSuccess(paymentMethod);
    } catch (err) {
      setError('Erro ao processar pagamento.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div className="glass-card w-full max-w-md p-8 transform transition-all scale-100">
        <h2 className="mb-6 text-center text-2xl font-bold text-primary">Processar Pagamento</h2>
        
        <div className="mb-8 text-center">
          <p className="text-secondary text-lg mb-1">Total a Pagar</p>
          <span className="text-4xl font-extrabold text-blue-500 drop-shadow-sm">R$ {total.toFixed(2)}</span>
        </div>

        {error && <p className="mb-4 text-center text-red-500 bg-red-500/10 py-2 rounded-lg border border-red-500/20">{error}</p>}
        
        <div className="mb-8">
          <label className="mb-3 block font-medium text-secondary">Método de Pagamento</label>
          <div className="grid grid-cols-3 gap-3">
            {['PIX', 'CARTAO', 'DINHEIRO'].map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`
                  py-3 px-2 rounded-xl border transition-all duration-200 font-medium text-sm
                  ${paymentMethod === method 
                    ? 'bg-blue-500/20 border-blue-500/50 text-blue-500 shadow-lg shadow-blue-500/10' 
                    : 'bg-white/5 border-white/10 text-secondary hover:bg-white/10 hover:text-primary'}
                `}
              >
                {method === 'CARTAO' ? 'Cartão' : method === 'DINHEIRO' ? 'Dinheiro' : method}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="btn-secondary px-6 py-3 w-full"
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            onClick={handleProcessPayment}
            className="btn-primary px-6 py-3 w-full flex items-center justify-center gap-2"
            disabled={isLoading || !paymentMethod}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processando...
              </>
            ) : (
              'Confirmar'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
