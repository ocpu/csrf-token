'use strict'

const assert = require('assert')

const urlSafeHash = str =>
  require('crypto')
    .createHash('sha1')
    .update(str, 'utf8')
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
const chars = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y',

  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y',

  0, 1, 2, 3, 4, 5, 6, 7, 8, 9
]

module.exports = {
  /**
   * Create a CSRF token asynchronously.
   * 
   * @param {string} secret The secret to encrypt.
   * @param {number} [saltLength=8] The length of the generated salt.
   * @param {function(Error, string)} [callback] A function with the generated token.
   * @returns {(void|Promise<string>)} Returns void if callback is specified otherwise returns a promise with the generated token.
   */
  create(secret, saltLength = 8, callback) {
    if (typeof callback === 'function' || typeof saltLength === 'function') process.nextTick(() => {
      if (typeof saltLength === 'function') { callback = saltLength; saltLength = 8 }
      try { callback(void 0, this.createSync(secret, saltLength)) } catch (e) { callback(e) }
    }); else return new Promise((resolve, reject) => {
      try { resolve(this.createSync(secret, saltLength)) } catch (e) { reject(e) }
    })
  },
  /**
   * Create a CSRF token synchronously.
   * 
   * @param {string} secret The secret to encrypt.
   * @param {number} [saltLength=8] The length of the generated salt.
   * @returns {string} Returns the generated token.
   */
  createSync(secret, saltLength = 8) {
    assert(typeof secret === 'string', 'Secret must be a string')
    assert(typeof saltLength === 'number', 'Salt length must be a number')
    assert(secret.length !== 0, 'Why do you hate secrets? (the secret length is 0)')
    assert(saltLength !== 0, 'Now I am really salty! (salt length is 0)')
    const salt = new Array(saltLength)
      .fill(void 0)
      .map(() => chars[(Math.random() * chars.length) | 0])
      .join('')
    return `${salt}-${urlSafeHash(`${salt}-${secret}`)}`
  },
  /**
   * Verify CSRF token asynchronously.
   * 
   * @param {string} secret The secret that was supposadly encrypted.
   * @param {string} token The token that hopefully is the secret in a encrypted form.
   * @param {function(boolean)} [callback] A function with the result of the verification.
   * @returns {(void|Promise<boolean>)} Returns void if callback is specified otherwise returns a promise with the result of the verification.
   */
  verify(secret, token, callback) {
    if (typeof callback === 'function') process.nextTick(() => callback(this.verifySync(secret, token)))
    else return new Promise(resolve => resolve(this.verifySync(secret, token)))
  },
  /**
   * Verify CSRF token synchronously.
   * 
   * @param {string} secret The secret that was supposadly encrypted.
   * @param {string} token The token that hopefully is the secret in a encrypted form.
   * @returns {boolean} Returns a boolean if they match or not.
   */
  verifySync(secret, token) {
    if (!~token.indexOf('-')) return false
    const salt = token.substring(0, token.indexOf('-'))
    const expected = `${salt}-${urlSafeHash(`${salt}-${secret}`)}`
    return expected === token
  }
}
