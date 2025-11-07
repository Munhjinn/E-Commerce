import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../features/store';
import { markDelivered } from '../features/ordersSlice';
import { logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const DeliveryPage: React.FC = () => {
  const orders = useSelector((s: RootState) => s.orders.list);
  const auth = useSelector((s: RootState) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Protect page: only delivery role
    if (!auth?.isLoggedIn || auth.user?.role !== 'delivery') {
      // send to main login if not delivery
      navigate('/login');
    } else {
      setChecking(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, navigate]);

  if (checking) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">Checking access...</div>
      </div>
    );
  }

  const pending = orders.filter(o => o.status === 'pending');
  const delivered = orders.filter(o => o.status === 'delivered');

  return (
    <>
      {/* Inline delivery header (kept inside DeliveryPage) */}
      <header className="bg-[#FF6E00] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">A</div>
              <span className="text-lg font-bold tracking-wide">Amour</span>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => {
                dispatch(logout());
                navigate('/');
              }} className="bg-white/10 px-3 py-1 rounded hover:bg-white/20">Logout</button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">All deliveries</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-3">Pending deliveries ({pending.length})</h2>
          {pending.length === 0 ? (
            <div className="text-sm text-gray-500">No pending deliveries</div>
          ) : (
            <ul className="space-y-3">
              {pending.map((o) => (
                <li key={o.id} className="border p-3 rounded flex justify-between items-start">
                  <div>
                    <div className="font-medium">Order #{o.id} — ${o.total.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">{o.items.length} items • {new Date(o.createdAt).toLocaleString()}</div>
                    <div className="text-sm mt-2">Address: {o.address}</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={() => dispatch(markDelivered(o.id))} className="px-3 py-1 bg-green-600 text-white rounded">Mark delivered</button>
                    <button onClick={() => alert(JSON.stringify(o, null, 2))} className="px-3 py-1 border rounded">Details</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-3">Delivered ({delivered.length})</h2>
          {delivered.length === 0 ? (
            <div className="text-sm text-gray-500">No delivered orders</div>
          ) : (
            <ul className="space-y-3">
              {delivered.map((o) => (
                <li key={o.id} className="border p-3 rounded">
                  <div className="font-medium">Order #{o.id} — ${o.total.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Delivered on {new Date(o.createdAt).toLocaleString()}</div>
                  <div className="text-sm mt-2">Address: {o.address}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default DeliveryPage;
