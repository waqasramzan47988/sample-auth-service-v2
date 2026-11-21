const crypto = require("crypto");

// Legacy: password hashing with MD5 -- fast, unsalted-friendly, and
// broken for this use case. CIP flags this as a legacy hash algorithm.
function hashPassword(password) {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
}

function verifyPassword(password, storedHash) {
  return hashPassword(password) === storedHash;
}

module.exports = { hashPassword, verifyPassword };
