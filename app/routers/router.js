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
  schemaUpdateCouncilMember,
} = require(`../validation/schema`);

const {
  validateCreateAdmin,
  validateCreateReportingUser,
  validateReportingUser,
  validateCreateArticle,
  validateUpdateArticle,
  validateCreateCouncilMember,
  validateUpdateCouncilMember,
} = require(`../validation/validations`);

const router = express.Router();

/** ******** ADMIN *********** */

/**
 *@api {post} /signup Signup: allows you to register an administrator of a town hall
 *@apiName Signup
 *@apiGroup Admin Signup
 *@apiSuccess {String} String Returns success message
 *@apiSuccessExample Success-response:
 *            HTTP/1.1 200 OK
 *            {
 *              "Votre compte a bien été créé, vous pouvez vous connecter."
 *            }
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *             "error" : {
 *                "message": "Le pseudo est déjà prit merci d'en saisir un autre."
 *              }
 *            }
 *@apiErrorExample {json} Error-Response:
 *            HTTP/1.1 400
 *            {
 *             "error" : {
 *                "message": "Le code Insee est invalide."
 *              }
 *            }
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 400
 *            {
 *              "error": {
 *               "message": "Le mot de passe doit contenir une majuscule un caractère
 *                           spécial est au minimum 8 caractères et maximum 15
 *                           caractères les chiffres sont autorisés."
 *              }
 *            }
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 400
 *            {
 *              "error": {
 *               "message": "Merci de saisir tous les champs !"
 *              }
 *            }
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 400
 *            {
 *              "error": {
 *               "message": "L'adresse e-mail doit être conforme ex: test@gmail.fr"
 *              }
 *            }
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *              "error": {
 *               "message": "Adresse email est déjà prise merci d'en saisir une autre."
 *              }
 *            }
 */
router.post(
  `/signup`,
  validateCreateAdmin(schemaCreationAdmin),
  routerWrapper(adminController.signup),
);
/**
 *@api {post} /login Registration: allows you to login an administrator of a town hall
 *@apiName Login
 *@apiGroup Admin Login
 *@apiSuccess {String} Token Returns the token
 *@apiSuccess {Number} Town_hall_id Returns unique identifier of the town hall
 *@apiSuccessExample Success-response:
 *            HTTP/1.1 200 OK
 *            {
 *               "accessToken": "eyJhbGciOiJIUzI1NiIVCJ9.
 *                               IsInRvd25faGFsbF9pZCI6MSwiaWF0IjoxNjUyOTc4MDI2fQ.
 *                               qOzbQJE7Br8C2hVVs9teDTSdsQYr1cVbbHo",
 *               "townHallId": 1
 *             }
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *             "error" : {
 *                "message": "Impossible de récupérer Administrateur en base."
 *              }
 *            }
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *              "error": {
 *               "message": "La connexion a échoué vérifier vos données."
 *              }
 *            }
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 401
 *            {
 *              "error": {
 *               "message": "Vous n'avez pas accès à cette page."
 *              }
 *            }
 */
router.post(`/login`, routerWrapper(adminController.login));

/** ******** REPORTING *********** */
/**
 *@api {get} /admin/reporting/:town_hall_id
 *Get all reportings : Returns all reports from the town hall
 *@apiName Reportings
 *@apiGroup Admin Reportings
 *@apiParam {Number} town_hall_id the town hall unique identifer
 *@apiSuccess {json} Object Returns all the information of all reports
 *@apiSuccessExample Success-response:
 *            HTTP/1.1 200 OK
 *              {
 *                   "reporting_id": 1,
 *                   "title": "Chien errant",
 *                   "email": "alain.proviste.@gmail.com",
 *                   "phonenumber": "0688789531",
 *                   "first_name": "Alain",
 *                   "last_name": "Proviste",
 *                   "user_image": null,
 *                   "user_text": "Bonjour, J'ai vu un chien errant 6 rue du
 *                                  champ des loups, il etais noir avec des tache blanche de taille
 *                                  moyenne avec un petit museaux.",
 *                   "user_ip": null,
 *                   "admin_text": null,
 *                   "admin_image": null,
 *                   "reporting_category": "Animaux",
 *                   "reporting_statut": "Non validé",
 *                   "town_hall_id": 1,
 *                   "created_at": "2022-05-19T16:24:32.276Z",
 *                   "updated_at": null
 *               }
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 401
 *            {
 *             "error": {
 *               "message": "Vous n'avez pas accès à cette page."
 *              }
 *            }
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *              "error": {
 *               "message": "Impossible de récupérer tous les signalements."
 *              }
 *            }
 */
