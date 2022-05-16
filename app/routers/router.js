const express = require(`express`);
const adminController = require(`../controllers/adminController`);
<<<<<<< HEAD
const adminControllerArticle = require(`../controllers/adminControllerArticle`);
=======
// const adminControllerArticle = require(`../controllers/adminControllerArticle`)
>>>>>>> e29e8d8c4b5437bf2e6f5d16ba2d73f1ecafedca
const adminReportingController = require(`../controllers/adminReportingController`);
const routerWrapper = require(`../handlers/routerWrapper`);
const {
  schemaCreateAdmin,
  schemaCreateReportingUser,
} = require(`../validation/schema/schemaCreateAdmin`);
const {
  validateCreateAdmin,
  validateCreateReportingUser,
} = require(`../validation/validations`);
const authenticateToken = require(`../middleware/authenticateToken`);
const compareString = require(`../middleware/compareString`);
const router = express.Router();

/** ******** ADMIN *********** */
router.post(
  `/signup`,
  validateCreateAdmin(schemaCreateAdmin),
  routerWrapper(adminController.signup)
);
router.post(`/login`, routerWrapper(adminController.login));

/** ******** REPORTING *********** */
router.get(
  `/admin/reporting/:town_hall_id`,
  authenticateToken,
  routerWrapper(adminReportingController.allReporting)
);
router.get(
  `/admin/reporting/:town_hall_id/:reporting_id`,
  authenticateToken,
  routerWrapper(adminReportingController.oneReporting)
);
router.delete(
  `/admin/reporting/:town_hall_id/:reporting_id`,
  authenticateToken,
  routerWrapper(adminReportingController.deleteReporting)
);
router.put(
  `/admin/reporting/:town_hall_id/:reporting_id`,
  authenticateToken,
  routerWrapper(adminReportingController.modifyReporting)
);
/** ******** ARTICLE *********** */
<<<<<<< HEAD
router.get(`/admin/article/:town_hall_id`, authenticateToken, routerWrapper(adminControllerArticle.allArticle));
router.get(`/admin/article/:town_hall_id/:article_id`, authenticateToken, routerWrapper(adminControllerArticle.oneArticle));
router.post(`/admin/new-article/:town_hall_id`, authenticateToken, routerWrapper(adminControllerArticle.postArticle));
router.delete(`/admin/article/:town_hall_id/:article_id`, authenticateToken, routerWrapper(adminControllerArticle.deleteArticle));
router.put(`/admin/article/:town_hall_id/:article_id`, authenticateToken, routerWrapper(adminControllerArticle.modifyArticle));

// route de test
router.get(`/admin`, authenticateToken, routerWrapper(adminController.isConnect));
=======
// router.get(`/admin/article/:town_hall_id`, authenticateToken, routerWrapper(adminControllerArticle.allArticle));
// router.get(`/admin/article/:town_hall_id/:article_id`, authenticateToken, routerWrapper(adminControllerArticle.));
// router.delete(`/admin/article/:town_hall_id/:article_id`, authenticateToken, routerWrapper(adminControllerArticle.));
// router.put(`/admin/article/:town_hall_id/:article_id`, authenticateToken, routerWrapper(adminControllerArticle.));
>>>>>>> e29e8d8c4b5437bf2e6f5d16ba2d73f1ecafedca

/** ******** VISITEUR *********** */
/** ******** REPORTING *********** */
//! TODO CHANGER method visisteur
router.get(
  `/reporting/:town_hall_id`,
  routerWrapper(adminReportingController.allReporting)
);
router.post(
  `/reporting/:town_hall_id`,
  validateCreateReportingUser(schemaCreateReportingUser),
  routerWrapper(adminReportingController.postReporting)
);

module.exports = router;
