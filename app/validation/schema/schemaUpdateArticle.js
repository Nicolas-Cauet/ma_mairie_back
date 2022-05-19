const joi = require(`joi`);

const schemaCreateArticle = joi.object({
  title: joi.string().required().label(`Le champ titre est requis !`),
  description: joi.string().required().label(`Le champ description est requis !`),
  summarize: joi.string().required().label(`Le champ resummé est requis !`),
  image: joi.string(),
  author: joi.string().required().label(`Le champ author est requis !`),
  article_categorie: joi.string(),
  article_color: joi.string(),
  article_id: joi.string(),
});

module.exports = schemaCreateArticle;
