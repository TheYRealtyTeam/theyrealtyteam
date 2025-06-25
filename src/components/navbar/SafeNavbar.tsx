
import React, { Suspense } from 'react';

const Navbar = React.lazy(() => import('../Navbar'));

const LoadingNavbar = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-2">
    <div className="container-custom">
      <div className="flex items-center justify-between">
        <div className="h-12 bg-gray-200 animate-pulse rounded w-48"></div>
        <div className="hidden md:flex space-x-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-8 bg-gray-200 animate-pulse rounded w-16"></div>
          ))}
        </div>
        <div className="md:hidden h-6 w-6 bg-gray-200 animate-pulse rounded"></div>
      </div>
    </div>
  </header>
);

const SafeNavbar = () => {
  return (
    <Suspense fallback={<LoadingNavbar />}>
      <Navbar />
    </Suspense>
  );
};

export default SafeNavbar;
