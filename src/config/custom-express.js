require('marko/node-require').install();
require('marko/express');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.use('/estatico', express.static('src/app/public'))

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(methodOverride((req, res) => {
    if(req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

const sessaoAutenticacao = require('./sessao-autenticacao')
sessaoAutenticacao(app)

const routes = require('../app/routes/routes.js')
routes(app)

app.use((req, resp, next) => {
    return resp.status(404).marko(
        require('../app/views/erros/404.marko')
    )
})

app.use((error, req, resp, next) => {
    return resp.status(500).marko(
        require('../app/views/erros/500.marko')
    )
})

module.exports = app