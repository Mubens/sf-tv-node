const jwt = require('jsonwebtoken')

const secret = 'FG_WEB#+QQ:1321219448'

class Jwt {
  constructor(payload, expiresIn) {
    this.token = jwt.sign(payload, secret, { expiresIn })
  }

  static verify(token) {
    try {
      return { token: true, data: jwt.verify(token, secret) }
    } catch (err) {
      return { token: false, data: err }
    }
  }

  toString() {
    return this.token
  }
}

module.exports = Jwt
