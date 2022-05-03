EVENEMENT: nom, date
:
SIGNALEMENT_CATEGORIE: nom
Possède1, 0N SIGNALEMENT, 1N SIGNALEMENT_CATEGORIE
SERVICE: nom, adresse, tel, email,image,logo,horaire

Associé, 1N EVENEMENT, 0N ARTICLE
STATUT: nom
obtient, 1N SIGNALEMENT, ON STATUT
SIGNALEMENT: titre, email, tel, nom, prénom, texte, image, statut_id
Gère, 1N ADMIN, 0N SIGNALEMENT

ARTICLE: titre, description,résumer, image, auteur, date_creation, date_modification
Possède2, 0N ARTICLE_CATEGORIE, 1N ARTICLE
ARTICLE_CATEGORIE: nom, couleur
PERSONNEL_MAIRIE: nom,prénom,role,photo
ADMIN: pseudo, mdp, insee,email

Comporte, 1N ACTUALITE, 0N ARTICLE
ACTUALITE: titre,image
MAIRIE:nom,adresse,téléphone,horaire,email
Possède3, 11 PERSONNEL_MAIRIE, 1N MAIRIE
: