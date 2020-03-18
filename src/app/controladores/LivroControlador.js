const LivroDao = require('../infra/LivroDao')

class LivroControlador {

    lista() {
        return (req, resp) => {

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
        }
    }
}

module.exports = LivroControlador