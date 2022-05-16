const express = require(`express`);
const adminController = require(`../controllers/adminController`);
// const adminControllerArticle = require(`../controllers/adminControllerArticle`)
const adminReportingController = require(`../controllers/adminReportingController`);
const adminControllerCouncil = require(`../controllers/adminControllerCouncil`);
const adminControllerArticle = require(`../controllers/adminControllerCouncil`);
const handleError = require(`../handlers/handleError`);
const authenticateToken = require(`../middleware/authenticateToken`);
const routerWrapper = require(`../handlers/routerWrapper`);
const APIError = require(`../handlers/APIError`);
const compareString = require(`../middleware/compareString`);

const { schemaCreationAdmin, schemaCreateReportingUser } = require(`../validation/schema`);

const { validateCreateAdmin, validateCreateReportingUser } = require(`../validation/validations`);

const router = express.Router();

/** ******** ADMIN *********** */
router.post(
  `/signup`,
  validateCreateAdmin(schemaCreationAdmin),
  routerWrapper(adminController.signup),
);
router.post(`/login`, routerWrapper(adminController.login));

/** ******** REPORTING *********** */
router.get(
  `/admin/reporting/:town_hall_id`,
  authenticateToken,
  routerWrapper(adminReportingController.allReporting),
);
router.get(
  `/admin/reporting/:town_hall_id/:reporting_id`,
  authenticateToken,
  routerWrapper(adminReportingController.oneReporting),
);
router.delete(
  `/admin/reporting/:town_hall_id/:reporting_id`,
  authenticateToken,
  routerWrapper(adminReportingController.deleteReporting),
);
router.put(
  `/admin/reporting/:town_hall_id/:reporting_id`,
  authenticateToken,
  routerWrapper(adminReportingController.modifyReporting),
);
/** ******** ARTICLE *********** */

router.get(`/admin/article/:town_hall_id`, authenticateToken, routerWrapper(adminControllerArticle.allArticle));
router.get(`/admin/article/:town_hall_id/:article_id`, authenticateToken, routerWrapper(adminControllerArticle.oneArticle));
router.post(`/admin/new-article/:town_hall_id`, authenticateToken, routerWrapper(adminControllerArticle.postArticle));
router.delete(`/admin/article/:town_hall_id/:article_id`, authenticateToken, routerWrapper(adminControllerArticle.deleteArticle));
router.put(`/admin/article/:town_hall_id/:article_id`, authenticateToken, routerWrapper(adminControllerArticle.modifyArticle));

/** ******** VISITEUR *********** */
/** ******** REPORTING *********** */
router.get(
  `/reporting/:town_hall_id`,
  routerWrapper(adminReportingController.allReportingVisitor),
);
router.post(
  `/reporting/:town_hall_id`,
  compareString.verifyString,
  validateCreateReportingUser(schemaCreateReportingUser),
  routerWrapper(adminReportingController.postReporting),
);

/** ******** TOWN_HALL_STAFF *********** */

// router.post(`/admin/council/:town_hall_id`, authenticateToken, routerWrapper(adminControllerCouncil.postArticle));
// router.delete(`/admin/council/:town_hall_id/:town_hall_staff_id`, authenticateToken, routerWrapper(adminControllerCouncil.deleteArticle));
// router.put(`/admin/council/:town_hall_id/:town_hall_staff_id`, authenticateToken, routerWrapper(adminControllerCouncil.modifyArticle));

router.get(`/council/:town_hall_id`, authenticateToken, routerWrapper(adminControllerCouncil.allCouncil));

// router.use(handleError);

module.exports = router;
