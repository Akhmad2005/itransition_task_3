const crypto = require('crypto');

class KeyGenerator {
  static generateKey(length = 32) {
    return crypto.randomBytes(length);
  }
}

module.exports = KeyGenerator;