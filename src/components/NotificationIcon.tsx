import React, { useContext } from 'react';
import { useNotifications } from '../contexts/NotificationContext';

const NotificationIcon: React.FC = () => {
const NotificationIcon: React.FC<NotificationIconProps> = ({ onIconClick }) => {
  const handleIconClick = () => {
    onIconClick(); // Call the prop when the icon is clicked
  };

  return (
    <div onClick={handleIconClick} style={{ border: '1px solid black', padding: '5px' }}>
      Basic Notification Icon
    </div>
  );
}};

export default NotificationIcon;