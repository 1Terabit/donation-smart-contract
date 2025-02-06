"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Web3Provider as EthersWeb3Provider } from '@ethersproject/providers';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';

// Definir el tipo para el contexto Web3
interface Web3ContextType {
  isConnected: boolean;
  account: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  error: string | null;
}

// Crear el contexto con un valor por defecto
const Web3Context = createContext<Web3ContextType>({
  isConnected: false,
  account: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  error: null
});

// Crear el conector inyectado para MetaMask
export const injected = new InjectedConnector({
  supportedChainIds: [31337, 11155111], // Hardhat local y Sepolia
});

// Componente de gestión de Web3
function Web3Manager({ children }: { children: React.ReactNode }) {
  const { activate, active, account, error: web3Error, library } = useWeb3React();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Verificar si estamos en el navegador
    if (typeof window === 'undefined' || typeof window.ethereum === 'undefined') {
      setError('MetaMask no está instalado o no se puede acceder');
      return;
    }

    // Intentar conexión automática
    const tryAutoConnect = async () => {
      try {
        // Verificar si ya hay una cuenta conectada
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          await activate(injected);
        }
      } catch (err) {
        console.error('Error en conexión automática:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
      }
    };

    tryAutoConnect();
  }, [activate]);

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      setError('MetaMask no está instalado');
      return;
    }

    try {
      await activate(injected);
    } catch (err) {
      console.error('Error conectando wallet:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  const disconnectWallet = () => {
    // Implementación de desconexión
    setError(null);
  };

  return (
    <Web3Context.Provider value={{
      isConnected: active,
      account: account || null,
      connectWallet,
      disconnectWallet,
      error: error || web3Error?.message
    }}>
      {children}
    </Web3Context.Provider>
  );
}

// Función para obtener la librería Web3
function getLibrary(provider: any): EthersWeb3Provider {
  return new EthersWeb3Provider(provider);
}

// Componente proveedor principal
export function Web3ContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3Manager>
        {children}
      </Web3Manager>
    </Web3ReactProvider>
  );
}

// Hook personalizado para usar el contexto Web3
export function useWeb3Context() {
  return useContext(Web3Context);
}