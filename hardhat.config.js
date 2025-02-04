require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-network-helpers");

module.exports = {
  solidity: "0.8.20",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [
        process.env.GANACHE_PRIVATE_KEY_1,
        process.env.GANACHE_PRIVATE_KEY_2,
        process.env.GANACHE_PRIVATE_KEY_3,
        process.env.GANACHE_PRIVATE_KEY_4,
      ],
    },
  },
};
