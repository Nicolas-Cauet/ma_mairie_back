obtient, 1N SIGNALEMENT, ON STATUT
SIGNALEMENT: titre, email, tel, nom, prénom, texte, image, statut_id
Possède1, 0N SIGNALEMENT, 1N SIGNALEMENT_CATEGORIE
SIGNALEMENT_CATEGORIE: nom
ARTICLE_CATEGORIE: nom, couleur

STATUT: nom
Gère, 1N ADMIN, 0N SIGNALEMENT
Comporte, 1N ACTUALITE, 0N ARTICLE
ARTICLE: titre, description,résumer, image, auteur, date_creation, date_modification
Possède2, 0N ARTICLE_CATEGORIE, 1N ARTICLE

CONTACT: nom, adresse, tel, email
ADMIN: pseudo, mdp, insee,email
ACTUALITE: titre,image
Associé, 1N EVENEMENT, 0N ARTICLE
EVENEMENT: nom, date