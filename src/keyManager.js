const crypto = require("crypto");

// Legacy: RSA-2048 keypair generation for signing auth tokens. RSA is
// the headline "quantum-breakable" algorithm CIP exists to find and
// migrate -- the PQC replacement here is ML-DSA (Dilithium).
function generateSigningKeyPair() {
  return crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
  });
}

function signPayload(payload, privateKey) {
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(payload);
  signer.end();
  return signer.sign(privateKey, "hex");
}

module.exports = { generateSigningKeyPair, signPayload };
