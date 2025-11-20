import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        marginTop: '80px',
        textAlign: 'center',
        color: '#ccc',
        padding: '40px 20px 20px',
        fontFamily: "'Poppins', sans-serif",
        background: 'linear-gradient(180deg, #0e1a0e 0%, #111 100%)',
        borderTop: '2px solid transparent',
        borderImage: 'linear-gradient(90deg, #00e676, #00c853, #00e676)',
        borderImageSlice: 1,
        boxShadow: '0 -4px 20px rgba(0, 255, 100, 0.15)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          fontSize: '1rem',
          marginBottom: '25px',
          letterSpacing: '0.5px',
        }}
      >
        © 2025 <span style={{ color: '#00e676', fontWeight: 600 }}>Distribuidora Kati</span>
      </motion.p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '35px',
          flexWrap: 'wrap',
        }}
      >
        {[
          { icon: faWhatsapp, color: '#25D366', link: 'https://wa.me/543492647644' },
          { icon: faInstagram, color: '#E1306C', link: 'https://www.instagram.com/distribuidora.kati_2020' },
          { icon: faFacebook, color: '#1877F2', link: 'https://www.facebook.com' },
        ].map((social, index) => (
          <motion.a
            key={index}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.25, textShadow: `0 0 10px ${social.color}` }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{
              color: social.color,
              fontSize: '34px',
              transition: 'color 0.3s ease',
            }}
          >
            <FontAwesomeIcon icon={social.icon} />
          </motion.a>
        ))}
      </div>

      {/* 🔹 Línea con brillo animado */}
      <div
        style={{
          position: 'relative',
          height: '3px',
          width: '100%',
          background: 'linear-gradient(90deg, #00c853, #00e676, #00c853)',
          marginTop: '35px',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '25%',
            background: 'linear-gradient(90deg, transparent, #aaffcc, transparent)',
            opacity: 0.8,
          }}
        />
      </div>
      {/* 🔹 Botón flotante para ir al panel de edición */}
      
    </motion.footer>

  );
};


