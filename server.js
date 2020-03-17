const app = require('./src/config/custom-express')

app.listen(3000, () => {
    console.log("Servidor escutando a porta 3000")
})