router.get(
  `/admin/reporting/:town_hall_id`,
  authenticateToken,
  routerWrapper(adminReportingController.allReporting),
);

/**
 *@api {get} /admin/reporting/:town_hall_id/:reporting_id
 *Get one reporting :Returns one report from the town hall
 *@apiParam {Number} town_hall_id the town hall unique identifer
 *@apiParam {Number} reporting_id reporting unique identifer
 *@apiParamExample {json} Request-Example:
 *                  {
 *                   "town_hall_id": 1
 *                  }
 *@apiName Reporting
 *@apiGroup User Reporting
 *@apiSuccess {json} Object Returns all the information of one report
 *@apiSuccessExample Success-response:
 *            HTTP/1.1 200 OK
 *              {
 *                   "reporting_id": 1,
 *                   "title": "Chien errant",
 *                   "email": "alain.proviste.@gmail.com",
 *                   "phonenumber": "0688789531",
 *                   "first_name": "Alain",
 *                   "last_name": "Proviste",
 *                   "user_image": null,
 *                   "user_text": "Bonjour, J'ai vu un chien errant 6 rue du
 *                                  champ des loups, il etais noir avec des tache blanche de taille
 *                                  moyenne avec un petit museaux.",
 *                   "user_ip": null,
 *                   "admin_text": null,
 *                   "admin_image": null,
 *                   "reporting_category": "Animaux",
 *                   "reporting_statut": "Non validé",
 *                   "town_hall_id": 1,
 *                   "created_at": "2022-05-19T16:24:32.276Z",
 *                   "updated_at": null
 *               }
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *             "error" : {
 *                "message": "Impossible de récupérer le signalement !"
 *              }
 *            }
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 401
 *            {
 *              "error": {
 *               "message": "Vous n'avez pas accès à cette page !"
 *              }
 *            }
 */
router.get(
  `/admin/reporting/:town_hall_id/:reporting_id`,
  authenticateToken,
  routerWrapper(adminReportingController.oneReporting),
);
/**
 *@api {delete} /admin/reporting/:town_hall_id/:reporting_id
 *Delete:  Delete one report from the town hall
 *@apiName Delete Reporting
 *@apiGroup Admin Reportings
 *@apiParam {Number} town_hall_id the town hall unique identifer
 *@apiParam {Number} reporting_id the reporting unique identifer
 *@apiParamExample {json} Request-Example:
 *               {
 *                "town_hall_id": 1,
 *                "reporting_id": 1
 *               }
 *@apiSuccess {String} String Returns success message
 *@apiSuccessExample Success-response:
 *            HTTP/1.1 200 OK
 *              {
 *                  "Le signalement "J'aime la pizza" est bien supprimé !"
 *               }
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *             "error" : {
 *                "message": "Impossible de supprimé le signalement !"
 *              }
 *            }
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 401
 *            {
 *              "error": {
 *               "message": "Vous n'avez pas accès à cette page !"
 *              }
 *            }
 */
router.delete(
  `/admin/reporting/:town_hall_id/:reporting_id`,
  authenticateToken,
  routerWrapper(adminReportingController.deleteReporting),
);
/**
 *@api {patch} /admin/reporting/:town_hall_id/:reporting_id
 *Update:  Update one report from the town hall
 *@apiName Update Reporting
 *@apiGroup Admin Reportings
 *@apiParam {Number} town_hall_id the town hall unique identifer
 *@apiParam {Number} reporting_id the reporting unique identifer
 *@apiParamExample {json} Request-Example:
 *               {
 *                "town_hall_id": 1,
 *                "reporting_id": 1
 *               }
 *@apiSuccess {String} String Returns success message
 *@apiSuccessExample Success-yarnresponse:
 *            HTTP/1.1 200 OK
 *              {
 *                La mise à jour est bien passée.
 *              }
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *             "error" : {
 *                "message": "Le signalement "j'aime la pizza" a bien été mis à jour."
 *              }
 *            }
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 401
 *            {
 *              "error": {
 *               "message": "Vous n'avez pas accès à cette page !"
 *              }
 *            }
 */
