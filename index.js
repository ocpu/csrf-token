const assert = require('assert')

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
const createSalt = length => new Array(length).fill(void 0, 0, length).map(() => chars[(Math.random() * chars.length) | 0]).join('')
const createToken = (secret, salt) => `${salt}-${urlSafeHash(`${salt}-${secret}`)}`

module.exports = {
    /**
     * Create a csrf token asynchronously.
     * 
     * @param {string} secret The secret to encrypt
     * @param {number} [saltLength=8]
     * @param {function(string)} [callback] If not specified returns a promise with the result
     * @returns {(void|Promise<string>)} 
     */
    create(secret, saltLength = 8, callback) {
        assert(typeof secret === 'string', 'Secret must be a string')
        assert(typeof saltLength === 'number', 'Salt length must be a number')
        assert(secret.length !== 0, 'Why do you hate secrets? (the secret length is 0)')
        assert(saltLength !== 0, 'Now I am really salty! (salt length is 0)')
        if (callback) process.nextTick(() => callback(createToken(secret, createSalt(saltLength))))
        else return new Promise(resolve =>    resolve(createToken(secret, createSalt(saltLength))))
    },
    /**
     * Create a csrf token synchronously.
     * 
     * @param {string} secret The secret to encrypt
     * @param {number} [saltLength=8]
     * @returns {string}
     */
    createSync(secret, saltLength = 8) {
        assert(typeof secret === 'string', 'Secret must be a string')
        assert(typeof saltLength === 'number', 'Salt length must be a number')
        assert(secret.length !== 0, 'Why do you hate secrets? (the secret length is 0)')
        assert(saltLength !== 0, 'Now I am really salty! (salt length is 0)')
        return createToken(secret, createSalt(saltLength))
    },
    /**
     * Varify if the token and secret match asynchronously.
     * 
     * @param {string} secret The secret that was supposadly encrypted
     * @param {string} token The token that hopefully is the secret in a encrypted form
     * @param {function(boolean)} [callback] If not specified then this returns a promise
     * @returns {(void|Promise<boolean>)}
     */
    verify(secret, token, callback) {
        if (!~token.indexOf('-')) return false
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
     * Varify if the token and secret match synchronously.
     * 
     * @param {string} secret The secret that was supposadly encrypted
     * @param {string} token The token that hopefully is the secret in a encrypted form
     * @returns {boolean}
     */
    verifySync(secret, token) {
        if (!~token.indexOf('-')) return false
        const salt = token.substring(0, token.indexOf('-'))
        const expected = createToken(secret, salt)
        return expected === token
    }
}
