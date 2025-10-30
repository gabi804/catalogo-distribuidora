// src/components/ProductGrid.tsx

import React from 'react';
import { ProductCard } from './ProductCard'; 
import { type Product } from '../data/productsData'; // Importa la interfaz

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  if (products.length === 0) {
    return <p style={{ textAlign: 'center', fontSize: '1.2em', color: '#999' }}>
      No se encontraron productos con ese término de búsqueda.
    </p>;
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
        padding: '20px',
      }}
    >
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};