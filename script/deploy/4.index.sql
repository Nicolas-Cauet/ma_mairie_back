-- Deploy mamairie:4.index to pg

BEGIN;

CREATE INDEX reporting_index ON reporting (user_text, admin_text);

CREATE INDEX town_hall_staff_index ON town_hall_staff (town_hall_staff_id);

COMMIT;
