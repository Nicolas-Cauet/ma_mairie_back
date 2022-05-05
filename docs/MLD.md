ADMIN(admin_id, pseudo,insee, password,email,town_hall_id,created_at,updated_at)

REPORTING(reporting_id, title, email, phonenumber, first_name, last_name,user_text,admin_text, user_image,admin_image,reporting_statut,reporting_category,town_hall_id, created_at, updated_at)

ARTICLE(article_id,title ,summarize, description, image ,author,article_categorie,article_color,town_hall_id, created_at, updated_at)

SERVICE(service_id, service_name, phonenumber, adress, email,image,logo,horaire,town_hall_id,created_at,updated_at)

TOWN_HALL(town_hall_id,nom,adresse,téléphone,horaire,email,created_at,updated_at)

TOWN_HALL_STAFF(town_hall_staff_id,nom,prénom,role,photo,town_hall_id,created_at,updated_at)

SERVICE_ADMIN(service_id,admin_id)
REPORTING_ADMIN(reporting_id,admin_id)
ARTICLE_ADMIN(article_id,admin_id)
TOWN_HALL_STAFF_ADMIN(town_hall_staff_id,admin_id)