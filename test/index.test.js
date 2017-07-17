const expect = require('expect.js')

const csrf = require('../')

const secret = 'I love tests'

describe('Creates a token', () => {
    it('synchronously', () => {
        const token = csrf.createSync(secret, 8)
        expect(token).to.be.a('string')
    })
    it('asynchronously with a callback', done => {
        csrf.create(secret, 8, token => {
            expect(token).to.be.a('string')
            done()
        })
    })
    it('asynchronously with a promise', done => {
        csrf.create(secret, 8).then(token => {
            expect(token).to.be.a('string')
            done()
        })
    })
})
describe('Fails to create a token', () => {
    it('because secret is not a string', () => {
        expect(() => csrf.create(0)).to.throwException(/Secret must be a string/)
        expect(() => csrf.create(true)).to.throwException(/Secret must be a string/)
        expect(() => csrf.create(false)).to.throwException(/Secret must be a string/)
        expect(() => csrf.create(() => {})).to.throwException(/Secret must be a string/)
        expect(() => csrf.create({})).to.throwException(/Secret must be a string/)
        expect(() => csrf.create([])).to.throwException(/Secret must be a string/)
    })
    it('because secret is a string with nothing in it', () => {
        expect(() => csrf.create('')).to.throwException(/Why do you hate secrets\? \(the secret length is 0\)/)
    })
    it('because saltLength is not a number', () => {
        expect(() => csrf.create(secret, '')).to.throwException(/Salt length must be a number/)
        expect(() => csrf.create(secret, true)).to.throwException(/Salt length must be a number/)
        expect(() => csrf.create(secret, false)).to.throwException(/Salt length must be a number/)
        expect(() => csrf.create(secret, () => {})).to.throwException(/Salt length must be a number/)
        expect(() => csrf.create(secret, {})).to.throwException(/Salt length must be a number/)
        expect(() => csrf.create(secret, [])).to.throwException(/Salt length must be a number/)
    })
    it('because saltLength is 0', () => {
        expect(() => csrf.create(secret, 0)).to.throwException(/Now I am really salty! \(salt length is 0\)/)
    })
})
describe('Verifies a token', () => {
    let token
    beforeEach(() => {
        token = csrf.createSync(secret, 8)
    })
    it('synchronously', () => {
        expect(csrf.verifySync(secret, token)).to.be.truthly
    })
    it('asynchronously with a callback', done => {
        csrf.verify(secret, token, matches => {
            expect(matches).to.be.truthly
            done()
        })
    })
    it('asynchronously with a promise', done => {
        csrf.verify(secret, token).then(matches => {
            expect(matches).to.be.truthly
            done()
        })
    })
})