router.patch(
  `/admin/reporting/:town_hall_id/:reporting_id`,
  authenticateToken,
  validateReportingUser(schemaValidateReportingUser),
  routerWrapper(adminReportingController.modifyReporting),
);
/** ******** ARTICLE *********** */

/**
 *@api {get} /admin/article/:town_hall_id
 *Articles:  Get all articles from the town hall
 *@apiName Articles
 *@apiGroup  User Articles
 *@apiParam {Number} town_hall_id the town hall unique identifer
 *@apiParamExample {json} Request-Example:
 *               {
 *                "town_hall_id": 1
 *               }
 *@apiSuccess {json} Object Returns all articles from the town hall
 *@apiSuccessExample {json} Success-response:
 *                HTTP/1.1 200
 *                [
 *                  {
 *                    "article_id": 1,
 *                    "title": "Vive la sauscice",
 *                    "description": "Alors là! Permettez-moi de vous dire!
 *                                    Le coup du mystérieux chevalier
 *                                    gaulois solitaire à la rescousse de l’opprimé.
 *                                    Ca fait vraiment bidon comme légende! Oh mais jmen fais pas.
 *                                    Jvais mentrainer jusquà cque ça marche!
 *                                    Hé mais jai failli me la prendre! Sil vous plait!
 *                                    Faites pas votre mijoré! Moi je me fais traiter de gonzesse
 *                                    jen fais pas tout un cake! Ben attendez,
 *                                    je vais vous rendre la vôtre. Ptite pucelle!",
 *                    "summarize": "Pas foutu de savoir son nom! Vous savez
 *                                  cest quand de même pas grave de
 *                                  pas savoir faire des tartes!
 *                                  Ben attendez, je vais vous rendre la vôtre.",
 *                    "image": null,
 *                    "author": "AdminMaMairie",
 *                    "article_categorie": "Fête",
 *                    "article_color": "Red",
 *                    "town_hall_id": 1,
 *                    "created_at": "2022-05-19T16:24:32.276Z",
 *                    "updated_at": null
 *                   }
 *               ]
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *             "error" : {
 *                "message": "Impossible de récupérer la listes des articles"
 *              }
 *            }
 */
router.get(
  `/admin/article/:town_hall_id`,
  authenticateToken,
  routerWrapper(adminControllerArticle.allArticle),
);
/**
 *@api {get} /admin/article/:town_hall_id/:article_id
 *Article:  Get one articles from the town hall
 *@apiName Article
 *@apiGroup User Articles
 *@apiParam {Number} town_hall_id the town hall unique identifer
 *@apiParam {Number} article_id unique identifer
 *@apiParamExample {json} Request-Example:
 *               {
 *                "town_hall_id": 1,
 *                "article_id": 1
 *               }
 *@apiSuccess {json} Object Returns one article from the town hall
 *@apiSuccessExample {json} Success-response:
 *                HTTP/1.1 200
 *                [
 *                  {
 *                    "article_id": 1,
 *                    "title": "Vive la sauscice",
 *                    "description": "Alors là! Permettez-moi de vous dire!
 *                                    Le coup du mystérieux chevalier
 *                                    gaulois solitaire à la rescousse de l’opprimé.
 *                                    Ca fait vraiment bidon comme légende! Oh mais jmen fais pas.
 *                                    Jvais mentrainer jusquà cque ça marche!
 *                                    Hé mais jai failli me la prendre! Sil vous plait!
 *                                    Faites pas votre mijoré! Moi je me fais traiter de gonzesse
 *                                    jen fais pas tout un cake! Ben attendez,
 *                                    je vais vous rendre la vôtre. Ptite pucelle!",
 *                    "summarize": "Pas foutu de savoir son nom! Vous savez
 *                                  cest quand de même pas grave de
 *                                  pas savoir faire des tartes!
 *                                  Ben attendez, je vais vous rendre la vôtre.",
 *                    "image": null,
 *                    "author": "AdminMaMairie",
 *                    "article_categorie": "Fête",
 *                    "article_color": "Red",
 *                    "town_hall_id": 1,
 *                    "created_at": "2022-05-19T16:24:32.276Z",
 *                    "updated_at": null
 *                   }
 *               ]
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *             "error" : {
 *                "message": "Impossible de récupérer l'article !"
 *              }
 *            }
 */
