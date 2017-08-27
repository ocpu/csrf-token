# CSRF Token

[![Greenkeeper badge](https://badges.greenkeeper.io/ocpu/csrf-token.svg)](https://greenkeeper.io/)
[![CircleCI](https://img.shields.io/circleci/project/github/ocpu/csrf-token.svg?style=flat-square)](https://circleci.com/gh/ocpu/csrf-token)
[![Codecov](https://img.shields.io/codecov/c/github/ocpu/csrf-token.svg?style=flat-square)](https://codecov.io/gh/ocpu/csrf-token)
[![npm](https://img.shields.io/npm/v/csrf-token.svg?style=flat-square)](https://www.npmjs.com/package/csrf-token)

Create and verify csrf tokens

## Functions

`const csrf = require('csrf-token')`

### create(secret [, saltLength [, callback]])
- `secret` \<String> The secret to encrypt.
- `saltLength` \<Number> The length of the generated salt. __Default:__ `8`
- `callback` \<Function> A function with the generated token.

Returns void if callback is specified otherwise returns a promise with the generated token.

Create a CSRF token asynchronously.
```js
csrf.create('I like CSRF it makes me feel whole', 8, (token) => {
    console.log(`Look at my fancy CSRF token '${token}'`)
})
csrf.create('I want to make my app safer').then((err, token) => {
    if (err) console.error(err)
    console.log(`Hey I got this from a promise '${token}'`)
})
```

### createSync(secret, [saltLength])
- `secret` \<String> The secret to encrypt.
- `saltLength` \<Number> The length of the generated salt. __Default:__ `8`

Returns the generated token.

Create a CSRF token synchronously.
```js
const token = csrf.createSync('I like secure forms')
console.log(`I am running out of ideas but here is a token '${token}'`)
```

### verify(secret, token [, callback])
- `secret` \<String> The secret that was supposadly encrypted.
- `token` \<String> The token that hopefully is the secret in a encrypted form.
- `callback` \<Function> A function with the result of the verification.

Returns void if callback is specified otherwise returns a promise with the result of the verification.

Verify CSRF token asynchronously.

```js
csrf.verify(secret, token, (matches) => {
    if (matches) console.log('They match!')
    else console.log('They don\'t they match?')
})
csrf.verify(secret, token).then((matches) => {
    if (matches) console.log('Yes!')
    else console.log('What?!')
})
```

### verifySync(secret, token)
- `secret` \<String> The secret that was supposadly encrypted.
- `token` \<String> The token that hopefully is the secret in a encrypted form.

Returns a boolean if the match or not.

Verify CSRF token synchronously.

```js
const matches = csrf.verifySync(secret, token)

if (matches) console.log('Ooooo yeah!')
else console.log('B-b-but why? ;-;')
```

## Lisence
[MIT Lisenced](https://github.com/ocpu/csrf-token/blob/master/Lisence)
