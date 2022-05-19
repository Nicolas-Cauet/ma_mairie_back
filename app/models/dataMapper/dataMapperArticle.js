const client = require(`../dbClient`);

/**
 *@type {Object}
 *@export dataMapperArticle
 *@namespace dataMapperArticle
 */
const dataMapperArticle = {
  /**
   * The method returns the list of all articles as visitor
   * @menberof getAllArticleAdmin
   * @method getAllArticleAdmin
   * @param {Number} townHallId
   * @returns {Object} Return all articles
   */
  async getAllArticleAdmin(townHallId) {
    const query = {
      text: `SELECT * FROM article
            WHERE town_hall_id = $1;`,
      values: [townHallId],
    };
    const data = await client.query(query);
    return data.rows;
  },
  /**
   * The method returns one article as visitor
   * @menberof getAllArticleAdmin
   * @method getOneArticle
   * @param {Number} articleId
   * @returns Return one article
   */
  async getOneArticle(articleId) {
    const query = {
      text: `SELECT * FROM article
              WHERE article_id = $1;`,
      values: [articleId],
    };
    const data = await client.query(query);
    return data.rows;
  },
  /**
   * The method delete one article as administrator
   * @menberof getAllArticleAdmin
   * @method deleteArticle
   * @param {Number} id
   * @returns void
   */
  async deleteArticle(id) {
    const query = {
      text: `DELETE FROM article
              WHERE article_id = $1`,
      values: [id],
    };
    const data = await client.query(query);
    return data;
  },
  /**
   * The method allows to update an article as administrator
   * @menberof getAllArticleAdmin
   * @method modifyArticle
   * @param {object} object
   * @returns void
   */
  async modifyArticle(object) {
    const query = {
      text: `UPDATE article
      SET title = $1, description = $2, summarize = $3, image = $4, author = $5, article_categorie = $6, article_color = $7
      WHERE article_id = $8; `,
      values: [
        object.title,
        object.description,
        object.summarize,
        object.image,
        object.author,
        object.article_categorie,
        object.article_color,
        object.article_id,
      ],
    };
    const data = await client.query(query);
    return data;
  },
  /**
   * The method allows you to post an article not as administrator
   * @menberof getAllArticleAdmin
   * @method postArticle
   * @param {object} object
   * @returns void
   */
  async postArticle(object) {
    const query = {
      text: `INSERT INTO article
            (title, description, summarize, image, author, article_categorie, article_color, town_hall_id)
      VALUES ($1, $2, $3, $4,  $5,  $6, $7, $8)`,
      values: [
        object.title,
        object.description,
        object.summarize,
        object.image,
        object.author,
        object.article_categorie,
        object.article_color,
        object.article_id,
      ],
    };
    const data = await client.query(query);
    if (data.Error === `une valeur NULL viole la contrainte NOT NULL de la colonne « description » dans la relation « article »`) {
      throw new Error(`Le champs description est requis !`);
    }
    return data;
  },

  /**
   * The method allows to retrieve all the articles as visitor
   * @menberof getAllArticleAdmin
   * @method postArticle
   * @param {object} object
   * @returns {array}
   */
  async getAllArticle(townHallId) {
    const query = {
      text: `SELECT * FROM article
                    WHERE town_hall_id = $1;`,
      values: [townHallId],
    };
    const data = await client.query(query);
    return data.rows;
  },
};

module.exports = dataMapperArticle;
