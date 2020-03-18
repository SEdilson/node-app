const templates = require('../views/templates')

class BaseControlador {

    static rotas() {
        return {
            home: '/'
        }
    }

    exibeHomeTemplate() {
        return (req, resp) => {
            resp.marko(templates.base.home)
        }
    }

}

module.exports = BaseControlador