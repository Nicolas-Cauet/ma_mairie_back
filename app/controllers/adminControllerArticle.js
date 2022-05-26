const { dataMapperArticle } = require(`../models/dataMapper/index`);

/**
 * @type {Object}
 * @namespace adminControllerArticle
 * @exports adminControllerArticle
 */
const adminControllerArticle = {
  /** The method returns the list of all items
   * @menberof adminControllerArticle
   * @method allArticle
   * @param {Object} req
   * @param {Object} res
   * @returns {Array} Return all articles
   */
  async allArticle(req, res, next) {
    const articles = await dataMapperArticle.getAllArticleAdmin(
      req.params.town_hall_id,
    );
    if (articles) {
      res.json(articles).status(200);
    } else {
      const err = new Error(`Impossible de récupérer la listes des articles`);
      next(err);
    }
  },
  /**
   * The method returns an article
   * @menberof adminControllerArticle
   * @method oneArticle
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Return one article
   */
  async oneArticle(req, res, next) {
    const articles = await dataMapperArticle.getOneArticle(
      req.params.article_id,
    );
    if (articles) {
      res.json(articles).status(200);
    } else {
      const err = new Error(`Impossible de récupérer l'article !`);
      next(err);
    }
  },
  /** The method allows you to delete an article as administrator
   * @menberof adminControllerArticle
   * @method deleteArticle
   * @param {Object} req
   * @param {Object} res
   * @returns void
   */
  async deleteArticle(req, res, next) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      const err = new Error(`Vous n'avez pas accès à cette page.s`);
      err.status = 401;
      next(err);
    }
    const articles = await dataMapperArticle.deleteArticle(
      req.params.article_id,
    );
    if (articles.rowCount) {
      res.status(200).send(`L'article est bien supprimer.`);
    } else {
      const err = new Error(`La suppression de l'article n'est pas possible.`);
      next(err);
    }
  },
  /**
   * The method allows you to modify an article as administrator
   * @menberof adminControllerArticle
   * @method modifyArticle
   * @param {Object} req
   * @param {Object} res
   * @return void
   */
  async modifyArticle(req, res, next) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      const err = new Error(`Vous n'avez pas accès à cette page.`);
      err.status = 401;
      next(err);
    }
    const values = {
      title: req.body.title,
      description: req.body.description,
      summarize: req.body.summarize,
      image: req.body.image,
      author: req.body.author,
      article_categorie: req.body.article_categorie,
      article_color: req.body.article_color,
      article_id: req.params.article_id,
    };
    const report = await dataMapperArticle.modifyArticle(values);
    if (report.rowCount) {
      res.status(200).send(`La mise à jour est bien passée.`);
    } else {
      const err = new Error(`La mise à jour de l'article n'est pas possible.`);
      next(err);
    }
  },
  /**
   * The method allows you to create an article as administrator
   * @menberof adminControllerArticle
   * @method postArticle
   * @param {Object} req
   * @param {Object} res
   * @returns void
   */
  async postArticle(req, res, next) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      const err = new Error(`Vous n'avez pas accès à cette page.`);
      err.status = 401;
      next(err);
    }
    const values = {
      title: req.body.title,
      description: req.body.description,
      summarize: req.body.summarize,
      image: req.body.image,
      author: req.body.author,
      article_categorie: req.body.article_categorie,
      article_color: req.body.article_color,
      article_id: req.params.town_hall_id,
    };
    const report = await dataMapperArticle.postArticle(values);
    if (report.rowCount) {
      res.status(200).send(`L'article à été poster.`);
    } else {
      const err = new Error(`Le post de l'article n'est pas possible.`);
      next(err);
    }
  },
};

module.exports = adminControllerArticle;
