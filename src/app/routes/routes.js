const LivroDao = require('../infra/LivroDao')
const db = require('../../config/database')
const { check, validationResult } = require('express-validator')

module.exports = (app) => {
    app.get('/', (req, resp) => {
        resp.marko(require('../views/base/home/home.marko'))
    })
    
    app.get('/livros', (req, resp) => {

        const livroDao = new LivroDao(db)
        livroDao.lista()
                .then(books => {
                    resp.marko(
                        require('../views/livros/lista/lista.marko'),
                        {
                            livros: books
                        }
                    )        
                })
                .catch(error => console.log(error))
    })

    app.get('/livros/form', (req, resp) => {
        resp.marko(require('../views/livros/form/form.marko'), { livro: {} })
    })

    app.post('/livros', [
        check('titulo').isLength({ min: 5 }).withMessage('O título precisa ter no mínimo 5 caracteres'),
        check('preco').isCurrency().withMessage('O preço precisa ter um valor númerico')
    ], (req, resp) => {
        const errors = validationResult(req)
        
        if(!errors.isEmpty()) {
            return resp.marko(
                require('../views/livros/form/form.marko'),
                { 
                    livro: req.body,
                    errosValidacao: errors.array()
                }
            )
        }
        const livroDao = new LivroDao(db)
        livroDao.adiciona(req.body)
                .then(resp.redirect('/livros'))
                .catch(error => console.log(error))
    })

    app.put('/livros', (req, resp) => {
        console.log(req.body)
        const livroDao = new LivroDao(db)
        livroDao.atualiza(req.body)
                .then(resp.redirect('/livros'))
                .catch(error => console.log(error))
    })

    app.get('/livros/form/:id', (req, resp) => {
        const livroDao = new LivroDao(db)
        livroDao.buscaPorId(req.params.id)
                .then(book => {
                    resp.marko(
                        require('../views/livros/form/form.marko'),
                        {
                           livro: book
                        }
                    )        
                })
                .catch(error => console.log(error))
    })

    app.delete('/livros/:id', (req, resp) => {
        const livroDao = new LivroDao(db)
        livroDao.remove(req.params.id)
                .then(() => resp.status(200).end())
                .catch((error) => console.log(error))
    })
}