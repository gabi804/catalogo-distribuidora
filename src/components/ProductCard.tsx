// src/components/ProductCard.tsx

import React from 'react';
import { type Product } from '../data/productsData';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #2c2c2c 0%, #1f1f1f 100%)',
        color: '#f8f8f8',
        borderRadius: '12px',
        padding: '16px',
        textAlign: 'center',
        width: '240px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        transition: 'transform 0.2s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget.style.transform = 'scale(1.05)');
        (e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.4)');
      }}
      onMouseLeave={(e) => {
        (e.currentTarget.style.transform = 'scale(1)');
        (e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)');
      }}
    >
      <img
        src={product.url_imagen}
        alt={product.nombre}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '10px',
          marginBottom: '12px',
        }}
      />
      <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', fontWeight: 600 }}>
        {product.nombre}
      </h3>
     
    </div>
  );
};
