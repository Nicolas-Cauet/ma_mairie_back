const express = require(`express`);
const adminController = require(`../controllers/adminController`);
// const adminControllerArticle = require(`../controllers/adminControllerArticle`)
const adminReportingController = require(`../controllers/adminReportingController`);
const routerWrapper = require(`../handlers/routerWrapper`);
const { schemaCreateAdmin } = require(`../validation/schema/createAdminSchema`);
const { validateCreateAdmin } = require(`../validation/validations`);
const authenticateToken = require(`../middleware/authenticateToken`);
const compareString = require(`../middleware/compareString`);
const router = express.Router();

/** ******** ADMIN *********** */
router.post(`/signup`, routerWrapper(adminController.signup));
router.post(`/login`, routerWrapper(adminController.login));

/** ******** REPORTING *********** */
router.get(`/admin/reporting/:town_hall_id`, authenticateToken, routerWrapper(adminReportingController.allReportingAdmin));
router.get(`/admin/reporting/:town_hall_id/:reporting_id`, authenticateToken, routerWrapper(adminReportingController.oneReporting));
router.delete(`/admin/reporting/:town_hall_id/:reporting_id`, authenticateToken, routerWrapper(adminReportingController.deleteReporting));
router.put(`/admin/reporting/:town_hall_id/:reporting_id`, authenticateToken, routerWrapper(adminReportingController.modifyReporting));
/** ******** ARTICLE *********** */
// router.get(`/admin/article/:town_hall_id`, authenticateToken, routerWrapper(adminControllerArticle.allArticle));
// router.get(`/admin/article/:town_hall_id/:article_id`, authenticateToken, routerWrapper(adminControllerArticle.));
// router.delete(`/admin/article/:town_hall_id/:article_id`, authenticateToken, routerWrapper(adminControllerArticle.));
// router.put(`/admin/article/:town_hall_id/:article_id`, authenticateToken, routerWrapper(adminControllerArticle.));

// route de test
router.get(`/admin`, authenticateToken, routerWrapper(adminController.isConnect));

/** ******** VISITEUR *********** */
/** ******** REPORTING *********** */
//! TODO CHANGER method visisteur
router.get(`/reporting/:town_hall_id`, routerWrapper(adminReportingController.allReportingAdmin));
router.post(`/reporting/:town_hall_id`, routerWrapper(adminReportingController.postReporting));

module.exports = router;
