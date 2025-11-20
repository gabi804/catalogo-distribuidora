import { createContext, useState, useEffect, type ReactNode } from 'react';

//import type { ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'dark',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // 🔹 Guarda la preferencia del usuario en localStorage
    return (localStorage.getItem('theme') as Theme) || 'dark';
  });

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);

    // 🔹 Cambia el color del fondo de toda la app
    document.body.classList.toggle('light-mode', theme === 'light');
    document.body.style.transition = 'background 0.6s ease';
    document.body.style.background =
      theme === 'dark'
        ? 'linear-gradient(180deg, #141414 0%, #1f1f1f 100%)'
        : 'linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%)';
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
