const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const expressHbs = require('express-handlebars');
const fileUpload = require('express-fileupload');

const adminRoutes = require('./routes/admin');
const loginRoutes = require('./routes/login');
const mainRoutes = require('./routes/main');

const rootDir = require('./util/path');

const app = express();

app.engine('hbs', expressHbs({ defaultLayout: 'main-layout', extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(fileUpload());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminRoutes);
app.use('/login', loginRoutes);
app.use('/', mainRoutes);

app.listen(3030);
