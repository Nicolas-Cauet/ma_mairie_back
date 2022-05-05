-- Revert mamairie:1.DDL from pg

BEGIN;

DROP TABLE IF EXISTS town_hall,admin,article,service,reporting,town_hall_staff,service_admin,reporting_admin,article_admin,town_hall_staff_admin CASCADE;

COMMIT;
