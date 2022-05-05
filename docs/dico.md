# Dictionnaire des données

## Table Admin

| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
| admin_id | INT | GENERATED ALWAYS AS IDENTITY PRIMARY KEY | 
the table identifier |
| pseudo | TEXT(20) | NOT NULL | admin username |
| insee | TEXT | NOT NULL UNIQUE |the insee code of the town hall |
| password | TEXT | NOT NULL | the administrator password
|
| email | TEXT | NOT NULL | Administrator email |
| town_hall_id | INT | | REFERENCES town_hall(town_hall_id)| 
the relationship identifier |
| created_at |TIMESTAMPTZ|DEFAULT NOW()|creation date|
| updated_at |TIMESTAMPTZ||modification date|

## Table Reporting

| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
| reporting_id | INT |GENERATED ALWAYS AS IDENTITY PRIMARY KEY| 
the table identifier |
| title | TEXT(30) | NOT NULL | the title of the report |
| email | TEXT | NOT NULL | Visitor's email |
| phonenumber | INT(10) | NOT NULL | The visitor's phone number |
| first_name | TEXT | NOT NULL | Visitor's first name |
| last_name | TEXT | NOT NULL | Visitor's last name |
| user_text | TEXT |NOT NULL | visitor's description of the problem |
| admin_text | TEXT |NOT NULL | the administrator's answer to the problem |
| user_image | TEXT || Problem Visitor Image|
| admin_image | TEXT || Problem admin image |
| reporting_category | TEXT || Report category |
| reporting_statut | TEXT || statut du signalement |
| town_hall_id | INT || REFERENCES town_hall(town_hall_id)| the relationship identifier |
|created_at|TIMESTAMPTZ|DEFAULT NOW()|creation date|
|updated_at|TIMESTAMPTZ||modification date|



## Table Article

| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
|article_id| INT |GENERATED ALWAYS AS IDENTITY PRIMARY KEY|
the table identifier|
|title| TEXT(30) | NOT NULL | the title of the article |
|description| TEXT | NOT NULL | article description |
|summarize| TEXT || article description |
|image| TEXT | NULL |article Picture|
|author| TEXT | NOT NULL | article author |
|article_categorie| TEXT || article category |
|article_color| TEXT || article color |
| town_hall_id | INT | | REFERENCES town_hall(town_hall_id)| the relationship identifier |
|created_at|TIMESTAMPTZ| DEFAULT NOW()|creation date|
|updated_at|TIMESTAMPTZ||modification date|


## Table Service

| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
|service_id|INT|GENERATED ALWAYS AS IDENTITY PRIMARY KEY|
the table identifier|
|service_name|TEXT|NOT NULL|The service name|
|phonenumber|TEXT|NOT NULL|The service number|
|adress|TEXT|NOT NULL| service address |
|email | TEXT | NOT NULL | Service email |
|image | TEXT | NULL | service picture |
|logo | TEXT || logo image |
|hourly | TEXT || The service hourly |
| town_hall_id | INT | | REFERENCES town_hall(town_hall_id)| the relationship identifier |
|created_at|TIMESTAMPTZ| DEFAULT NOW()|creation date|
|updated_at|TIMESTAMPTZ||modification date|


## Table town_hall
| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
|town_hall_id| INT |GENERATED ALWAYS AS IDENTITY PRIMARY KEY|
the table identifier |
|name|TEXT|NOT NULL UNIQUE|town hall name|
|adresse|TEXT|NOT NULL|Town hall address|
|phonenumber|INT(10)|town hall phone number|
|horaire|TEXT|town hall hours|
|email|TEXT|town hall email |
|created_at|TIMESTAMPTZ| DEFAULT NOW()|creation date|
|updated_at|TIMESTAMPTZ||modification date|

## Table town_hall_staff
| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
|town_hall_staff_id| INT |GENERATED ALWAYS AS IDENTITY PRIMARY KEY|
the table identifier |
|last_name|TEXT|NOT NULL|name of the town hall staff|
|first_name|TEXT|NOT NULL|first name of the town hall staff|
|role|TEXT|NOT NULL|function of the town hall staff|
|photo|TEXT||photo of town hall staff|
| town_hall_id | INT | | REFERENCES town_hall(town_hall_id)| the relationship identifier |
|created_at|TIMESTAMPTZ| DEFAULT NOW()|creation date|
|updated_at|TIMESTAMPTZ||modification date|


## Table Service_admin

| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
| admin_id | INT | | REFERENCES admin(admin_id)| the relationship identifier |
| service_id | INT | | REFERENCES service(service_id)| the relationship identifier |

## Table Reporting_admin

| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
| admin_id | INT | | REFERENCES admin(admin_id)| the relationship identifier |
| reporting_id | INT | | REFERENCES reporting(reporting_id)| the relationship identifier |

## Table article_admin

| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
| admin_id | INT | | REFERENCES admin(admin_id)| the relationship identifier |
| article_id | INT | | REFERENCES article(article_id)| the relationship identifier |

## Table town_hall_staff_admin

| Champ | Type | Spécificités | Description | 
| :--------------- |:-----------:| -----:|------:|
| admin_id | INT | | REFERENCES admin(admin_id)| the relationship identifier |
| town_hall_staff_id | INT | | REFERENCES town_hall_staff(town_hall_staff_id)| the relationship identifier |