ACTUALITE:
Comporte, 1N ACTUALITE, 0N ARTICLE
ARTICLE: titre, texte, image, auteur, date_creation, date_modification
Possède, 0N CATEGORIE, 1N ARTICLE

Gère, 1N ADMIN, 0N SIGNALEMENT
SIGNALEMENT: titre, email, tel, nom, prénom, texte, image, statut_id
Associé, 1N EVENEMENT, 0N ARTICLE
CATEGORIE: nom, couleur
obtient, 1N SIGNALEMENT, ON STATUT
STATUT: nom

ADMIN: pseudo, mdp, email
CONTACT: nom, adresse, tel, email
EVENEMENT: nom, date,
: