const db = require('../../config/database')
const LivroDao = require('../infra/LivroDao')

const { validationResult } = require('express-validator')

const templates = require('../views/templates')
const formTemplate = templates.livros.form

class LivroControlador {

    static rotas() {
        return {
            lista: '/livros',
            cadastro: '/livros/form',
            edicao: '/livros/form/:id',
            delecao: '/livros/:id'
        }
    }

    lista() {
        return (req, resp) => {
            const livroDao = new LivroDao(db)
            livroDao.lista()
                    .then(books => {
                        resp.marko(
                            templates.livros.lista,
                            {
                                livros: books
                            }
                        )        
                    })
                    .catch(error => console.log(error))
        }
    }

    adicionaLivro() {
        return (req, resp) => {
            const errors = validationResult(req)
            
            if(!errors.isEmpty()) {
                return resp.marko(
                    formTemplate,
                    { 
                        livro: req.body,
                        errosValidacao: errors.array()
                    }
                )
            }
            const livroDao = new LivroDao(db)
            livroDao.adiciona(req.body)
                    .then(resp.redirect(LivroControlador.rotas().lista))
                    .catch(error => console.log(error))
        }
    }

    atualizaLivro() {
        return (req, resp) => {
            const livroDao = new LivroDao(db)
            livroDao.atualiza(req.body)
                    .then(resp.redirect(LivroControlador.rotas().lista))
                    .catch(error => console.log(error))
        }
    }

    buscaLivroPorId() {
        return (req, resp) => {
            const livroDao = new LivroDao(db)
            livroDao.buscaPorId(req.params.id)
                    .then(book => {
                        resp.marko(
                            formTemplate,
                            {
                               livro: book
                            }
                        )        
                    })
                    .catch(error => console.log(error))
        }
    }

    removeLivro() {
        return (req, resp) => {
            const livroDao = new LivroDao(db)
            livroDao.remove(req.params.id)
                    .then(() => resp.status(200).end())
                    .catch((error) => console.log(error))
        }
    }

    exibeFormTemplate() {
        return (req, resp) => {
            resp.marko(formTemplate, { livro: {} })
        }
    }
}

module.exports = LivroControlador