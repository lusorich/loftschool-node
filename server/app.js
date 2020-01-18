const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const expressHbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const adminRoutes = require('./routes/admin');
const loginRoutes = require('./routes/login');
const mainRoutes = require('./routes/main');

const multer = require('multer');
const upload = multer({ dest: 'public/assets/img/products' });

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join('public', 'assets', 'img'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const flash = require('connect-flash');

const rootDir = require('./util/path');

const app = express();

app.engine('hbs', expressHbs({ defaultLayout: 'main-layout', extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(flash());
app.use(cookieParser());
app.use(
  session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 3600 * 24 }
  })
);
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));
app.use(multer({ storage: storageConfig }).single('photo'));

app.use('/admin', adminRoutes);
app.use('/login', loginRoutes);
app.use('/', mainRoutes);

app.listen(3030);
