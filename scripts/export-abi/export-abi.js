const fs = require("fs");
const path = require("path");

async function exportABI() {
  try {
    // Ruta al artefacto del contrato
    const artifactPath = path.join(
      __dirname,
      "..",
      "..",
      "artifacts",
      "contracts",
      "DonationContract.sol",
      "DonationManagement.json"
    );

    // Verificar si el archivo de artefacto existe
    if (!fs.existsSync(artifactPath)) {
      throw new Error(`Archivo de artefacto no encontrado: ${artifactPath}`);
    }

    // Leer el artefacto
    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

    // Ruta de destino para el ABI en el frontend
    const frontendABIPath = path.join(
      __dirname,
      "..",
      "..",
      "frontend",
      "src",
      "utils",
      "contractAbi.json"
    );

    // Escribir solo el ABI
    fs.writeFileSync(frontendABIPath, JSON.stringify(artifact.abi, null, 2));

    console.log("✅ ABI exportado exitosamente");
    console.log(`📍 Guardado en: ${frontendABIPath}`);
  } catch (error) {
    console.error("❌ Error exportando ABI:", error);
    process.exit(1);
  }
}

exportABI()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error en la exportación:", error);
    process.exit(1);
  });
