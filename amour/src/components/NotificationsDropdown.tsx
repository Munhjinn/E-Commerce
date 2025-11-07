import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../features/store';
import { markAsRead, markAllAsRead, clearNotification } from '../features/notificationSlice';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../context/LanguageProvider';

interface NotificationsDropdownProps {
  onClose: () => void;
}

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({ onClose }) => {
  const notifications = useSelector((state: RootState) => state.notifications.notifications);
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    dispatch(markAsRead(id));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const handleClear = (id: string) => {
    dispatch(clearNotification(id));
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleMarkAsReadClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(markAsRead(id));
  };

  const handleMarkAllAsReadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(markAllAsRead());
  };

  const handleClearClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(clearNotification(id));
  };

  return (
    <div ref={dropdownRef} className="absolute right-0 mt-4 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50" style={{ top: '100%' }}>
      <div className="p-3 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-medium text-gray-900">{t('notifications')}</h3>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsReadClick}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {t('mark_all_read')}
          </button>
        )}
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            {t('no_notifications')}
          </div>
        ) : (
          notifications.map(notification => (
            <div
              key={notification.id}
              className={`p-3 border-b border-gray-100 hover:bg-gray-50 flex items-start gap-2 ${
                !notification.read ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex-1">
                <p className="text-sm text-gray-800">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatTime(notification.timestamp)}
                </p>
              </div>
              <div className="flex gap-2">
                {!notification.read && (
                  <button
                    onClick={(e) => handleMarkAsReadClick(notification.id, e)}
                    className="text-blue-600 hover:text-blue-800"
                    title={t('mark_as_read')}
                  >
                    <CheckIcon className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={(e) => handleClearClick(notification.id, e)}
                  className="text-gray-400 hover:text-gray-600"
                  title={t('remove')}
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsDropdown;