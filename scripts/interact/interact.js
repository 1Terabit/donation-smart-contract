const fs = require("fs");
const path = require("path");

async function main() {
  const contractAddressPath = path.join(
    __dirname,
    "..",
    "..",
    "contractAddress.json"
  );
  const { address: contractAddress } = JSON.parse(
    fs.readFileSync(contractAddressPath)
  );

  const [owner, donor1, donor2, donor3] = await ethers.getSigners();
  const DonationContract = await ethers.getContractFactory(
    "DonationManagement"
  );
  const donationContract = await DonationContract.attach(contractAddress);

  const donors = [donor1, donor2, donor3];

  for (const donor of donors) {
    console.log(`\nRealizando donación por ${donor.address}...`);
    const donationAmount = ethers.parseEther(
      (Math.random() * 0.5 + 0.1).toFixed(3)
    );

    const donationTx = await donor.sendTransaction({
      to: contractAddress,
      value: donationAmount,
    });
    await donationTx.wait();

    console.log(
      `Donación de ${ethers.formatEther(donationAmount)} ETH realizada`
    );
  }

  console.log("\nObteniendo donaciones de cada donante...");
  for (const donor of donors) {
    const donations = await donationContract.getDonorDonations(donor.address);

    console.log(`\nDonaciones de ${donor.address}:`);
    donations.forEach((donation, index) => {
      console.log(`Donación ${index}:`);
      console.log(`  Donante: ${donation.donor}`);
      console.log(`  Monto: ${ethers.formatEther(donation.amount)} ETH`);
      console.log(
        `  Timestamp: ${new Date(
          Number(donation.timestamp) * 1000
        ).toLocaleString()}`
      );
      console.log(`  Procesada: ${donation.processed}`);
      console.log(`  Válida: ${donation.valid}`);
    });
  }

  const totalDonations = await donationContract.totalDonations();
  const processedDonationsCount =
    await donationContract.processedDonationsCount();

  console.log("\nInformación del Contrato:");
  console.log(`Total de donaciones: ${ethers.formatEther(totalDonations)} ETH`);
  console.log(`Número de donaciones procesadas: ${processedDonationsCount}`);
}

main().catch((error) => {
  console.error("Error en la interacción:", error);
  process.exit(1);
});
