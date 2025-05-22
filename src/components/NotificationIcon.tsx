import React, { useContext } from 'react';
import { useNotifications } from '../contexts/NotificationContext';

const NotificationIcon: React.FC = () => {

const NotificationIcon: React.FC<NotificationIconProps> = ({ onIconClick }) => {
  const { notifications } = useNotifications(); // Removed markAsRead as it's not used here

  const handleIconClick = () => {
    onIconClick(); // Call the prop when the icon is clicked
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

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
}};

export default NotificationIcon;