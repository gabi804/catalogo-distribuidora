// src/components/ProductCard.tsx

import React from 'react';
import { type Product } from '../data/productsData';
import { Typography, Card, CardMedia, CardContent, Box } from '@mui/material';
import { motion } from 'framer-motion'; // 👈 si querés animaciones suaves

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 200, damping: 12 }}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <Card
        sx={{
          background: 'linear-gradient(180deg, #1e1e1e 0%, #111 100%)',
          color: '#f8f8f8',
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
          textAlign: 'center',
          width: '100%',
          maxWidth: 260,
          border: '1px solid rgba(255,255,255,0.05)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 12px 25px rgba(0,255,150,0.2)',
            border: '1px solid rgba(0,255,120,0.3)',
          },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            image={product.url_imagen}
            alt={product.nombre}
            sx={{
              height: 220,
              width: '100%',
              objectFit: 'contain',
              background:
                'radial-gradient(circle at center, rgba(0,255,120,0.05) 0%, #0a0a0a 90%)',
              transition: 'transform 0.4s ease',
              '&:hover': {
                transform: 'scale(1.08)',
              },
            }}
          />

          {/* 🔹 Sombra de brillo al pasar el mouse */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              background:
                'linear-gradient(0deg, rgba(0,0,0,0.8), transparent 80%)',
            }}
          />
        </Box>

        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: '1rem',
              mb: 1,
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              color: '#ffffff',

            }}
          >
            {product.nombre}
          </Typography>
          {/* 🔹 Precio del producto */}
          <Typography
            variant="body1"
            sx={{
              color: '#ffffff',
              fontWeight: 500,
              fontSize: '1rem',
              mb: 1,
            }}
          >
            ${Math.floor(product.precio)}
          </Typography>

          {/* 🔹 Línea decorativa */}
          <Box
            sx={{
              width: '40%',
              height: '3px',
              background: 'linear-gradient(90deg, #00e676, #1de9b6)',
              mx: 'auto',
              borderRadius: 2,
              mb: 1,
            }}
          />

          {/* 🔹 Texto descriptivo (opcional si querés mostrar más info) */}
          <Typography
            variant="body2"
            sx={{
              color: '#ffffff',
              fontSize: '0.9rem',
              minHeight: '2em',
            }}
          >

          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};
