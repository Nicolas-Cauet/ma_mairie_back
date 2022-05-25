-- Revert mamairie:4.index from pg

BEGIN;

DROP INDEX reporting_index;
DROP INDEX town_hall_staff_index;

COMMIT;
