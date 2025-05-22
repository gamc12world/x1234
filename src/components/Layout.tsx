import React, { useEffect, useState, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { supabase } from '../lib/supabase'; // Assuming your Supabase client is here
import { useNotifications } from '../contexts/NotificationContext'; // Assuming your NotificationContext is here
import NotificationIcon from './NotificationIcon'; // Assuming your NotificationIcon is here
import NotificationList from './NotificationList'; // Import NotificationList


const Layout: React.FC = () => {
 const { addNotification } = useNotifications();
 const [showNotifications, setShowNotifications] = useState(false); // State to manage list visibility
 
  useEffect(() => {
    const orderSubscription = supabase
      .channel('order_changes') // Choose a channel name, e.g., 'order_changes'

      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'orders' },
        (payload) => {
          const oldOrder = payload.old;
          const newOrder = payload.new;

          // Check if the status has changed
          if (oldOrder.status !== newOrder.status) {
            addNotification(`Order #${newOrder.id} status updated to ${newOrder.status}`);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(productSubscription);
    };
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="flex min-h-screen flex-col relative"> {/* Added relative positioning */}
      <Header>
        {/* You might need to adjust your Header component to accept children or a prop */}
        <NotificationIcon onIconClick={toggleNotifications} /> {/* Pass toggle function */}
      </Header>
      {showNotifications && (
        <div style={{ position: 'absolute', top: '60px', right: '20px', zIndex: 10 }}> {/* Basic positioning */}
          <NotificationList />
        </div>
      )}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;