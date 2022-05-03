ADMIN(admin_id, pseudo,insee, password,email,marie_id,created_at,updated_at)

REPORTING(reporting_id, title, email, phonenumber, first_name, last_name,user_text,admin_text, user_image,admin_image,reporting_statut,reporting_category,mairie_id, created_at, updated_at)

ARTICLE(article_id,title ,summarize, description, image ,author, creation_date, modification_date,article_categorie,article_color,marie_id created_at, updated_at)

SERVICE(service_id, service_name, phonenumber, adress, email,image,logo,horaire,mairie_id,created_at,updated_at)

MAIRIE(mairie_id,nom,adresse,téléphone,horaire,email,created_at,updated_at)

PERSONNEL_MAIRIE(personnel_mairie_id,nom,prénom,role,photo,mairie_id,created_at,updated_at)

SERVICE_ADMIN(service_id,admin_id)
REPORTING_ADMIN(reporting_id,admin_id)
ARTICLE_ADMIN(article_id,admin_id)
PERSONNEL_MAIRIE_ADMIN(personnel_mairie_id,admin_id)