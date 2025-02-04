const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DonationManagement", function () {
  let donationContract;
  let owner, donor1, donor2;

  beforeEach(async function () {
    [owner, donor1, donor2] = await ethers.getSigners();
    
    const DonationContract = await ethers.getContractFactory("DonationManagement");
    donationContract = await DonationContract.deploy();
  });

  it("Debe permitir donaciones", async function () {
    const donationAmount = ethers.parseEther("0.1");
    await donor1.sendTransaction({
      to: await donationContract.getAddress(),
      value: donationAmount
    });

    const donations = await donationContract.getDonorDonations(donor1.address);
    expect(donations.length).to.equal(1);
    expect(donations[0].amount).to.equal(donationAmount);
    expect(donations[0].processed).to.be.false;
  });

  it("Solo el propietario puede procesar donaciones", async function () {
    const donationAmount = ethers.parseEther("0.1");
    await donor1.sendTransaction({
      to: await donationContract.getAddress(),
      value: donationAmount
    });

    // Intentar procesar por un no propietario debe fallar
    await expect(
      donationContract.connect(donor2).processDonation(0)
    ).to.be.revertedWith("Solo el propietario puede realizar esta accion");

    // El propietario puede procesar
    await donationContract.connect(owner).processDonation(0);

    // No se puede procesar dos veces
    await expect(
      donationContract.connect(owner).processDonation(0)
    ).to.be.revertedWith("Donacion ya procesada");
  });
});