pragma solidity ^0.8.20;

contract DonationManagement {
    struct Donation {
        address donor;
        uint256 amount;
        uint256 timestamp;
        bool processed;
        bool valid;
    }

    address public owner;
    mapping(address => Donation[]) private donorDonations;
    Donation[] private donations;
    uint256 public totalDonations;
    uint256 public processedDonationsCount;

    event DonationReceived(address indexed donor, uint256 amount);
    event DonationProcessed(address indexed donor, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Solo el propietario puede realizar esta accion");
        _;
    }

    modifier validDonation() {
        require(msg.value > 0, "La donacion debe ser mayor a 0");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function donate() public payable validDonation {
        Donation memory newDonation = Donation({
            donor: msg.sender,
            amount: msg.value,
            timestamp: block.timestamp,
            processed: false,
            valid: true
        });

        donorDonations[msg.sender].push(newDonation);
        donations.push(newDonation);

        emit DonationReceived(msg.sender, msg.value);

        _processDonation(donations.length - 1);
    }

    function _processDonation(uint256 index) internal {
        require(index < donations.length, "Indice de donacion invalido");
        require(!donations[index].processed, "Donacion ya procesada");

        Donation storage donation = donations[index];
        
        if (donation.valid && donation.amount > 0) {
            (bool success, ) = owner.call{value: donation.amount}("");
            require(success, "Transferencia fallida");

            donation.processed = true;
            processedDonationsCount++;
            totalDonations += donation.amount;

            emit DonationProcessed(donation.donor, donation.amount);
        }
    }

    function getDonorDonations(address donor) public view returns (Donation[] memory) {
        return donorDonations[donor];
    }

    function getAllDonations() public view returns (Donation[] memory) {
        return donations;
    }

    receive() external payable {
        donate();
    }

    fallback() external payable {
        donate();
    }
}