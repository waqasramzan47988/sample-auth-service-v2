const crypto = require("crypto");

// Legacy: SHA-1 for a session-token checksum -- collision-weak, kept
// here only because it was "good enough" when this service was first
// written.
function tokenChecksum(token) {
  const hash = crypto.createHash("sha1");
  hash.update(token);
  return hash.digest("hex");
}

// Legacy: 3DES (des-ede3-cbc) encrypting the session payload. No
// post-quantum migration path exists for a symmetric block cipher
// this small -- the real fix is swapping to AES-256-GCM.
function encryptSessionPayload(payload, key, iv) {
  const cipher = crypto.createCipheriv("des-ede3-cbc", key, iv);
  return cipher.update(payload, "utf8", "hex") + cipher.final("hex");
}

module.exports = { tokenChecksum, encryptSessionPayload };
