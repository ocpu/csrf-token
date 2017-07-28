const assert = require('assert')
const createError = require('http-errors')
const { serialize: serializeCookie, parse: parseCookie } = require('cookie')

const includes = (array, item) => !!~array.indexOf(item)
const urlSafeHash = str => require('crypto')
        .createHash('sha1')
        .update(str, 'utf8')
        .digest('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/\=/g, '')
const chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y',
               'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y',
                0,   1,   2,   3,   4,   5,   6,   7,   8,   9]
const createSalt = length => new Array(length).fill(void 0).map(() => chars[(Math.random() * chars.length) | 0]).join('')
/**
 * 
 * @param {string} secret 
 * @param {string} salt 
 * @private
 */
const createToken = (secret, salt) => `${salt}-${urlSafeHash(`${salt}-${secret}`)}`

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
        if (callback) {
            if (typeof secret !== 'string') callback(new Error('Secret must be a string'))
            if (typeof saltLength !== 'number') callback(new Error('Salt length must be a number'))
            if (secret.length === 0) callback(new Error('Why do you hate secrets? (the secret length is 0)'))
            if (saltLength === 0) callback(new Error('Now I am really salty! (salt length is 0)'))
            process.nextTick(() => callback(void 0, createToken(secret, createSalt(saltLength))))
        } else return new Promise((resolve, reject) => {
            if (typeof secret !== 'string') reject(new Error('Secret must be a string'))
            if (typeof saltLength !== 'number') reject(new Error('Salt length must be a number'))
            if (secret.length === 0) reject(new Error('Why do you hate secrets? (the secret length is 0)'))
            if (saltLength === 0) reject(new Error('Now I am really salty! (salt length is 0)'))
            resolve(createToken(secret, createSalt(saltLength)))
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
        return createToken(secret, createSalt(saltLength))
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
        if (!includes(token, '-')) return false
        if (callback) process.nextTick(() => {
            const salt = token.substring(0, token.indexOf('-'))
            const expected = createToken(secret, salt)
            callback(expected === token)
        })
        else return new Promise(resolve => {
            const salt = token.substring(0, token.indexOf('-'))
            const expected = createToken(secret, salt)
            resolve(expected === token)
        })
    },
    /**
     * Verify CSRF token synchronously.
     * 
     * @param {string} secret The secret that was supposadly encrypted.
     * @param {string} token The token that hopefully is the secret in a encrypted form.
     * @returns {boolean} Returns a boolean if they match or not.
     */
    verifySync(secret, token) {
        if (!includes(token, '-')) return false
        const salt = token.substring(0, token.indexOf('-'))
        const expected = createToken(secret, salt)
        return expected === token
    }
}
