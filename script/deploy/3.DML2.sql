-- Deploy mamairie:3.DML2 to pg

BEGIN;

INSERT INTO "reporting" ("title","email","phonenumber","first_name","last_name","user_text","reporting_category","town_hall_id")
VALUES('Chien errant','alain.proviste.@gmail.com','0688789531','Alain','Proviste','Bonjour, J''ai vu un chien errant 6 rue du champ des loups, il etais noir avec des tache blanche de taille moyenne avec un petit museaux.','Animaux',1);

INSERT INTO "reporting" ("title","email","phonenumber","first_name","last_name","user_text","reporting_category","town_hall_id")
VALUES('Panneau stop endomagée','philippe.hine@gmail.com','0765963665','Philippe','Hine','Bonjour, je me permet de vous signalez que le panneau STOP au 7 rue Jean Castex à étais taguer avec un gros "49.3".','Autre',1);

INSERT INTO "reporting" ("title","email","phonenumber","first_name","last_name","user_text","reporting_category","town_hall_id")
VALUES('Un arbre et tomber sur la route','citoyensmodèle@gmail.com','0605020304','Maurice','Gerant','Bonjour, il y as un arbres qui est tomber en pleine rue au 78 rue de Maubuzan','Autre',1);


INSERT INTO "reporting" ("title","email","phonenumber","first_name","last_name","user_text","reporting_category","town_hall_id")
VALUES('Nid de poule sur la route','maurice.collet.@gmail.com','0503020104','Maurice','Collet','Bonjour, il y as un nid de poule en pleins millieux de la route sur L''Avenue Foche','Autre',2);

INSERT INTO "reporting" ("title","email","phonenumber","first_name","last_name","user_text","reporting_category","town_hall_id")
VALUES('Porte-feuille perdu ','eric.gentilhomme@gmail.com','0706040201','Eric','Gentilhomme','Bonjour, J''ai trouver un porte-feuille abandonée a coter du la fontaine d''eau dois-je vous le ramener ?  ".','Objet trouvé/perdu',2);

INSERT INTO "reporting" ("title","email","phonenumber","first_name","last_name","user_text","reporting_category","town_hall_id")
VALUES('Un arbre et tomber sur la route','citoyensmodèle@gmail.com','0605020304','Maurice','Gerant','Bonjour, il y as un arbres qui est tomber en pleine rue au 78 rue de Maubuzan','animaux',2);


INSERT INTO "article"("title","description","summarize","author","article_categorie","article_color","town_hall_id")
VALUES('Vive la sauscice','Alors là! Permettez-moi de vous dire! Le coup du mystérieux chevalier gaulois solitaire à la rescousse de l’opprimé. Ca fait vraiment bidon comme légende! Oh mais jmen fais pas. Jvais mentrainer jusquà cque ça marche! Hé mais jai failli me la prendre! Sil vous plait! Faites pas votre mijoré! Moi je me fais traiter de gonzesse jen fais pas tout un cake! Ben attendez, je vais vous rendre la vôtre. Ptite pucelle!','Pas foutu de savoir son nom! Vous savez cest quand de même pas grave de pas savoir faire des tartes! Ben attendez, je vais vous rendre la vôtre.','AdminMaMairie','Fête','Red',1);


INSERT INTO "service"("service_name","phonenumber","adress","email","town_hall_id")
VALUES('Déchetterie','0120202012','8 place Gerard Durand','decheterie@gmail.com',1);

COMMIT;
