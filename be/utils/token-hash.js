const crypto = require('crypto')

module.exports = {
  hashToken(token) {
    return crypto
      .createHash('sha256')
      .update(token)
      .digest('hex')
  }
}