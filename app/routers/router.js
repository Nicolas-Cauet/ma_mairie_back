const express = require(`express`);
const adminController = require(`../controllers/adminController`);
<<<<<<< HEAD
const adminControllerArticle = require(`../controllers/adminControllerArticle`);
=======
// const adminControllerArticle = require(`../controllers/adminControllerArticle`)
>>>>>>> e29e8d8c4b5437bf2e6f5d16ba2d73f1ecafedca
const adminReportingController = require(`../controllers/adminReportingController`);
<<<<<<< HEAD
const routerWrapper = require(`../handlers/routerWrapper`);
const {
  schemaCreateAdmin,
  schemaCreateReportingUser,
} = require(`../validation/schema/schemaCreateAdmin`);
const {
  validateCreateAdmin,
  validateCreateReportingUser,
} = require(`../validation/validations`);
=======
const adminControllerCouncil = require(`../controllers/adminControllerCouncil`);
>>>>>>> reporting
const authenticateToken = require(`../middleware/authenticateToken`);
const routerWrapper = require(`../handlers/routerWrapper`);
const compareString = require(`../middleware/compareString`);

const {
  schemaCreationAdmin,
  schemaCreateReportingUser,
} = require(`../validation/schema`);

const {
  validateCreateAdmin,
  validateCreateReportingUser,
} = require(`../validation/validations`);

const router = express.Router();

/** ******** ADMIN *********** */
router.post(
  `/signup`,
<<<<<<< HEAD
  validateCreateAdmin(schemaCreateAdmin),
  routerWrapper(adminController.signup)
=======
  validateCreateAdmin(schemaCreationAdmin),
  routerWrapper(adminController.signup),
>>>>>>> reporting
);
router.post(`/login`, routerWrapper(adminController.login));

/** ******** REPORTING *********** */
router.get(
  `/admin/reporting/:town_hall_id`,
  authenticateToken,
<<<<<<< HEAD
  routerWrapper(adminReportingController.allReporting)
=======
  routerWrapper(adminReportingController.allReporting),
>>>>>>> reporting
);
router.get(
  `/admin/reporting/:town_hall_id/:reporting_id`,
  authenticateToken,
<<<<<<< HEAD
  routerWrapper(adminReportingController.oneReporting)
=======
  routerWrapper(adminReportingController.oneReporting),
>>>>>>> reporting
);
router.delete(
  `/admin/reporting/:town_hall_id/:reporting_id`,
  authenticateToken,
<<<<<<< HEAD
  routerWrapper(adminReportingController.deleteReporting)
=======
  routerWrapper(adminReportingController.deleteReporting),
>>>>>>> reporting
);
router.put(
  `/admin/reporting/:town_hall_id/:reporting_id`,
  authenticateToken,
<<<<<<< HEAD
  routerWrapper(adminReportingController.modifyReporting)
=======
  routerWrapper(adminReportingController.modifyReporting),
>>>>>>> reporting
);
/** ******** ARTICLE *********** */
<<<<<<< HEAD
router.get(`/admin/article/:town_hall_id`, authenticateToken, routerWrapper(adminControllerArticle.allArticle));
router.get(`/admin/article/:town_hall_id/:article_id`, authenticateToken, routerWrapper(adminControllerArticle.oneArticle));
router.post(`/admin/new-article/:town_hall_id`, authenticateToken, routerWrapper(adminControllerArticle.postArticle));
router.delete(`/admin/article/:town_hall_id/:article_id`, authenticateToken, routerWrapper(adminControllerArticle.deleteArticle));
router.put(`/admin/article/:town_hall_id/:article_id`, authenticateToken, routerWrapper(adminControllerArticle.modifyArticle));

<<<<<<< HEAD
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
=======
/** ******** TOWN_HALL_STAFF *********** */

// router.post(`/admin/council/:town_hall_id`, authenticateToken, routerWrapper(adminControllerCouncil.postArticle));
// router.delete(`/admin/council/:town_hall_id/:town_hall_staff_id`, authenticateToken, routerWrapper(adminControllerCouncil.deleteArticle));
// router.put(`/admin/council/:town_hall_id/:town_hall_staff_id`, authenticateToken, routerWrapper(adminControllerCouncil.modifyArticle));

/** ******** VISITEUR *********** */
/** ******** REPORTING *********** */
router.get(
  `/reporting/:town_hall_id`,
  routerWrapper(adminReportingController.allReporting),
);
router.post(
  `/reporting/:town_hall_id`,
  compareString.verifyString,
  validateCreateReportingUser(schemaCreateReportingUser),
  routerWrapper(adminReportingController.postReporting),
);
/** ******** TOWN_HALL_STAFF *********** */

router.get(`/council/:town_hall_id`, authenticateToken, routerWrapper(adminControllerCouncil.allCouncil));
>>>>>>> reporting

module.exports = router;
