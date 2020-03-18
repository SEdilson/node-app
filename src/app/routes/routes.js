const { check } = require('express-validator')

const LivroControlador = require('../controladores/LivroControlador')
const livroControlador = new LivroControlador()

const BaseControlador = require('../controladores/BaseControlador')
const baseControlador = new BaseControlador()

module.exports = (app) => {
    app.get(BaseControlador.rotas().home, baseControlador.exibeHomeTemplate())
    
    app.get(LivroControlador.rotas().lista, livroControlador.lista())

    app.get(LivroControlador.rotas().cadastro, livroControlador.exibeFormTemplate())

    app.post(LivroControlador.rotas().lista, [
        check('titulo').isLength({ min: 5 }).withMessage('O título precisa ter no mínimo 5 caracteres'),
        check('preco').isCurrency().withMessage('O preço precisa ter um valor númerico')
    ], livroControlador.adicionaLivro())

    app.put(LivroControlador.rotas().lista, livroControlador.atualizaLivro())

    app.get(LivroControlador.rotas().edicao, livroControlador.buscaLivroPorId())

    app.delete(LivroControlador.rotas().delecao, livroControlador.removeLivro())
}