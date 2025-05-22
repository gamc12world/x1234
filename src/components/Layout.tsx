import React, { useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { supabase } from '../lib/supabase'; // Assuming your Supabase client is here
import { useNotifications } from '../contexts/NotificationContext'; // Assuming your NotificationContext is here
import NotificationIcon from './NotificationIcon'; // Assuming your NotificationIcon is here


const Layout: React.FC = () => {
 const { addNotification } = useNotifications();
 
  useEffect(() => {
    const productSubscription = supabase
      .channel('product_changes') // Choose a channel name

      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'products' },
        (payload) => {
          const oldProduct = payload.old;
          const newProduct = payload.new;

          // Check if the status has changed
          if (oldProduct.status !== newProduct.status) {
            addNotification(`Product "${newProduct.name}" status updated to ${newProduct.status}`);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(productSubscription);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header>
        {/* You might need to adjust your Header component to accept children or a prop */}
        <NotificationIcon />
      </Header>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;