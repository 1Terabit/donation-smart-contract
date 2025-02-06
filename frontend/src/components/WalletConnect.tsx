"use client";

import React from 'react';
import { useWeb3Context } from '../contexts/Web3Provider';

export function WalletConnect() {
  const { isConnected, account, connectWallet, disconnectWallet } = useWeb3Context();

  return (
    <div className="flex items-center space-x-4">
      {!isConnected ? (
        <button 
          onClick={connectWallet} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Conectar Wallet
        </button>
      ) : (
        <div className="flex items-center space-x-2">
          <span className="text-green-600">
            {account ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : 'Wallet Conectada'}
          </span>
          <button 
            onClick={disconnectWallet} 
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm"
          >
            Desconectar
          </button>
        </div>
      )}
    </div>
  );
}