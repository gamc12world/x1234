import React, { useContext } from 'react';
import { useNotifications } from '../contexts/NotificationContext';

const NotificationIcon: React.FC = () => {
  const { notifications, markAsRead } = useNotifications();

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const handleIconClick = () => {
    console.log('Notifications:', notifications);
    // In a real implementation, you would show a notification list here
    // and potentially mark notifications as read when the list is opened.
  };

  return (
    <div className="relative cursor-pointer" onClick={handleIconClick}>
      <span role="img" aria-label="notification icon" style={{ fontSize: '24px' }}>
        🔔
      </span>
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
          {unreadCount}
        </span>
      )}
    </div>
  );
};

export default NotificationIcon;