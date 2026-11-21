const { hashPassword, verifyPassword } = require("./passwordHasher");
const { tokenChecksum, encryptSessionPayload } = require("./sessionTokens");
const { generateSigningKeyPair, signPayload } = require("./keyManager");
const { fileChecksum, encryptCachedFile } = require("./legacyFileIntegrity");

// Minimal "auth service" demo app wiring the legacy-crypto modules
// together -- not a real, runnable auth backend, just enough shape for
// a cryptographic-inventory scan to walk through.
function demo() {
  const hashed = hashPassword("correct horse battery staple");
  console.log("password hash:", hashed, verifyPassword("correct horse battery staple", hashed));

  console.log("token checksum:", tokenChecksum("session-abc123"));

  const { publicKey, privateKey } = generateSigningKeyPair();
  console.log("signature:", signPayload("payload", privateKey).slice(0, 16), "...");

  console.log("file checksum:", fileChecksum("file bytes"));
}

module.exports = { demo };
