const express = require(`express`);
const adminController = require(`../controllers/adminController`);
const adminReportingController = require(`../controllers/adminReportingController`);
const routerWrapper = require(`../handlers/routerWrapper`);
const { schemaCreateAdmin } = require(`../validation/schema/createAdminSchema`);
const { validateCreateAdmin } = require(`../validation/validations`);
const authenticateToken = require(`../middleware/authenticateToken`);
const router = express.Router();

router.post(`/signup`, validateCreateAdmin(schemaCreateAdmin), routerWrapper(adminController.signup));
router.post(`/login`, routerWrapper(adminController.login));
router.post(`/reporting/mairie/:id`, authenticateToken, routerWrapper(adminReportingController.allReporting));

// route de test
router.get(`/admin`, authenticateToken, routerWrapper(adminController.isConnect));

module.exports = router;
