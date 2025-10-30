// src/components/ProductCard.tsx

import React from 'react';
// Importa la interfaz Product desde el archivo de datos
import { type Product } from '../data/productsData'; 

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div
      style={{
        
        border: '1px solid #444', 
        backgroundColor: '#333',   
        color: '#f5f5f5',
        borderRadius: '8px',
        padding: '10px',
        textAlign: 'center',
        width: '200px',
        boxShadow: '2px 2px 5px rgba(0,0,0,0.5)',
      }}
    >
      <img
        src={product.url_imagen}
        alt={product.nombre}
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover', 
          borderRadius: '4px',
          marginBottom: '10px',
        }}
      />
      <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1em' }}>{product.nombre}</h4>
      <p style={{ margin: 0, color: '#aaa', fontSize: '0.9em' }}> 
        SKU: **{product.codigo_sku}**
      </p>
      <h3 style={{ color: '#00ccff', margin: '10px 0 0 0' }}> {/* Color vibrante para el precio */}
        ${product.precio.toFixed(2)}
      </h3>
    </div>
  );
};