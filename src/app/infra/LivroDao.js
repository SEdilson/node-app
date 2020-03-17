class LivroDao {
    constructor(db) {
        this._db = db
    }

    adiciona(book) {
        return new Promise((resolve, reject) => {
            this._db.run(`
            INSERT INTO livros (
                titulo,
                preco,
                descricao
            ) values (?,?,?)
            `,
            [
                book.titulo,
                book.preco,
                book.descricao
            ],
            (error) => {
                if(error) {
                    console.log(error)
                    return reject('Unable to create book')
                }

                resolve()
            })
        })
    }

    buscaPorId(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `SELECT * FROM livros WHERE id = ?`,
                [id],
                (error, book) => {
                    if(error) return reject('Unable to find book')

                    return resolve(book)
                }
            )
        })
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                (error, result) => {
                    if (error) return reject('Unable to find the books')

                    return resolve(result)
                }
            )  
        })
    }

    atualiza(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `UPDATE livros SET titulo = ?,
                preco = ?,
                descricao = ? WHERE id = ?`,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao,
                    livro.id
                ],
                (error) => {
                    if(error) return reject('Unable to update book')

                    resolve()
                })
        })
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `DELETE FROM livros WHERE id = ?`,
                [id],
                (error) => {
                    if(error) return reject('Unable to delete the book')

                    resolve()
                }
            )
        })
    }
}

module.exports = LivroDao;