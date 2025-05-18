
import React from 'react';
import Header from '@/components/Header';
import SavedProducts from '@/components/SavedProducts';

const Products = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="container mx-auto p-4 md:p-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-pricing-blue-700 dark:text-blue-400 mb-2">
            Produtos Salvos
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
            Visualize, edite e gerencie todos os seus produtos precificados em um só lugar.
          </p>
        </div>
        
        <SavedProducts />
      </main>
    </div>
  );
};

export default Products;
