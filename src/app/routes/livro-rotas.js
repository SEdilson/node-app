const LivroControlador = require('../controladores/LivroControlador')
const livroControlador = new LivroControlador()

const BaseControlador = require('../controladores/BaseControlador')

const Livro = require('../modelos/Livro')

module.exports = (app) => {

    app.use(LivroControlador.rotas().autenticadas, (req, resp, next) => {
        if(req.isAuthenticated()) {
            next()
        } else {
            resp.redirect(BaseControlador.rotas().login)
        }
    })

    app.get(LivroControlador.rotas().lista, livroControlador.lista())

    app.route(LivroControlador.rotas().cadastro)
        .get(livroControlador.exibeFormTemplate())
        .post(Livro.validacoes(), livroControlador.adicionaLivro())
        .put(livroControlador.atualizaLivro())

    app.get(LivroControlador.rotas().edicao, livroControlador.buscaLivroPorId())

    app.delete(LivroControlador.rotas().delecao, livroControlador.removeLivro())
}