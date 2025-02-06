"use client";

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3Context } from '../contexts/Web3Provider';
import { contractAddress } from '../utils/web3Config';
import contractAbi from '../utils/contractAbi.json';

export function DonationForm() {
  const [amount, setAmount] = useState('');
  const { isConnected, account } = useWeb3Context();

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones adicionales
    if (!window.ethereum) {
      alert('MetaMask no está instalado. Por favor, instala MetaMask.');
      return;
    }

    if (!isConnected || !account) {
      alert('Por favor, conecta tu wallet primero');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      alert('Por favor, ingresa un monto válido');
      return;
    }

    try {
      // Solicitar permiso para realizar la transacción
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractAbi, signer);
      
      // Convertir monto a wei
      const amountInWei = ethers.utils.parseEther(amount);
      
      // Enviar transacción de donación
      const tx = await signer.sendTransaction({
        to: contractAddress,
        value: amountInWei
      });

      // Esperar confirmación de la transacción
      const receipt = await tx.wait();
      
      alert('¡Donación realizada con éxito!');
      setAmount('');
    } catch (error) {
      console.error('Error en la donación:', error);
      
      // Manejo de errores más específico
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert('Hubo un error al realizar la donación');
      }
    }
  };

  return (
    <form onSubmit={handleDonate} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Realizar Donación</h2>
      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">
          Monto (ETH)
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          step="0.01"
          min="0.01"
          required
          disabled={!isConnected}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
          placeholder="Ingresa el monto a donar"
        />
      </div>
      <button
        type="submit"
        disabled={!isConnected}
        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-400"
      >
        {isConnected ? 'Donar' : 'Conecta tu Wallet'}
      </button>
    </form>
  );
}