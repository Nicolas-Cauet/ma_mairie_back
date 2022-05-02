ADMIN(admin_id, pseudo,insee, password,email,reporting_id,created_at,updated_at)

REPORTING(reporting_id, title, email, phonenumber, first_name, last_name,
text, image, statut, statut_id, created_at, updated_at)

REPORTING_CATEGORY(reporting_category_id, name,reporting_id, created_at, updated_at)

NEWS(news_id,title,image,article_id,created_at,updated_at)

ARTICLE(article_id,title ,summarize, description, image ,author, creation_date, modification_date, article_category_id, created_at, updated_at)

EVENT(event_id, name, date, article_id, updated_at, created_at)

CONTACT(contact_id, service_name, phonenumber, adress, email)

ARTICLE_CATEGORY(article_category_id, name, color, created_at, updated_at)

STATUT(statut_id, name, created_at, updated_at)

ACTUALITE(actualite_id,titre,image,article_id,created_at,updated_at)
