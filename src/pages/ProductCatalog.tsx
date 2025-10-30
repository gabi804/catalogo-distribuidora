// src/pages/ProductCatalog.tsx

import React, { useState, useMemo } from 'react';
import { SearchBar } from '../components/SearchBar'; 
import { ProductGrid } from '../components/ProductGrid'; 
// Importamos la interfaz y los datos desde nuestro archivo de datos
import {  initialProducts } from '../data/productsData'; 

export const ProductCatalog: React.FC = () => {
  // Estado para guardar lo que el usuario escribe en el buscador
  const [searchTerm, setSearchTerm] = useState('');
  
  // Usamos los productos de prueba como la lista completa de datos
  const allProducts = initialProducts; 

  // Función que se pasa al SearchBar para actualizar el estado de búsqueda
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // useMemo optimiza el filtrado para que solo se ejecute cuando searchTerm cambie
  const filteredProducts = useMemo(() => {
    if (!searchTerm) {
      return allProducts; // Si el input está vacío, muestra todo
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Filtra por nombre o por SKU
    return allProducts.filter(product => {
      return (
        product.nombre.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.codigo_sku.toLowerCase().includes(lowerCaseSearchTerm)
      );
    });
  }, [searchTerm, allProducts]);

  return (
    <div style={{
       maxWidth: '1200px', 
       margin: '0 auto', 
       padding: '20px',
       backgroundColor: '#1c1c1c', 
       color: '#f5f5f5',           
       minHeight: '100vh', }}>
      <h1>🛒 Catálogo de Productos - Distribuidora</h1>
      
      {/* 1. Barra de Búsqueda */}
      <SearchBar onSearch={handleSearch} />

      {/* 2. Cuadrícula de Productos (muestra los productos filtrados) */}
      <ProductGrid products={filteredProducts} />
    </div>
  );
};

