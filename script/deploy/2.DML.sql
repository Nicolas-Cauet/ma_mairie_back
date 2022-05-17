-- Deploy mamairie:2.DML to pg

BEGIN;

INSERT INTO "town_hall" ("name","adress","phonenumber","hourly","insee","email")
VALUES('Mairie de grisolles','8 rue du Pommelottier','0945784578','Lundi : de 11h a 12h30  Le Jeudi : de 08h:30 à 11h00 Le Vendredi : de 16h30 à 18h00','02356','mairie.grisolles02@gmail.com');

INSERT INTO "town_hall" ("name","adress","phonenumber","hourly","insee","email")
VALUES('mairie de Gandelu','23 bis Grande rue','0323714114','Du lundi au vendredi : de 08h30 à 12h00 de 13h30 à 17h00 Le samedi : de 10h00 à 12h00 (accueil ouvert le samedi uniquement sur rendez-vous)','02810',' mairie-de-gandelu@wanadoo.fr');


COMMIT;