router.get(
  `/admin/article/:town_hall_id/:article_id`,
  authenticateToken,
  routerWrapper(adminControllerArticle.oneArticle),
);
/**
 *@api {post} /admin/article/:town_hall_id
 *Create:  Create one article from the town hall
 *@apiName Create
 *@apiGroup Admin Articles
 *@apiParam {Number} town_hall_id the town hall unique identifer
 *@apiParamExample {json} Request-Example:
 *               {
 *                "town_hall_id": 1
 *               }
 *@apiSuccess {String} String Returns success message
 *@apiSuccessExample {json} Success-response:
 *                   HTTP/1.1 200
 *                  {
 *                    L'article à été poster!
 *                   }
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *             "error" : {
 *                "message": "Le post de l'article n'est pas possible !"
 *              }
 *            }
 *@apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *             "error" : {
 *                "message": "Le champ titre est requis !"
 *              }
 *            }
 *@apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *             "error" : {
 *                "message": "Le champ titre est requis ! is required"
 *              }
 *            }
 *@apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *             "error" : {
 *                "message": "Le champ description est requis !" is required"
 *              }
 *            }
 *@apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *             "error" : {
 *                "message": "Le champ resummé est requis !" is required"
 *              }
 *            }
 *@apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *             "error" : {
 *                "message": "Le champ author est requis !" is required"
 *              }
 *            }
 *
 */
router.post(
  `/admin/new-article/:town_hall_id`,
  authenticateToken,
  validateCreateArticle(schemaCreateArticle),
  routerWrapper(adminControllerArticle.postArticle),
);

/**
 *@api {delete} /admin/article/:town_hall_id/:article_id
 *Delete:  Delete one article from the town hall
 *@apiName Delete
 *@apiGroup Admin Articles
 *@apiParam {Number} town_hall_id the town hall unique identifer
 *@apiParam {Number} article_id unique identifer
 *@apiParamExample {json} Request-Example:
 *               {
 *                "town_hall_id": 1,
 *                "article_id": 1
 *               }
 *@apiSuccess {String} String Returns success message
 *@apiSuccessExample {json} Success-response:
 *                   HTTP/1.1 200
 *                  {
 *                    "L'article est bien supprimer !"
 *                   }
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *             "error" : {
 *                "message": `La suppression de l'article n'est pas possible !`"
 *              }
 *            }
 */
router.delete(
  `/admin/article/:town_hall_id/:article_id`,
  authenticateToken,
  routerWrapper(adminControllerArticle.deleteArticle),
);

/**
 *@api {patch} /admin/article/:town_hall_id/:article_id
 *Update:  Update one article from the town hall
 *@apiName Update
 *@apiGroup Admin Articles
 *@apiParam {Number} town_hall_id the town hall unique identifer
 *@apiParam {Number} article_id unique identifer
 *@apiParamExample {json} Request-Example:
 *               {
 *                "town_hall_id": 1,
 *                "article_id": 1
 *               }
 *@apiSuccess {String} String Returns success message
 *@apiSuccessExample {json} Success-response:
 *                   HTTP/1.1 200
 *                  {
 *                    "La mise à jour est bien passée."
 *                   }
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *             "error" : {
 *                "message": `La mise à jour de l'article n'est pas possible !`"
 *              }
 *            }
 *@apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *             "error" : {
 *                "message": "Le champ titre est requis !"
 *              }
 *            }
 *@apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *             "error" : {
 *                "message": "Le champ titre est requis ! is required"
 *              }
 *            }
 *@apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *             "error" : {
 *                "message": "Le champ description est requis !" is required"
 *              }
 *            }
 *@apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *             "error" : {
 *                "message": "Le champ resummé est requis !" is required"
 *              }
 *            }
 *@apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *             "error" : {
 *                "message": "Le champ author est requis !" is required"
 *              }
 *            }
 *@apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *             "error" : {
 *                "message": "Le texte de administrateur doit contenir
 *                            une réponse d'au moins 10 caractères."
 *              }
 *            }
 */
