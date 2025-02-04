// test/DonationManagement.test.js
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
  });

  it("Solo el propietario puede procesar donaciones", async function () {
    const donationAmount = ethers.parseEther("0.1");
    await donor1.sendTransaction({
      to: await donationContract.getAddress(),
      value: donationAmount
    });

    await expect(
      donationContract.connect(donor2).processDonation(0)
    ).to.be.revertedWith("Solo el propietario puede realizar esta accion");
  });
});