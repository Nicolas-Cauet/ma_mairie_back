 # Présentation du projet 

Un site générique pour les mairies de commune et village à petit budget et petite population. 

Le projet à pour objectif de facilité la communication entre la mairie et les villageois et d'informer
les habitants sur l'actualité de leur commune.

- Un fil d'actualités,
- Des articles
- Outils de communication entre les citoyens et la mairie afin de signaler des problèmes,
- Les informations concernant le ramassage des ordures ménagères, le recyclage, les déchetteries, etc
- Les informations principales : contacts, horaires d'ouvertures, horraires des écoles, équipe municipale

## Cible du projet

O'mairie va aider à la communication dans les villages en centralisant les informations sur un site web
permettant de limiter les déplacement et les contraintes d'horaires d'ouvertures pour obtenir les infos
courantes. Il permettra de mettre à disposition un outils efficace pour signaler de problèmes, des incidents
rapidement.


# Fonctionnalités du projet



## MVP : 
  - Fil d'actualités,
  - Articles d'actualités (v1.1)
  - Outils de communication entre les citoyens et la mairie (arbres tombés, panneaux ou routes endommagé, etc).
  - Les informations principales (équipe municipale, horaire d'ouverture, déchétterie, ramassage des ordures,...).
  - Composition de l'équipe municipale.
  - Information sur l'école (horraire école, garderie, contact, ...).
  - Information des différents contacts de la commune (v1.1)
  - Administration du site (création des articles, gestion des signalements, modification des infos courantes, édition du fils d'actualité).
  - Outil d'inscription et de connexion.

## Evolutions possibles par la suite
  - Agenda des différents événement de la commune.
  - Un annuaire des commerces et services de la commune.
  - Mettre en place un système édition du fil actualités.
  - Poste sur facebook/twitter quand un article ou événement d'agenda est crée.
  - Ajout des associations de la communes
  - Informations sur salle des fêtes (ou autres locaux municipaux) avec calendrier de réservations (à titre indicatif)
  - Widget météo
  - Widget Google Map
  - Envoi SMS pour alerte météo /travaux eléctrique, téléphonique coupure eaux
  - Système d'alerte par SMS
  - Explorer les alentours (découvrir la communes et ces environs)
  - Newsletter


# Liste des technologies utilisées

Front end en réact (SPA) (2 personnes)

  - Librairie de composant React
  - React
  - React-Dom
  - Redux
  - React-Router
  - React Modele (webpack, babel, ...)
  - Axios (consommation de l'API)
  - SASS
  - JS Docs
  - Mobile first
  - Yarn ou Npm
  - EsLint

Back end en NodeJs (2 personnes)
  - postgres
  - SQL
  - pgAdmin
  - JWT Token
  - Redis
  - Express
  - API Docs
  - Joi
  - Npm
  - Eslint
  - sqitch



# Navigateurs

  - Google Chrome
  - Mozilla Firefox
  - Opéra
  - Safari
  - Microsoft Edge


# Arboresence de l'application (Wireframes)

# Liste des routes


## Front

## VISITEUR
| Route | URL | Page |
| :--------------- |:---------------:| -----:|
|GET | / | HomePage|
|GET | /articles/:mairie_id | articles v1.1 |
|GET | /articles/:mairie_id/:id | article v1.1 |
|GET | /reporting/:mairie_id | Signalements |
<!-- |GET | /reporting/:id| Signalement | -->  <--- modal
|GET | /reports/:mairie_id | Signaler | (photos v2)
|GET | /council/:mairie_id | Conseil |
|GET | /school/:mairie_id | Ecole |
|GET | /services/:mairie_id | Services v1.1 |
|GET | /login | Connexion | <--- modal
*|POST | /login | Connexion | ***
|GET | /sign-up | S'incrire | <--- modal
*|POST | /sign-up | S'incrire | ***

## ADMIN
| Route | URl | Page| 
| :--------------- |:---------------:| -----:|
|GET | /admin/:mairie_id | Espace administration|
|GET | /admin/new-articles/:mairie_id | Créer un article|
|GET | /admin/articles/:mairie_id | Liste des articles|
|GET | /admin/articles/:mairie_id/:id | Editer un article|
*|PATCH | /admin/articles/:id | Editer un article| ***
|GET | /admin/reporting/:mairie_id | Liste des signalements|
|GET | /admin/reporting/:mairie_id/:Reporting_id | Répondre à un signalement|
*|PATCH | /admin/reporting/:id | Répondre à un signalement|  *** (photos v2)
*|DELETE | /admin/reporting/:id | Effacer un signalement| ***
|GET | /admin/new-services/:mairie_id | Ajouter un service v1.1|   
*|POST | /admin/new-services | Ajouter un service v1.1 | ***
|GET | /admin/services/:mairie_id | Afficher la liste des services v1.1 |
*|DELETE | /admin/services/:id | Effacer un service v1.1 | ***
|GET | /admin/services/:mairie_id/:id | Editer un service v1.1|
*|PATCH | /admin/services/:id | Editer un service v1.1 | ***
|GET | /admin/council/:mairie_id | Modifier le conseil |
*|POST | /admin/council/:id | Créer un conseiller | ***
*|PATCH | /admin/council/:id | Modifier un conseiller | ***
*|DELETE | /admin/council/id | Supprimer un conseiller | ***
|GET | /notFound/ | 404 |


## Back

## VISITEUR

### HOME PAGE
| Route  | URL | Page | data |
| :--------------- |:---------------:| -----:|------:|
|POST | /sign-up | signup |

### SIGNALEMENT 
| Route  | URL | Page | data |
| :--------------- |:---------------:| -----:|------:|
|POST | /reporting/mairie/:id | reporting |

## ADMIN

### ARTICLES

| Route  | URL | Page | data |
| :--------------- |:---------------:| -----:|------:|
|POST | /admin/articles/mairie_id/:id | admin/articles | |
|PUT | /admin/articles/:id/mairie_id/:id| admin/articles/:id |
|DELETE | /admin/articles/mairie_id/:id | Effacer un articles|

### SIGNALEMENT
| Route  | URL | Page | data |
| :--------------- |:---------------:| -----:|------:|
|PUT | /admin/reporting/update/:town_hall_id/:reporting_id | admin/reporting/update/town_hall_id |
|DELETE | /admin/reporting/:id/mairie_id/:id  | admin/reporting/:id  | |
|GET | /admin/reporting/:town_hall_id | /admin/reporting/:town_hall_id |
|GET | /admin/reporting/:town_hall_id/:reporting_id/ /admin/reporting/:town_hall_id/:reporting_id|

### SERVICES
| Route  | URL | Page | data |
| :--------------- |:---------------:| -----:|------:admin/services/:mairie_id | admin/services/mairie_id/:id | |
|PUT | /admin/reporting/:id/mairie_id/:id | admin/reporting/:id  | |
|DELETE | /admin/reporting/:id/mairie_id/:id | admin/reporting/:id  | |

### RAMASSAGE DES ORDURES
| Route  | URL | Page | data |
| :--------------- |:---------------:| -----:|------:|
|POST | /admin/wasteCollection/mairie_id/:id | admin | |
|POST | /admin/guide/mairie_id/:id | admin | |

### DECHETTERIE
|POST | /admin/wasteDisposal/mairie_id/:id | admin | |
|POST | /admin/hourly/mairie_id/:id | admin | |

### CONSEIL MUNICIPAL
|POST | /admin/council/mairie_id/:id | admin/council | |
|PUT | /admin/council/:id/mairie_id/:id | admin/council/:id  | |
|DELETE | /admin/council/:id/mairie_id/:id | admin/council/:id  | |






# Liste des Users Stories

Consulter fichier UserStories => https://docs.google.com/document/d/1By_hGjeAyNJz0kkGEKBSH05lswVHUNAiofYZUDo0jxw/edit


# Documents relatifs à la BDD

## MCD

Consulter fichier MCD => 

## MLD
Consulter fichier MLD => 

# Les rôles de chacun


## Product Owner :
le porteur de projet, connaît le produit et représente les besoins du client. Tranche en cas de conflits fonctionnels (pas techniques)
==> Anthony


## Scrum Master :
Garant de la méthode du projet, s’assure que les conventions sont respectées, assure la communication au sein du groupe, que les tâches sont bien attribuées, anime la réunion du matin et gère l’avancement du projet, maj le carnet de bord de l’équipe
=> Baptiste


## Lead Dev (1 front  et 1 back) :
choisit les orientations importantes, choix techniques importants, s’assure du bon fonctionnement de sa partie du projet
Lead Dev Front => Benjamin
Lead Dev Back => Nicolas


## Un référent technique :
git master, garant du bon fonctionnement du versionning, gère les conflits de merge, les pull requests
=> Nicolas

