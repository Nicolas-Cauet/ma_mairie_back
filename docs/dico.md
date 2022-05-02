# Dictionnaire des données

## Table Admin
| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
| admin_id | INT | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | l'identifiant de la table |
| pseudo | TEXT(20) | NOT NULL | Le pseudo de administrateur |
| password | TEXT | NOT NULL | Le mot de passe de administrateur
| email | TEXT | NOT NULL | Email de administrateur |


## Table Reporting
| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
|reporting_id| INT |GENERATED ALWAYS AS IDENTITY PRIMARY KEY| l'identifiant de la table |
|title| TEXT(30) | NOT NULL | le titre du reporting |
| email | TEXT | NOT NULL | Email du visiteur |
|phonenumber| INT(10) | NOT NULL | Le numéro de téléphone du visiteur |
|first_name| TEXT | NOT NULL | Le prénom du visiteur |
|last_name| TEXT | NOT NULL | Le nom du visiteur |
|texte| TEXT |NOT NULL | la description du problème |
|image| TEXT | NULL | Image du problème |
|statut_id| INT | REFERENCES status(status_id) | Le status du problème |
|created_at|TIMESTAMPTZ|DEFAULT NOW()|date de creation|
|updated_at|TIMESTAMPTZ||date de modification|

## Table Reporting_Category
| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
|reporting_category_id| INT |GENERATED ALWAYS AS IDENTITY PRIMARY KEY|l'identifiant de la table |
|name||TEXT|NOT NULL|Nom de la categorie|
|reporting_id| INT | REFERENCES reporting(reporting_id) | le status du problème |
|created_at|TIMESTAMPTZ| DEFAULT NOW()|date de creation|
|updated_at|TIMESTAMPTZ||date de modification|

## Table News
| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
|news_id| INT |GENERATED ALWAYS AS IDENTITY PRIMARY KEY|l'identifiant de la table|
|article_id|INT| REFERENCES article(article_id) | l'identifiant de relations|
|created_at|TIMESTAMPTZ DEFAULT NOW()||date de creation|
|updated_at|TIMESTAMPTZ||date de modification|


## Table Article
| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
|article_id| INT |GENERATED ALWAYS AS IDENTITY PRIMARY KEY|l'identifiant de la table|
|title| TEXT(30) | NOT NULL | le titre de l'article |
|description| TEXT | NOT NULL | la description de l'article |
|summarize| TEXT | NOT NULL | la description de l'article |
|image| TEXT | NULL |Image de l'article|
|author| TEXT | NOT NULL | Auteur de l'article |
|creation_date| DATE | NOT NULL | Date de la création de l'article |
|modification_date| DATE | NOT NULL | Date de modification de l'article |
|category_id| INT |REFERENCES category(category_id)|l'identifiant de relations|
|created_at|TIMESTAMPTZ| DEFAULT NOW()|date de creation|
|updated_at|TIMESTAMPTZ||date de modification|


## Table Event
| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
|event_id| INT |GENERATED ALWAYS AS IDENTITY PRIMARY KEY|l'identifiant de la table|
|name| TEXT | NOT NULL | Le nom de l'événement|
|date| DATE | NOT NULL | La date de l'événement|
|article_id| INT |REFERENCES article(article_id)| l'identifiant de relations|
|created_at|TIMESTAMPTZ| DEFAULT NOW()|date de creation|
|updated_at|TIMESTAMPTZ||date de modification|

## Table Article_Category
| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
|article_category_id| INT |GENERATED ALWAYS AS IDENTITY PRIMARY KEY|l'identifiant de la table |
|name||TEXT|NOT NULL|Nom de la mairie|
|color|CHAR(7)|NOT NULL|couleur du label|
|created_at|TIMESTAMPTZ| DEFAULT NOW()|date de creation|
|updated_at|TIMESTAMPTZ||date de modification|


## Table Contact
| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
|contact_id|INT|GENERATED ALWAYS AS IDENTITY PRIMARY KEY|l'identifiant de la table|
|service_name|TEXT|NOT NULL|Le nom du service|
|phonenumber|TEXT|NOT NULL|Le numéro du service|
|adress|TEXT|NOT NULL| l'adresse du service |
|email | TEXT | NOT NULL | Email du service |
|created_at|TIMESTAMPTZ| DEFAULT NOW()|date de creation|
|updated_at|TIMESTAMPTZ||date de modification|


## Table Statut
| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
|statut_id|INT|GENERATED ALWAYS AS IDENTITY PRIMARY KEY|l'identifiant de la table|
|name|TEXT|NOT NULL|Le nom du  status|
|created_at|TIMESTAMPTZ| DEFAULT NOW()|date de creation|
|updated_at|TIMESTAMPTZ||date de modification|

### TODO Actualite
| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
|actualite_id| INT |GENERATED ALWAYS AS IDENTITY PRIMARY KEY|l'identifiant de la table |
|titre||TEXT|NOT NULL|Nom de l'actualité|
|image| TEXT | NULL |Image de l'actualité|
|article_id| INT |REFERENCES article(article_id)| l'identifiant de relations|
|created_at|TIMESTAMPTZ| DEFAULT NOW()|date de creation|
|updated_at|TIMESTAMPTZ||date de modification|
