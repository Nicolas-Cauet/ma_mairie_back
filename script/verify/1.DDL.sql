-- Verify opark:1.DML on pg

BEGIN;

SELECT "town_hall_id", "name", "adress","phonenumber","hourly","email" FROM "town_hall";
SELECT "admin_id", "pseudo", "insee","password","email","town_hall_id",FROM "admin";
SELECT "article_id", "title", "description", "summarize", "resolve_date", "attraction_id" FROM "article";
SELECT "service_id", "service_name", "phonenumber","adress","email","image","logo","town","town_hall_id" FROM "service";
SELECT "town_hall_staff_id", "last_name", "first_name","role","photo","town_hall_id", FROM "town_hall_staff";
SELECT "admin_id", "service_id" FROM "service_admin";
SELECT "admin_id", "reporting_id" FROM "reporting_admin";
SELECT "admin_id", "town_hall_staff_id" FROM "article_admin";
SELECT "admin_id" ,"visitor_id" FROM "town_hall_staff_admin";


ROLLBACK;