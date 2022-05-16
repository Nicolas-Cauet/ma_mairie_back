const client = require(`../dbClient`);

const dataMapperArticle = {
  async getAllArticleAdmin(townHallId) {
    const query = {
      text: `SELECT * FROM article
            WHERE town_hall_id = $1;`,
      values: [townHallId],
    };
    const data = await client.query(query);
    return data.rows;
  },
  async getOneArticle(articleId) {
    const query = {
      text: `SELECT * FROM article
              WHERE article_id = $1;`,
      values: [articleId],
    };
    const data = await client.query(query);
    return data.rows;
  },
  async deleteArticle(id) {
    const query = {
      text: `DELETE FROM article
              WHERE article_id = $1`,
      values: [id],
    };
    const data = await client.query(query);
    return data;
  },
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
    return data;
  },
};

module.exports = dataMapperArticle;
