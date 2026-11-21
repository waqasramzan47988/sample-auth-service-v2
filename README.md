# sample-auth-service-v2

A small, deliberately out-of-date "auth service" used as a demo repo for
CIP Technologies' crypto discovery scan.

Every cryptographic call in `src/` uses a legacy, pre-quantum algorithm
on purpose, so that connecting this repo to CIP and running a scan
produces real findings to walk through:

| File | Algorithm | Why it's flagged |
|---|---|---|
| `src/passwordHasher.js` | MD5 (`node:crypto`) | Broken hash, used for passwords |
| `src/sessionTokens.js` | SHA-1 (`node:crypto`) | Collision-weak hash |
| `src/sessionTokens.js` | 3DES / `des-ede3-cbc` (`node:crypto`) | Weak symmetric cipher |
| `src/keyManager.js` | RSA-2048 keygen + RSA-SHA256 signing (`node:crypto`) | Not post-quantum safe |
| `src/legacyFileIntegrity.js` | MD5 + DES-CBC (`node-forge`) | Same issues via a second library |

This is demo/test code only -- it is not a real, secure authentication
service and should never be used as one.
