const { dataMapperArticle } = require(`../models/dataMapper/index`);
const APIError = require(`../handlers/APIError`);

const adminControllerArticle = {
  async allArticle(req, res) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      throw new APIError(`Impossible de supprimer le signalement !`);
    }
    const articles = await dataMapperArticle.getAllArticleAdmin(req.params.town_hall_id);
    if (articles) {
      res.json(articles);
    } else {
      throw new APIError(`Impossible de récupérer les articles`);
    }
  },
  async oneArticle(req, res) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      throw new APIError(`Impossible de supprimer le signalement !`);
    }
    const articles = await dataMapperArticle.getOneArticle(req.params.article_id);
    if (articles) {
      res.json(articles);
    } else {
      throw new APIError(`Impossible de séléctionéel l'article`);
    }
  },
  async deleteArticle(req, res) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      throw new APIError(`Impossible de supprimer le signalement !`);
    }
    const articles = await dataMapperArticle.deleteArticle(req
      .params.article_id);
    if (articles.rowCount) {
      res.status(200).send(`Le signalement est bien supprimer !`);
    } else {
      throw new APIError(`La mise à jour n'est pas possible !`);
    }
  },
  async modifyArticle(req, res) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      throw new APIError(`Impossible de supprimer le signalement !`);
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
      throw new APIError(`La mise à jour n'est pas possible !`);
    }
  },
  async postArticle(req, res) {
    if (Number(req.params.town_hall_id) !== req.admin.town_hall_id) {
      throw new APIError(`Impossible de supprimer l'article !`);
    }
    const values = {
      title: req.body.title,
      description: req.body.description,
      summarize: req.body.summarize,
      image: req.body.image,
      author: req.body.author,
      article_categorie: req.body.article_categorie,
      article_color: req.body.article_color,
      article_id: req.params.mairie_id,
    };
    const report = await dataMapperArticle.postArticle(values);
    if (report.rowCount) {
      res.status(200).send(`L'article à été poster!`);
    } else {
      throw new APIError(`La mise à jour n'est pas possible !`);
    }
  },

};

module.exports = adminControllerArticle;
