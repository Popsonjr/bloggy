const mongodb = require('mongodb')
let port = process.env.PORT
if (port == null || port == "") {
    port = 8000
}

let con = "mongodb+srv://todoAppUser:popo2403@cluster0.gka4p.mongodb.net/blogTest?retryWrites=true&w=majority"

mongodb.connect(con, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, client) {
    module.exports = client
    const app = require('./server')
    app.listen(port)
})
