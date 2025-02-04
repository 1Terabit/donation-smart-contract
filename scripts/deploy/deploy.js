const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  if (hre.network.name === "mainnet") {
    console.warn("⚠️  Estás desplegando en mainnet. Confirma que quieres continuar.");
  }

  const [deployer] = await hre.ethers.getSigners();

  console.log("🚀 Desplegando contrato con la cuenta:", deployer.address);
  console.log("💰 Balance de la cuenta:", 
    hre.ethers.formatEther(await deployer.provider.getBalance(deployer.address)), 
    "ETH"
  );

  const DonationContract = await hre.ethers.getContractFactory("DonationManagement");
  
  const estimatedGas = await hre.ethers.provider.estimateGas(
    DonationContract.getDeployTransaction()
  );
  console.log("💸 Gas estimado para despliegue:", estimatedGas.toString());

  const donationContract = await DonationContract.deploy();
  await donationContract.waitForDeployment();

  const contractAddress = await donationContract.getAddress();

  console.log("✅ Contrato desplegado en:", contractAddress);

  const deploymentInfo = {
    address: contractAddress,
    network: hre.network.name,
    deployedAt: new Date().toISOString(),
    deployerAddress: deployer.address,
    estimatedGas: estimatedGas.toString()
  };

  const contractAddressPath = path.join(__dirname, "..", "..", "deployments.json");
  
  try {
    let deployments = [];
    if (fs.existsSync(contractAddressPath)) {
      deployments = JSON.parse(fs.readFileSync(contractAddressPath));
    }
    
    deployments.push(deploymentInfo);
    
    fs.writeFileSync(
      contractAddressPath, 
      JSON.stringify(deployments, null, 2)
    );
    
    console.log("📝 Información de despliegue guardada");
  } catch (error) {
    console.error("❌ Error guardando información de despliegue:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error en el despliegue:", error);
    process.exit(1);
  });