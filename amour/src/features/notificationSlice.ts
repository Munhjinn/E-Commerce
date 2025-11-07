import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  id: string;
  message: string;
  read: boolean;
  timestamp: number;
}

interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: [
    {
      id: '1',
      message: 'Welcome to Amour!',
      read: false,
      timestamp: Date.now(),
    },
    {
      id: '2',
      message: 'Your order has been shipped!',
      read: false,
      timestamp: Date.now() - 3600000, // 1 hour ago
    },
  ],
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp'>>) => {
      state.notifications.unshift({
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
      });
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
    },
    clearNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
  },
});

export const { addNotification, markAsRead, markAllAsRead, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;