router.patch(
  `/admin/article/:town_hall_id/:article_id`,
  authenticateToken,
  validateUpdateArticle(schemaUpdateArticle),
  routerWrapper(adminControllerArticle.modifyArticle),
);

/** ******** VISITEUR *********** */
/** ******** REPORTING *********** */

/**
 *@api {get} /reporting/:town_hall_id
 *Get all reportings : Returns all reports from the town hall
 *@apiName Reportings
 *@apiGroup User Reportings
 *@apiParam {Number} town_hall_id the town hall unique identifer
 *@apiSuccess {json} Object Returns all the information of all reports
 *@apiSuccessExample Success-response:
 *            HTTP/1.1 200 OK
 *              {
 *                   "reporting_id": 1,
 *                   "title": "Chien errant",
 *                   "email": "alain.proviste.@gmail.com",
 *                   "phonenumber": "0688789531",
 *                   "first_name": "Alain",
 *                   "last_name": "Proviste",
 *                   "user_image": null,
 *                   "user_text": "Bonjour, J'ai vu un chien errant 6 rue du
 *                                  champ des loups, il etais noir avec des tache blanche de taille
 *                                  moyenne avec un petit museaux.",
 *                   "user_ip": null,
 *                   "admin_text": null,
 *                   "admin_image": null,
 *                   "reporting_category": "Animaux",
 *                   "reporting_statut": "En cours",
 *                   "town_hall_id": 1,
 *                   "created_at": "2022-05-19T16:24:32.276Z",
 *                   "updated_at": null
 *               }
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *             "error" : {
 *                "message": "Impossible de récupérer tous les signalements."
 *              }
 *            }
 */
router.get(
  `/reporting/:town_hall_id`,
  routerWrapper(adminReportingController.allReportingVisitor),
);
/**
 *@api {post} /reporting/:town_hall_id
 *Create : Create report from the town hall
 *@apiName Reportings
 *@apiGroup User Reporting
 *@apiParam {Number} town_hall_id the town hall unique identifer
 *@apiSuccess {json} Object Returns all the information of all reports
 *@apiSuccessExample Success-response:
 *            HTTP/1.1 200 OK
 *               {
 *                 "Votre signalement est effectué."
 *               }
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *             "error" : {
 *                "message": "Impossible de poster votre signalement."
 *              }
 *            }
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *              "error": {
 *               "message": "Vous avez deja poster 3 fois aujourd'hui."
 *              }
 *            }
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *              "error": {
 *               "message": "Les insultes ne sont pas acceptées dans le texte du signalement."
 *              }
 *            }
 *@apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *              "error": {
 *               "message": "Le contenu du signalement est très similaire a un autre signalement."
 *              }
 *            }
 */
router.post(
  `/reporting/:town_hall_id`,
  routerWrapper(compareString.verifyString),
  validateCreateReportingUser(schemaCreateReportingUser),
  routerWrapper(adminReportingController.postReporting),
);

/** ******** TOWN_HALL_STAFF *********** */
/**
 *@api {get} /council/:town_hall_id
 *Get all council : Returns all municipal council member from the town hall
 *@apiName Council
 *@apiGroup User Council
 *@apiParam {Number} town_hall_id the town hall unique identifer
 *@apiSuccess {json} Object Returns all the information of all municipal council
 *@apiSuccessExample Success-response:
 *            HTTP/1.1 200 OK
 *              [
 *                {
 *                  "town_hall_staff_id": 1,
 *                  "last_name": "Jean",
 *                  "first_name": "Jean",
 *                  "role": "Maire",
 *                  "photo": "",
 *                  "town_hall_id": 1,
 *                  "created_at": "2022-05-20T03:59:06.586Z",
 *                  "updated_at": null
 *                }
 *              ]
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *             "error" : {
 *                "message": "Impossible de récupèrer les Conseillers !"
 *              }
 *            }
 */
