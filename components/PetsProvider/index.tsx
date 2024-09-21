import React, { createContext, useContext, useEffect } from 'react';
import { usePetsDatabase } from '@/database';

const PetsContext = createContext({});

export function PetsProvider({ children }: { children: React.ReactNode }) {
  const { reduceAttributes } = usePetsDatabase();

  useEffect(() => {
    const intervalId = setInterval(() => {
      try {
        reduceAttributes();
      } catch (error) {
        console.error('Erro ao reduzir atributos:', error);
      }
    }, 600000); 

    return () => clearInterval(intervalId);
  }, [reduceAttributes]);

  return (
    <PetsContext.Provider value={{}}>
      {children}
    </PetsContext.Provider>
  );
};

export const usePets = () => useContext(PetsContext);