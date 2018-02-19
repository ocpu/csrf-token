# CSRF Token
[![CircleCI](https://img.shields.io/circleci/project/github/ocpu/csrf-token.svg?style=flat-square)](https://circleci.com/gh/ocpu/csrf-token)
[![Codecov](https://img.shields.io/codecov/c/github/ocpu/csrf-token.svg?style=flat-square)](https://codecov.io/gh/ocpu/csrf-token)
[![npm](https://img.shields.io/npm/v/csrf-token.svg?style=flat-square)](https://www.npmjs.com/package/csrf-token)
[![License](https://img.shields.io/npm/l/brev.svg?style=flat-square)](https://github.com/ocpu/csrf-token/blob/master/License)

Create and verify csrf tokens

## Functions
<details>
  <summary>TOC</summary>
  <ul>
    <li><a href="#createsecret--saltlength--callback">create(secret [, saltLength [, callback]])</a></li>
    <li><a href="#createsyncsecret-saltlength">createSync(secret, [saltLength])</a></li>
    <li><a href="#verifysecret-token--callback">verify(secret, token [, callback])</a></li>
    <li><a href="#verifysyncsecret-token">verifySync(secret, token)</a></li>
  </ul>
</details>

```js
const csrf = require('csrf-token')
```

### create(secret [, saltLength [, callback]])

1. `create(secret: string, saltLength?: number): Promise<string>`
2. `create(secret: string, saltLength: number, callback: (error: Error, token: string) => void): void`
3. `create(secret: string, callback: (error: Error, token: string) => void): void`

- `secret` The secret to encrypt.
- `saltLength` The length of the generated salt. __Default:__ `8`
- `callback` A function with the generated token.
- Returns void if callback is specified otherwise returns a promise with the generated token.

Create a CSRF token asynchronously.
```js
csrf.create('I like CSRF it makes me feel whole').then(token => {
  console.log(`Look at my fancy CSRF token '${token}'`)
})
csrf.create('I want to make my app safer', (err, token) => {
  if (err) console.error(err)
  else console.log(`Hey I got this from a promise '${token}'`)
})
```
[[Back to top]](#csrf-token)

### createSync(secret, [saltLength])

1. `createSync(secret: string, saltLength?: number): string`

- `secret` The secret to encrypt.
- `saltLength` The length of the generated salt. __Default:__ `8`
- Returns the generated token.

Create a CSRF token synchronously.
```js
const token = csrf.createSync('I like secure forms')
console.log(`I am running out of ideas but here is a token '${token}'`)
```
[[Back to top]](#csrf-token)

### verify(secret, token [, callback])

1. `verify(secret: string, token: string): Promise<boolean>`
2. `verify(secret: string, token: string, callback: (matches: boolean) => void): void`

- `secret` The secret that was supposadly encrypted.
- `token` The token that hopefully is the secret in a encrypted form.
- `callback` A function with the result of the verification.
- Returns void if callback is specified otherwise returns a promise with the result of the verification.

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
[[Back to top]](#csrf-token)

### verifySync(secret, token)

1. `verifySync(secret: string, token: string): boolean`

- `secret` The secret that was supposadly encrypted.
- `token` The token that hopefully is the secret in a encrypted form.
- Returns a boolean if the match or not.

Verify CSRF token synchronously.

```js
const matches = csrf.verifySync(secret, token)

if (matches) console.log('Ooooo yeah!')
else console.log('B-b-but why? ;-;')
```
[[Back to top]](#csrf-token)

## Lisence
[MIT Lisenced](https://github.com/ocpu/csrf-token/blob/master/Lisence)
