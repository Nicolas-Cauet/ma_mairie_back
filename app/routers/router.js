const express = require(`express`);
const adminController = require(`../controllers/adminController`);
const adminReportingController = require(`../controllers/adminReportingController`);
const adminControllerCouncil = require(`../controllers/adminControllerCouncil`);
const adminControllerArticle = require(`../controllers/adminControllerArticle`);
const authenticateToken = require(`../middleware/authenticateToken`);
const routerWrapper = require(`../handlers/routerWrapper`);

const compareString = require(`../middleware/compareString`);

const {
  schemaCreationAdmin,
  schemaValidateReportingUser,
  schemaCreateReportingUser,
  schemaCreateArticle,
  schemaUpdateArticle,
  schemaCreateCouncilMember,
} = require(`../validation/schema`);

const {
  validateCreateAdmin,
  validateCreateReportingUser,
  validateReportingUser,
  validateCreateArticle,
  validateUpdateArticle,
  validateCreateCouncilMember,
} = require(`../validation/validations`);

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

router.patch(
  `/admin/reporting/:town_hall_id/:reporting_id`,
  authenticateToken,
  validateReportingUser(schemaValidateReportingUser),
  routerWrapper(adminReportingController.modifyReporting),
);
/** ******** ARTICLE *********** */

router.get(
  `/admin/article/:town_hall_id`,
  authenticateToken,
  routerWrapper(adminControllerArticle.allArticle),
);
router.get(
  `/admin/article/:town_hall_id/:article_id`,
  authenticateToken,
  routerWrapper(adminControllerArticle.oneArticle),
);

router.post(
  `/admin/new-article/:town_hall_id`,
  authenticateToken,
  validateCreateArticle(schemaCreateArticle),
  routerWrapper(adminControllerArticle.postArticle),
);
router.delete(
  `/admin/article/:town_hall_id/:article_id`,
  authenticateToken,
  routerWrapper(adminControllerArticle.deleteArticle),
);

router.patch(
  `/admin/article/:town_hall_id/:article_id`,
  authenticateToken,
  validateUpdateArticle(schemaUpdateArticle),
  routerWrapper(adminControllerArticle.modifyArticle),
);

/** ******** VISITEUR *********** */
/** ******** REPORTING *********** */
router.get(
  `/reporting/:town_hall_id`,
  routerWrapper(adminReportingController.allReportingVisitor),
);
//* joi ok
router.post(
  `/reporting/:town_hall_id`,
  routerWrapper(compareString.verifyString),
  validateCreateReportingUser(schemaCreateReportingUser),
  routerWrapper(adminReportingController.postReporting),
);

/** ******** TOWN_HALL_STAFF *********** */
router.get(
  `/council/:town_hall_id`,
  routerWrapper(adminControllerCouncil.allCouncil),
);

router.post(
  `/admin/council/:town_hall_id`,
  authenticateToken,
  validateCreateCouncilMember(schemaCreateCouncilMember),
  routerWrapper(adminControllerCouncil.postOneMember),
);
router.delete(
  `/admin/council/:town_hall_id/:town_hall_staff_id`,
  authenticateToken,
  routerWrapper(adminControllerCouncil.deleteMemberCouncil),
);

router.patch(
  `/admin/council/:town_hall_id/:town_hall_staff_id`,
  authenticateToken,
  routerWrapper(adminControllerCouncil.modifyMemberCouncil),
);

module.exports = router;
