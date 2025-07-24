import React from 'react';
import Logo from '../Logo';

const MainNavbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md py-2">
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Logo />
        </div>
      </div>
    </header>
  );
};

export default MainNavbar;