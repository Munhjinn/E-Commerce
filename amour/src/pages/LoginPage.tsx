import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // NOTE: In a real app you'd call an API. Here we accept any credentials.
    const name = email ? email.split('@')[0] : 'User';
    // If this is the delivery partner account, log in as delivery and go to deliveries page
    if (email.trim().toLowerCase() === 'delivery@gmail.com' && password === 'delivery') {
      dispatch(login({ name, email, role: 'delivery' }));
      navigate('/deliveries');
    } else {
      // normal customer
      dispatch(login({ name, email, role: 'customer' }));
      navigate('/'); // redirect to homepage after login
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Log In</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="flex items-center justify-between">
            <button className="btn-primary" type="submit">Log In</button>
            <Link to="/register" className="text-sm text-blue-600">Create account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
