créer, ON MAIRIE , 11 ADMIN
ADMIN: pseudo, mdp, insee,email
Possède3, 11 SIGNALEMENT, 0N MAIRIE
SIGNALEMENT: titre, email, tel, nom, prénom, admin_texte,user_texte,admin_image, user_image, statut_id,signalement_statut,signalement_categorie
administrer1, 0N ADMIN, 1N SIGNALEMENT

SERVICE: nom, adresse, tel, email,image,logo,horaire
administrer2, 0N ADMIN, 1N SERVICE
ARTICLE: titre, description,résumer, image, auteur, date_creation, date_modification,article_categorie,article_color
Possède4, 11 ARTICLE, 0N MAIRIE
MAIRIE:nom,adresse,téléphone,horaire,email

administrer4, 0N ADMIN, 1N ARTICLE
administrer3, 0N ADMIN, 1N PERSONNEL_MAIRIE
PERSONNEL_MAIRIE: nom,prénom,role,photo
Possède1, 11 PERSONNEL_MAIRIE, 1N MAIRIE
Possède2, 11 SERVICE, 0N MAIRIE