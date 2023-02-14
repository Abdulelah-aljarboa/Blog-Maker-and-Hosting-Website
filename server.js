const express = require('express') // Needs an install
const mongoose = require('mongoose') // Needs an install
const morgan = require('morgan') // Needs an install
const bodyParser = require('body-parser') // Needs an install
const UserRoute = require('./routes/user') // Needs an install
const mainRoute = require('./routes/main')
const flash = require('connect-flash')
const session = require('express-session')
const BlogRoute = require('./routes/blog')
const methodoverride = require('method-override');
const path = require('path')
const publicDirPath = path.join(__dirname, '/views')
mongoose.set('strictQuery', true)
mongoose.connect('mongodb://127.0.0.1:27017/database', {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection;


db.on('error', (err) => {
    console.log(err);
})

db.once('open', () => {
    console.log('Database Connection Established');
})

const app = express(); // start the server


app.set("view engine", "ejs");
app.use(express.static(publicDirPath));

/* 
 morgan shows in the server console messages that are important about what is 
 happening with the requests, colored and all! 
 in the form -> :status :response-time ms - :res[content-length]
*/
app.use(session({
    secret: 'lorem ipsum',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60000 * 15}
}))
app.use(flash())
app.use(methodoverride('_method'))
app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')) //the first argument is a virtual path that does not reflect the real file structure
app.use('/api/user', UserRoute) // again the first is a virtual path to call when your using the website when you want to use UserRoute
app.use('/api/blog', BlogRoute)
app.use('/', mainRoute)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
    console.log(publicDirPath)
});

