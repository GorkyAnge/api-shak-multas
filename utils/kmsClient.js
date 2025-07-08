const { KeyManagementServiceClient } = require("@google-cloud/kms");

// Decodifica las credenciales desde la variable de entorno Base64
const credentialsJson = Buffer.from(
  process.env.GOOGLE_CREDENTIALS_B64,
  "base64"
).toString("utf-8");
const credentials = JSON.parse(credentialsJson);

// Crea el cliente KMS con las credenciales
const kmsClient = new KeyManagementServiceClient({
  credentials,
});

const keyName = process.env.KMS_KEY_NAME;

module.exports = { kmsClient, keyName };
