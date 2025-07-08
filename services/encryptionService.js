const { kmsClient, keyName } = require("../utils/kmsClient");
const crypto = require("crypto");
const ALGORITHM = "aes-256-gcm";

async function cifrarPayload(payload) {
  // 1. Genera una clave de datos local (Data Encryption Key - DEK)
  const dek = crypto.randomBytes(32);

  // 2. Pide a Google KMS que CIFRE esa clave de datos (DEK)
  const [encryptResponse] = await kmsClient.encrypt({
    name: keyName,
    plaintext: dek,
  });
  const encryptedDek = encryptResponse.ciphertext;

  // 3. Usa la DEK en texto plano para cifrar el payload localmente
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, dek, iv);
  let encryptedData = cipher.update(JSON.stringify(payload), "utf8", "hex");
  encryptedData += cipher.final("hex");
  const authTag = cipher.getAuthTag();

  // 4. Prepara el objeto para enviar, con la DEK ya cifrada
  return {
    encryptedData,
    iv: iv.toString("hex"),
    authTag: authTag.toString("hex"),
    encryptedDek: encryptedDek.toString("base64"),
  };
}

module.exports = {
  cifrarPayload,
};
