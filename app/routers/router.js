const express = require(`express`);

const adminController = require(`../controllers/adminController`);

const routerWrapper = require(`../handlers/routerWrapper`);

const authenticateToken = require(`../middleware/authenticateToken`);

const router = express.Router();

router.post(`/signup`, routerWrapper(adminController.signup));
router.post(`/login`, routerWrapper(adminController.login));
router.get(`/admin`, authenticateToken, routerWrapper(adminController.isConnect));

module.exports = router;
