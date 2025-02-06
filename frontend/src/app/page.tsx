"use client";

import { useState, useEffect } from 'react';
import { WalletConnect } from '../components/WalletConnect';
import { DonationForm } from '../components/DonationForm';
import { useWeb3Context } from '../contexts/Web3Provider';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const { account, isConnected } = useWeb3Context();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar de Navegación */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              BD
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">BlockDonate</h2>
              <p className="text-sm text-gray-500">Plataforma de Donaciones</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button className="w-full text-left px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-medium">
              Inicio
            </button>
            <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              Historial de Donaciones
            </button>
            <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              Estadísticas
            </button>
          </nav>

          <div className="border-t pt-4">
            <WalletConnect />
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Realizar Donación
            </h1>
            <p className="text-gray-600 mb-6">
              Contribuye a causas importantes utilizando blockchain para garantizar transparencia.
            </p>
            
            <DonationForm />
          </div>

          {/* Tarjetas de Información */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Total Donado</h3>
                <span className="text-green-500 font-bold">↑ 12.5%</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                0.245 ETH
              </div>
              <div className="text-sm text-gray-500">
                Últimos 30 días
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Donantes</h3>
                <span className="text-blue-500 font-bold">+5</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                24
              </div>
              <div className="text-sm text-gray-500">
                Desde el inicio
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}