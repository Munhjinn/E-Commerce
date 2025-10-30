import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../features/store';
import { removeFromCart, updateQuantity } from '../features/cartSlice';
import { useLanguage } from '../context/LanguageProvider';
import { useNavigate } from 'react-router-dom';

// Guard checkout: if user not logged in, redirect to /login; otherwise go to /checkout

const CartPage: React.FC = () => {
  const cart = useSelector((s: RootState) => s.cart.items);
  const dispatch = useDispatch();
  const { t } = useLanguage();

  const total = cart.reduce((s, it) => s + it.price * it.quantity, 0);
  const navigate = useNavigate();
  const auth = useSelector((s: RootState) => s.auth);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{t('cart')}</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <ul className="divide-y divide-gray-200">
              {cart.map((item) => (
                <li key={item.id} className="py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
                    <div className="ml-4">
                      <div className="font-semibold">{item.title}</div>
                      <div className="text-sm text-gray-500">${item.price}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      min={0}
                      value={item.quantity}
                      onChange={(e) => dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))}
                      className="w-20 border rounded px-2 py-1"
                    />
                    <button onClick={() => dispatch(removeFromCart(item.id))} className="text-red-500">Remove</button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 text-right">
              <div className="text-lg font-semibold">Total: ${total.toFixed(2)}</div>
              <button
                className="btn-primary mt-3"
                onClick={() => {
                  if (!auth?.isLoggedIn) {
                    navigate('/login');
                  } else {
                    navigate('/checkout');
                  }
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
