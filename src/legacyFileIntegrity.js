const forge = require("node-forge");

// Legacy: node-forge MD5, used for an uploaded-file integrity check.
// A second code path the scanner also recognizes, so this repo
// demonstrates detection isn't limited to node:crypto.
function fileChecksum(bytes) {
  const md = forge.md.md5.create();
  md.update(bytes);
  return md.digest().toHex();
}

// Legacy: node-forge DES-CBC cipher, used to encrypt cached files at
// rest.
function encryptCachedFile(bytes, key, iv) {
  const cipher = forge.cipher.createCipher("DES-CBC", key);
  cipher.start({ iv });
  cipher.update(forge.util.createBuffer(bytes));
  cipher.finish();
  return cipher.output;
}

module.exports = { fileChecksum, encryptCachedFile };
