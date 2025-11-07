import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  address: string;
  status: 'pending' | 'delivered';
  createdAt: string;
}

interface OrdersState {
  list: Order[];
}

const initialState: OrdersState = {
  list: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<Omit<Order, 'id' | 'createdAt'>>) => {
      const id = `${Date.now()}`;
      const createdAt = new Date().toISOString();
      state.list.push({ ...action.payload, id, createdAt });
    },
    markDelivered: (state, action: PayloadAction<string>) => {
      const ord = state.list.find(o => o.id === action.payload);
      if (ord) ord.status = 'delivered';
    },
  },
});

export const { createOrder, markDelivered } = ordersSlice.actions;
export default ordersSlice.reducer;
