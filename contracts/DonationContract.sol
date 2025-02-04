// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DonationManagement {
    // Estructura de Donación
    struct Donation {
        address donor;
        uint256 amount;
        uint256 timestamp;
        bool processed;
        bool valid;
    }

    // Variables de estado
    address public owner;
    Donation[] public donations;
    uint256 public totalDonations;
    uint256 public processedDonationsCount;

    // Eventos
    event DonationReceived(address indexed donor, uint256 amount);
    event DonationProcessed(uint256 indexed donationIndex);

    // Modificador para restringir acceso al propietario
    modifier onlyOwner() {
        require(msg.sender == owner, "Solo el propietario puede realizar esta accion");
        _;
    }

    // Constructor
    constructor() {
        owner = msg.sender;
    }

    // Función de donación
    receive() external payable {
        _recordDonation(msg.sender, msg.value);
    }

    // Función interna para registrar donaciones
    function _recordDonation(address donor, uint256 amount) internal {
        require(amount > 0, "Donacion debe ser mayor a cero");

        Donation memory newDonation = Donation({
            donor: donor,
            amount: amount,
            timestamp: block.timestamp,
            processed: false,  // Cambiado a false
            valid: true
        });

        donations.push(newDonation);
        emit DonationReceived(donor, amount);
    }

    // Nueva función para procesar donaciones manualmente
    function processDonation(uint256 donationIndex) public onlyOwner {
        require(donationIndex < donations.length, "Indice de donacion invalido");
        require(!donations[donationIndex].processed, "Donacion ya procesada");

        Donation storage donation = donations[donationIndex];
        
        // Transferir fondos al propietario
        (bool success, ) = owner.call{value: donation.amount}("");
        require(success, "Transferencia fallida");

        // Marcar como procesada
        donation.processed = true;
        processedDonationsCount++;
        totalDonations += donation.amount;

        emit DonationProcessed(donationIndex);
    }

    // Función para obtener donaciones de un donante
    function getDonorDonations(address donor) public view returns (Donation[] memory) {
        Donation[] memory donorDonations = new Donation[](donations.length);
        uint256 count = 0;

        for (uint256 i = 0; i < donations.length; i++) {
            if (donations[i].donor == donor) {
                donorDonations[count] = donations[i];
                count++;
            }
        }

        // Redimensionar el array
        Donation[] memory result = new Donation[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = donorDonations[i];
        }

        return result;
    }
}