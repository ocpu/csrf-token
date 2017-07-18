const express = require('express')
const csrfProtection = require('.').express('Hello')

const app = express()

app.use(require('body-parser').urlencoded({ extended: true }))

app.get('/', csrfProtection, (req, res) => {
    const html = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Test</title>
    </head>
    <body>
        <form method="POST" action="/">
            <input type="hidden" name="_csrf-token" value="${req.csrfToken()}">
            <input type="text" name="text">
            <input type="submit" value="Submit"
        </form>
    </body>
</html>`
    res.setHeader('content-type', 'text/html; charset=utf8')
    res.setHeader('content-length', html.length.toString())
    res.status(200)
    res.write(new Buffer(html))
    res.end()
})

app.post('/', csrfProtection, (req, res) => {
    req.on('data', console.log)
    req.on('end', () => console.log('end of data'))
    console.log('Got post')
})

require('http').createServer(app).listen(2000)
