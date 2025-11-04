// src/pages/ProductCatalog.tsx

import React, { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { ProductGrid } from '../components/ProductGrid';
import { initialProducts } from '../data/productsData';
import { Footer } from '../components/Footer';


export const ProductCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const allProducts = initialProducts;

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return allProducts;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return allProducts.filter((product) =>
      product.nombre.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [searchTerm, allProducts]);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #141414 0%, #1f1f1f 100%)',
        color: '#f5f5f5',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Header con buscador */}
      <Header onSearch={handleSearch} />

      {/* Contenido principal */}
      <main
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '40px 20px',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            fontSize: '2rem',
            color: '#00c853',
            marginBottom: '30px',
          }}
        >
         🛒 Catálogo de Productos
        </h2>

        <ProductGrid products={filteredProducts} />
      </main>
      <Footer />

    </div>
  );
};



