import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        marginTop: '60px',
        textAlign: 'center',
        color: '#bbb',
        borderTop: '1px solid #333',
        padding: '30px 10px',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <p
        style={{
          fontSize: '0.95rem',
          marginBottom: '15px',
        }}
      >
        © 2025 Distribuidora Kati. 
      </p>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '25px',
          flexWrap: 'wrap', // 🔹 Esto hace que los íconos se acomoden en varias líneas si la pantalla es chica
        }}
      >
        <a
          href="https://wa.me/543492647644"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#25D366',
            fontSize: '32px',
            transition: 'transform 0.3s ease, text-shadow 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.25)';
            e.currentTarget.style.textShadow = '0 0 10px #25D366';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.textShadow = 'none';
          }}
        >
          <FontAwesomeIcon icon={faWhatsapp} />
        </a>

        <a
          href="https://www.instagram.com/distribuidora.kati_2020"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#E1306C',
            fontSize: '32px',
            transition: 'transform 0.3s ease, text-shadow 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.25)';
            e.currentTarget.style.textShadow = '0 0 10px #E1306C';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.textShadow = 'none';
          }}
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>

        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#1877F2',
            fontSize: '32px',
            transition: 'transform 0.3s ease, text-shadow 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.25)';
            e.currentTarget.style.textShadow = '0 0 10px #1877F2';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.textShadow = 'none';
          }}
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
      </div>
    </footer>
  );
};
