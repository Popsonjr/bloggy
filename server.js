let express = require("express")
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const bodyParser = require('body-parser')
const flash = require('connect-flash')
let app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
const db = require('./db').db()
const router = require('./router.js')


// app.use(express.json())

// make folder available from the root of server
app.use(express.static('public'))

// app.use(express.urlencoded({extended: false}))
app.set('views', 'views')
app.set('view engine', 'ejs')

let sessionOptions = session({
    secret: "can be anything o",
    store: new MongoStore({client: require('./db')}),
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 12, httpOnly: true}
})

app.use(sessionOptions)
app.use(flash())


app.use('/', router)



// app.post('/create', (req, res) => {
//     let safeTitle = sanitizeHTML(req.body.title, {allowedTags: [], allowedAttributes: {}})
//     let safeDescription = sanitizeHTML(req.body.description, {allowedTags: [], allowedAttributes: {}})
//     let safeCategory = sanitizeHTML(req.body.category, {allowedTags: [], allowedAttributes: {}})
//     let safeDate = sanitizeHTML(req.body.date, {allowedTags: [], allowedAttributes: {}})
//     db.collection('posts').insertOne({title: safeTitle, description: safeDescription, category: safeCategory, date: safeDate}, (err, info) => {
//         res.json(info.ops[0])
//     })
// })

// app.post('/edit', (req, res) => {
//     let safeTitle = sanitizeHTML(req.body.title, {allowedTags: [], allowedAttributes: {}})
//     let safeDescription = sanitizeHTML(req.body.description, {allowedTags: [], allowedAttributes: {}})
//     let safeCategory = sanitizeHTML(req.body.category, {allowedTags: [], allowedAttributes: {}})
//     let safeDate = sanitizeHTML(req.body.date, {allowedTags: [], allowedAttributes: {}})

//     db.collection('posts').findOneAndUpdate({_id: new mongodb.ObjectId(req.body.id)}, {$set: {title: safeTitle, category:safeCategory, description: safeDescription, date: safeDate}}, () => {
//         res.send("edited")
       
//     })
// })

// app.post('/delete', (req, res) => {
//     db.collection('posts').deleteOne({_id: new mongodb.ObjectId(req.body.id)}, () => {
//         res.send("deleted")
//     })
// })

module.exports = app