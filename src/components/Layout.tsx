import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { supabase } from '../lib/supabase'; // Assuming your Supabase client is here


const Layout: React.FC = () => {

  return (
    <div className="flex min-h-screen flex-col relative"> {/* Added relative positioning */}
      <Header>
        {/* You might need to adjust your Header component to accept children or a prop */}
      </Header>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;