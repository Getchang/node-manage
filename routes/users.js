'use strict';

import express from 'express';
import Admin from '../controller/admin/admin'
const router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
// router.get('/login', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/login', Admin.login);
router.post('/register', Admin.register);

export default router;
