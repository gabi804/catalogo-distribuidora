// src/components/SearchBar.tsx

import React from 'react';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '24px',
        padding: '8px 12px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      }}
    >
      <span style={{ color: '#888', fontSize: '18px' }}>🔍</span>
      <input
        type="text"
        placeholder="Buscar producto..."
        onChange={handleChange}
        style={{
          flex: 1,
          padding: '10px',
          fontSize: '16px',
          border: 'none',
          outline: 'none',
          backgroundColor: 'transparent',
          color: '#333',
        }}
      />
    </div>
  );
};
