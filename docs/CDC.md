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
  - Articles d'actualités
  - Outils de communication entre les citoyens et la mairie (arbres tombés, panneaux ou routes endommagé, etc).
  - Les informations principales (équipe municipale, horaire d'ouverture, déchétterie, ramassage des ordures,...).
  - Composition de l'équipe municipale.
  - Information sur l'école (horraire école, garderie, contact, ...).
  - Information des différents contacts de la commune.
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
  - Axios
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
| Route | URl | Page| 
| :--------------- |:---------------:| -----:|
|GET | / | HomePage|
|GET | /articles | articles |
|GET | /articles/:id | article |
|GET | /reporting/| Signalements |
|GET | /reporting/:id| Signalement |
|GET | /reports| Signaler
*|POST | /reporting| Signaler ***
|GET | /council| Conseil |
|GET | /school| Ecole |
|GET | /servicies| Services |
|GET | /login| Connexion |
*|POST | /login| Connexion | ***
|GET | /sign-up| S'incrire |
*|POST | /sign-up| S'incrire | ***
|GET | /admin| Espace administration|
|GET | /admin/new-articles | Créer un article|
*|POST | /admin/new-articles | Créer un article| ***
|GET | /admin/articles | Liste des articles|
*|DELETE | /admin/articles/:id | Effacer un articles| ***
|GET | /admin/articles/:id | Editer un article|
*|PATCH | /admin/articles/:id | Editer un article| ***
|GET | /admin/reporting | Liste des signalements|
|GET | /admin/reporting/:id | Répondre à un signalement|
*|PATCH | /admin/reporting/:id | Répondre à un signalement|  *** Champs réponse et photos réponse en DB ? ***
*|DELETE | /admin/reporting/:id | Effacer un signalement| ***
|GET | /admin/new-services | Ajouter un service |   
*|POST | /admin/new-services | Ajouter un service |  *** Champs texte pour horraire des services ? ***
|GET | /admin/services | Afficher la liste des services |
*|DELETE | /admin/services/:id | Effacer un service | ***
|GET | /admin/services/:id | Editer un service |
*|PATCH | /admin/services/:id | Editer un service | ***
|GET | /admin/council | Modifier le conseil |
*|POST | /admin/council | Créer un conseiller | ***
*|PATCH | /admin/council | Modifier un conseiller | ***
*|DELETE | /admin/council | Supprimer un conseiller | ***
|GET | /notFound/ | 404 |


## Back
| Route  | URL | Page | data |
| :--------------- |:---------------:| -----:|------:|
## VISITEUR

### HOME PAGE
|GET | / | HomePage| actualités, image de la mairie , toutes les infos de la mairie , url reseau facebook twitter |
|GET | /connexion | connexion| email, mot de passe, code INSEE |
|POST | /inscription | inscription | email, mot de passe, code INSEE |

### SERVICES
|GET | /services | services | toutes les infos des services (logo,nom,adresse,téléphone)|

### DECHETTERIE
|GET | /wasteDisposal | Dechetterie | image de la mairie , toutes les infos du service , url reseau facebook twitter|

### RAMASSAGE DES DECHETS
|GET | /wasteCollection | ramassage des déchets | image de la mairie , toutes les infos du service , url reseau facebook twitter|

### ARTICLES
|GET|/articles| all articles|
|GET|/articles/:id| one articles|

### ECOLE
|GET | /school | Ecole |image de mairie ,image de ecole , toutes les infos de l'école , url reseau facebook twitter |

### CONSEIL MUNICIPAL
|GET | /municipalCouncil | Conseil Municipal |image de mairie,toutes les infos du personnel de la mairie , url reseau facebook twitter |

### SIGNALEMENT 
|GET | /reporting | Signalements |image de mairie,toutes les informations des signalements , url reseau facebook twitter |
|GET | /reporting/:id | Signalement |image de mairie, ,toutes les informations du signalement, url reseau facebook twitter |
|POST | /createReporting |  Créer signalement |image de mairie, ,toutes les informations du signalement,toutes les categories, url reseau facebook twitter |

## ADMIN


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

