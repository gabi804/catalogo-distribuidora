import React from 'react';
import { Box, Typography } from '@mui/material';
import { ProductCard } from './ProductCard';
import { type Product } from '../data/productsData';

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <Typography
        align="center"
        sx={{ fontSize: '1.2em', color: '#999', mt: 4 }}
      >
        No se encontraron productos con ese término de búsqueda.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        p: 3,
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)', // 📱 En celular → 2 por fila
          sm: 'repeat(3, 1fr)', // 💻 Tablets → 3 por fila
          md: 'repeat(4, 1fr)', // 🖥️ PC → 4 por fila
          lg: 'repeat(5, 1fr)', // Pantallas grandes → 5
        },
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Box>
  );
};