router.get(
  `/council/:town_hall_id`,
  routerWrapper(adminControllerCouncil.allCouncil),
);
/**
 *@api {post} /admin/council/:town_hall_id
 *Create : Create member council from the town hall
 *@apiName  Create
 *@apiGroup Admin Council
 *@apiParam {Number} town_hall_id the town hall unique identifer
 *@apiSuccess {String} String Returns success message
 *@apiSuccessExample Success-response:
 *            HTTP/1.1 200 OK
 *                {
 *                 "Votre ajout à été effectué !"
 *                }
 *@apiErrorExample {json} Error-Response:
 *            HTTP/1.1 401
 *            {
 *              "error": {
 *               "message": "Vous n'avez pas accès à cette page !"
 *              }
 *            }
 *@apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *              "error": {
 *               "message": "Le Role est requis !"
 *              }
 *            }
 *@apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *              "error": {
 *               "message": "Le Nom de famille est requis !"
 *              }
 *            }
 *@apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *              "error": {
 *               "message": "La mise à jour n'est pas possible !"
 *              }
 *            }
 *@apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *              "error": {
 *               "message": "Le Prénom est requis !"
 *              }
 *            }
 */
router.post(
  `/admin/council/:town_hall_id`,
  authenticateToken,
  validateCreateCouncilMember(schemaCreateCouncilMember),
  routerWrapper(adminControllerCouncil.postOneMember),
);
/**
 *@api {delete} /admin/council/:town_hall_id/:town_hall_staff_id
 *Delete : Delete member council from the town hall
 *@apiName Delete
 *@apiGroup Admin Council
 *@apiParam {Number} town_hall_id the town hall unique identifer
 *@apiParam {Number} town_hall_staff_id the town hall staff unique identifer
 *@apiSuccess {String} String Returns success message
 *@apiSuccessExample Success-response:
 *            HTTP/1.1 200 OK
 *                {
 *                 "Le Membre à bien été supprimer !"
 *                }
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *             "error" : {
 *                "message": "La suppression du membre n'est pas possible !"
 *              }
 *            }
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 401
 *            {
 *              "error": {
 *               "message": "Vous n'avez pas accès à cette page !"
 *              }
 *            }
 */
router.delete(
  `/admin/council/:town_hall_id/:town_hall_staff_id`,
  authenticateToken,
  routerWrapper(adminControllerCouncil.deleteMemberCouncil),
);

/**
 *@api {patch} /admin/council/:town_hall_id/:town_hall_staff_id
 *Update : Update member council from the town hall
 *@apiName Admin Council
 *@apiGroup Admin Council
 *@apiParam {Number} town_hall_id the town hall unique identifer
 *@apiParam {Number} town_hall_staff_id the town hall staff unique identifer
 *@apiSuccess {String} String Returns success message
 *@apiSuccessExample Success-response:
 *            HTTP/1.1 200 OK
 *                {
 *                 "La mise à jour du membre du conseiller, c'est bien passé."
 *                }
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *             "error" : {
 *                "message": "Le Prénom est requis !"
 *              }
 *            }
 *@apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *             "error" : {
 *                "message": "Le Nom de famille est requis !"
 *              }
 *            }
 *@apiErrorExample {json} Error-Response:
 *            HTTP/1.1 500
 *            {
 *             "error" : {
 *                "message": "Le Role est requis !"
 *              }
 *            }
 * @apiErrorExample {json} Error-Response:
 *            HTTP/1.1 401
 *            {
 *              "error": {
 *               "message": "Vous n'avez pas accès à cette page !"
 *              }
 *            }
 */
router.patch(
  `/admin/council/:town_hall_id/:town_hall_staff_id`,
  authenticateToken,
  validateUpdateCouncilMember(schemaUpdateCouncilMember),
  routerWrapper(adminControllerCouncil.modifyMemberCouncil),
);

module.exports = router;
