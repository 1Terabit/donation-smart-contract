```markdown
# 💡 Donation Smart Contract

## 🎯 Quick Overview

Secure blockchain-based donation management system with transparent and efficient fund handling.

## ✨ Key Features

- 🔒 Strict access control
- 💸 Automatic donation processing
- 📊 Detailed transaction logging

## 🛠 Setup

### Prerequisites
- Node.js 16+
- Hardhat
- Ethereum Wallet

### Installation
```bash
# Clone repository
git clone https://github.com/your-username/donation-smart-contract.git

# Install dependencies
pnpm install

# Compile contract
pnpm hardhat compile

# Run tests
pnpm hardhat test
```

## 🚀 Deployment

- **Deploy to local network**
  ```bash
  pnpm hardhat run scripts/deploy/deploy.js --network ganache
  ```

- **Deploy to testnet/mainnet**
  ```bash
  pnpm hardhat run scripts/deploy/deploy.js --network yourNetwork
  ```

## 📄 Documentation

For detailed technical documentation, see `DONATION_CONTRACT_DOCS.md`.

## 🧪 Testing

- Unit tests covering 95% of contract functionality
- Comprehensive security checks

## 📜 License

MIT License
```
