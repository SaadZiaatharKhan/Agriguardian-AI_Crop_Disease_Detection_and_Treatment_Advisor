"use client"
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? (
        <FaMoon size={24} style={{ color: 'gold' }} />
      ) : (
        <FaSun size={24} style={{ color: 'yellow' }} />
      )}
    </button>
  );
};

export default ThemeToggle;
