const jwt = require('jsonwebtoken')

const secret = 'FG_WEB#+QQ:1321219448'

const createToken = (payload, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn })
}

const verifyToken = (token) => {
  try {
    return {
      token: true,
      data: jwt.verify(token, secret)
    }
  } catch (err) {
    return {
      token: false,
      data: err
    }
  }
}

module.exports = {
  createToken,
  verifyToken
}
