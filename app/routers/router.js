const express = require(`express`);

const adminController = require(`../controllers/adminController`);

const routerWrapper = require(`../handlers/routerWrapper`);

const router = express.Router();

router.post(`/signup`, routerWrapper(adminController.signup));
router.post(`/login`, routerWrapper(adminController.login));

module.exports = router;
