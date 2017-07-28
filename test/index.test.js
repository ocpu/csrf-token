const expect = require('expect.js')

const csrf = require('../')

const secret = 'I love tests'

describe('Creates a token', () => {
    it('synchronously', () => {
        const token = csrf.createSync(secret, 8)
        expect(token).to.be.a('string')
        expect(token.length).to.be(36)
    })
    it('asynchronously with a callback', done => {
        csrf.create(secret, 8, (_, token) => {
            expect(token).to.be.a('string')
            expect(token.length).to.be(36)
            done()
        })
    })
    it('asynchronously with a promise', done => {
        csrf.create(secret, 8).then(token => {
            expect(token).to.be.a('string')
            expect(token.length).to.be(36)
            done()
        })
    })
})
describe('Fails to create a token', () => {
    it('because secret is not a string', () => {
        expect(() => csrf.createSync(0)).to.throwException(/Secret must be a string/)
        expect(() => csrf.createSync(true)).to.throwException(/Secret must be a string/)
        expect(() => csrf.createSync(false)).to.throwException(/Secret must be a string/)
        expect(() => csrf.createSync(() => {})).to.throwException(/Secret must be a string/)
        expect(() => csrf.createSync({})).to.throwException(/Secret must be a string/)
        expect(() => csrf.createSync([])).to.throwException(/Secret must be a string/)
    })
    it('because secret is a string with nothing in it', () => {
        expect(() => csrf.createSync('')).to.throwException(/Why do you hate secrets\? \(the secret length is 0\)/)
    })
    it('because saltLength is not a number', () => {
        expect(() => csrf.createSync(secret, '')).to.throwException(/Salt length must be a number/)
        expect(() => csrf.createSync(secret, true)).to.throwException(/Salt length must be a number/)
        expect(() => csrf.createSync(secret, false)).to.throwException(/Salt length must be a number/)
        expect(() => csrf.createSync(secret, () => {})).to.throwException(/Salt length must be a number/)
        expect(() => csrf.createSync(secret, {})).to.throwException(/Salt length must be a number/)
        expect(() => csrf.createSync(secret, [])).to.throwException(/Salt length must be a number/)
    })
    it('because saltLength is 0', () => {
        expect(() => csrf.createSync(secret, 0)).to.throwException(/Now I am really salty! \(salt length is 0\)/)
    })
    describe('asynchronously with callback', () => {
        it('because secret is not a string', done => {
            csrf.create(0, void 0, err => {
                expect(err.message).to.eql('Secret must be a string')
                csrf.create(true, void 0, err => {
                    expect(err.message).to.eql('Secret must be a string')
                    csrf.create(false, void 0, err => {
                        expect(err.message).to.eql('Secret must be a string')
                        csrf.create(() => {}, void 0, err => {
                            expect(err.message).to.eql('Secret must be a string')
                            csrf.create({}, void 0, err => {
                                expect(err.message).to.eql('Secret must be a string')
                                csrf.create([], void 0, err => {
                                    expect(err.message).to.eql('Secret must be a string')
                                    done()
                                })
                            })
                        })
                    })
                })
            })
        })
        it('because secret is a string with nothing in it', done => {
            csrf.create('', void 0, err => {
                expect(err.message).to.eql('Why do you hate secrets? (the secret length is 0)')
                done()
            })
        })
        it('because saltLength is not a number', done => {
            csrf.create(secret, 0, err => {
                expect(err.message).to.eql('Salt length must be a number')
                csrf.create(secret, true, err => {
                    expect(err.message).to.eql('Salt length must be a number')
                    csrf.create(secret, false, err => {
                        expect(err.message).to.eql('Salt length must be a number')
                        csrf.create(secret, () => {}, err => {
                            expect(err.message).to.eql('Salt length must be a number')
                            csrf.create(secret, {}, err => {
                                expect(err.message).to.eql('Salt length must be a number')
                                csrf.create(secret, [], err => {
                                    expect(err.message).to.eql('Salt length must be a number')
                                    done()
                                })
                            })
                        })
                    })
                })
            })
        })
        it('because saltLength is 0', done => {
            csrf.create(secret, 0, err => {
                expect(err.message).to.eql('Now I am really salty! (salt length is 0)')
                done()
            })
        })
    })
    describe('asynchronously with promise', () => {
        it('because secret is not a string', () => {
            return Promise.all([
                csrf.create(0).catch(err => expect(err.message).to.eql('Secret must be a string')),
                csrf.create(true).catch(err => expect(err.message).to.eql('Secret must be a string')),
                csrf.create(false).catch(err => expect(err.message).to.eql('Secret must be a string')),
                csrf.create(() => {}).catch(err => expect(err.message).to.eql('Secret must be a string')),
                csrf.create({}).catch(err => expect(err.message).to.eql('Secret must be a string')),
                csrf.create([]).catch(err => expect(err.message).to.eql('Secret must be a string'))
            ])
        })
        it('because secret is a string with nothing in it', () => {
            return csrf.create('').catch(err => expect(err.message).to.eql('Why do you hate secrets? (the secret length is 0)'))
        })
        it('because saltLength is not a number', () => {
            return Promise.all([
                csrf.create(secret, 0).catch(err => expect(err.message).to.eql('Salt length must be a number')),
                csrf.create(secret, true).catch(err => expect(err.message).to.eql('Salt length must be a number')),
                csrf.create(secret, false).catch(err => expect(err.message).to.eql('Salt length must be a number')),
                csrf.create(secret, () => {}).catch(err => expect(err.message).to.eql('Salt length must be a number')),
                csrf.create(secret, {}).catch(err => expect(err.message).to.eql('Salt length must be a number')),
                csrf.create(secret, []).catch(err => expect(err.message).to.eql('Salt length must be a number'))
            ])
        })
        it('because saltLength is 0', () => {
            return csrf.create(secret, 0).catch(err => expect(err.message).to.eql('Now I am really salty! (salt length is 0)'))
        })
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
