-- Deploy mamairie:2.DML to pg

BEGIN;

INSERT INTO "town_hall" ("name","adress","phonenumber","hourly","insee","email")
VALUES('Mamairie','25,rue Oclock','0945784578','9 heure à 17 heure','51454','Mamairie@gmail.fr');

INSERT INTO "article"("title","description","summarize","author","article_categorie","article_color","town_hall_id")
VALUES('Vive la sauscice','Alors là! Permettez-moi de vous dire! Le coup du mystérieux chevalier gaulois solitaire à la rescousse de l’opprimé. Ca fait vraiment bidon comme légende! Oh mais jmen fais pas. Jvais mentrainer jusquà cque ça marche! Hé mais jai failli me la prendre! Sil vous plait! Faites pas votre mijoré! Moi je me fais traiter de gonzesse jen fais pas tout un cake! Ben attendez, je vais vous rendre la vôtre. Ptite pucelle!','Pas foutu de savoir son nom! Vous savez cest quand de même pas grave de pas savoir faire des tartes! Ben attendez, je vais vous rendre la vôtre.','AdminMaMairie','Fête','Red',1);

INSERT INTO "reporting" ("title","email","phonenumber","first_name","last_name","user_text","reporting_category","town_hall_id")
VALUES('Chien errant','citoyensmodèle@gmail.com','0688789531','maurice','gerant','J''ai vu un chien errant 6 rue du champ des loups, il etais noir avec des tache blanche de taille moyenne avec un petit museaux','animaux',1);

INSERT INTO "service"("service_name","phonenumber","adress","email","town_hall_id")
VALUES('Déchetterie','0120202012','8 place Gerard Durand','decheterie@gmail.com',1);

INSERT INTO "town_hall_staff"("last_name","first_name","role","town_hall_id")
VALUES('BigBoss','Aleks','Dieu',1);

COMMIT;
