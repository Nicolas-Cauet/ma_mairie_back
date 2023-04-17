const joi = require(`joi`);

const schemaCreateArticle = joi.object({
  title: joi.string().required().error(new Error(`Le champ titre est requis`)),
  description: joi.string().required().error(new Error(`Le champ description est requis !`)),
  summarize: joi.string().required().error(new Error(`Le champ resummé est requis !`)),
  image: joi.string(),
  author: joi.string().required().error(new Error(`Le champ author est requis !`)),
  article_categorie: joi.string(),
  article_color: joi.string(),
  town_hall_id: joi.string(),
});

module.exports = schemaCreateArticle;
