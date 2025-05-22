import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { supabase } from '../lib/supabase'; // Assuming your Supabase client is here
import { toast } from 'react-toastify'; // Assuming you have react-toastify installed

const Layout: React.FC = () => {

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
            toast.info(`Product "${newProduct.name}" status updated to ${newProduct.status}`);
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
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;