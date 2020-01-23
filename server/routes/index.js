const Router = require('koa-router');
const router = new Router();
const koaBody = require('koa-body');
const controllersIndex = require('../controllers/index');
const controllersLogin = require('../controllers/login');
const controllersAdmin = require('../controllers/admin');
const path = require('path');
const multer = require('@koa/multer');
const upload = multer({ dest: 'public/assets/img/products' });

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join('public', 'assets', 'img'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

router.get('/', controllersIndex.get);
router.post('/', koaBody(), controllersIndex.post);
router.get('/login', controllersLogin.get);
router.post('/login', koaBody(), controllersLogin.post);
router.get('/admin', controllersAdmin.admin);
router.post('/admin/skills', koaBody(), controllersAdmin.setSkills);
router.post(
  '/admin/upload',
  koaBody(),
  upload.single('photo'),
  controllersAdmin.upload
);

module.exports = router;
