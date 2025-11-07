import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../features/store';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageProvider';
import { updateAddress } from '../features/authSlice';
import { createOrder } from '../features/ordersSlice';
import { clearCart } from '../features/cartSlice';

const OrderConfirmationPage: React.FC = () => {
  const cart = useSelector((s: RootState) => s.cart.items);
  const auth = useSelector((s: RootState) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [address, setAddress] = useState(auth.user?.address || '');
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false); // 👈 нэмсэн state

  const total = cart.reduce((s, it) => s + it.price * it.quantity, 0);

  const confirmOrder = () => {
    if (!address) {
      alert('Please provide a shipping address');
      return;
    }
    dispatch(updateAddress(address));
    setShowPaymentOptions(true); // 👈 confirm дарахад төлбөрийн сонголт гарна
  };

  const doPayment = (method: string) => {
    setPaymentMethod(method);
    setTimeout(() => {
      dispatch(createOrder({ items: cart, total, address, status: 'pending' }));
      dispatch(clearCart());
      alert(`Payment completed via: ${method}`);
      navigate('/');
    }, 600);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Order summary</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <ul className="divide-y divide-gray-200">
                {cart.map((it) => (
                  <li key={it.id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src={it.image} alt={it.title} className="w-16 h-16 object-cover rounded" />
                      <div>
                        <div className="font-medium">{it.title}</div>
                        <div className="text-sm text-gray-500">{it.quantity} x ${it.price.toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="font-semibold">${(it.price * it.quantity).toFixed(2)}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded">
              <div className="mb-3">
                <div className="text-sm text-gray-600">Shipping address</div>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border rounded p-2 mt-2"
                />
              </div>

              <div className="text-lg font-semibold mb-4">Total: ${total.toFixed(2)}</div>

              {!showPaymentOptions ? (
                <button onClick={confirmOrder} className="btn-primary w-full mb-3">
                  Confirm & Choose payment
                </button>
              ) : (
                <div>
                  <div className="text-sm text-gray-600 mb-2">Choose a payment method:</div>
                  <div className="space-y-2 mt-2">
                    <button onClick={() => doPayment('Bank transfer')} className="w-full border rounded px-3 py-2">
                      Pay by bank transfer
                    </button>
                    <button onClick={() => doPayment('QPay')} className="w-full border rounded px-3 py-2">
                      Pay with QPay
                    </button>
                    <button onClick={() => doPayment('Card')} className="w-full border rounded px-3 py-2">
                      Pay with card
                    </button>
                  </div>
                </div>
              )}

              {paymentMethod && (
                <div className="mt-4 text-sm">
                  Selected payment: <strong>{paymentMethod}</strong>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
