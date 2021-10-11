import express from 'express';
import users from './users.js'
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

export default app => {
  app.use('/', router)
  app.use('/users', users)
}
