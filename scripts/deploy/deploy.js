const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  if (hre.network.name === "mainnet") {
    console.warn(
      "⚠️  Estás desplegando en mainnet. Confirma que quieres continuar."
    );
  }

  const [deployer] = await hre.ethers.getSigners();

  console.log("🚀 Desplegando contrato con la cuenta:", deployer.address);
  console.log(
    "💰 Balance de la cuenta:",
    hre.ethers.formatEther(
      await deployer.provider.getBalance(deployer.address)
    ),
    "ETH"
  );

  const DonationContract = await hre.ethers.getContractFactory(
    "DonationManagement"
  );

  const donationContract = await DonationContract.deploy();
  await donationContract.waitForDeployment();

  const contractAddress = await donationContract.getAddress();

  console.log("✅ Contrato desplegado en:", contractAddress);

  const deploymentInfo = {
    address: contractAddress,
    network: hre.network.name,
    deployedAt: new Date().toISOString(),
    deployerAddress: deployer.address,
  };

  const contractAddressPath = path.join(
    __dirname,
    "..",
    "..",
    "frontend",
    ".env"
  );

  // Escribir la dirección del contrato en el .env del frontend
  fs.writeFileSync(
    contractAddressPath,
    `NEXT_PUBLIC_CONTRACT_ADDRESS=${contractAddress}\nNEXT_PUBLIC_NETWORK=hardhat`
  );

  console.log("📝 Dirección del contrato guardada en frontend/.env");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error en el despliegue:", error);
    process.exit(1);
  });
