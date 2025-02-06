import { Chain } from "wagmi";

export const developmentChain: Chain = {
  id: 31337, // Hardhat local network
  name: "Hardhat Local",
  network: "hardhat",
  nativeCurrency: {
    decimals: 18,
    name: "Hardhat Ether",
    symbol: "HH",
  },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] },
    public: { http: ["http://127.0.0.1:8545"] },
  },
};

export const sepoliaChain: Chain = {
  id: 11155111, // Sepolia Testnet
  name: "Sepolia",
  network: "sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "Sepolia Ether",
    symbol: "SEP",
  },
  rpcUrls: {
    default: { http: ["https://sepolia.infura.io/v3/"] },
    public: { http: ["https://sepolia.infura.io/v3/"] },
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://sepolia.etherscan.io",
    },
  },
};

// IMPORTANTE: Cambiar según el entorno
export const contractAddress =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x...";
export const currentChain =
  process.env.NEXT_PUBLIC_NETWORK === "sepolia"
    ? sepoliaChain
    : developmentChain;
