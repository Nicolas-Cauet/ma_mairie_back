-- Deploy opark:1.DML to pg

BEGIN;


CREATE TABLE IF NOT EXISTS "town_hall" (
  "town_hall_id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "adress" TEXT NOT NULL,
  "phonenumber" CHAR(10),
  "hourly" TEXT,
  "email" TEXT,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "admin" (
  "admin_id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "pseudo" VARCHAR(20),
  "insee" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "email" TEXT,
  "town_hall_id" INT NOT NULL REFERENCES town_hall(town_hall_id), 
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "article" (
  "article_id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title"  TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "summarize" TEXT NOT NULL,
  "image" TEXT NULL,
  "author" TEXT NOT NULL,
  "article_categorie" TEXT,
  "article_color" TEXT,
  "town_hall_id" INT NOT NULL REFERENCES town_hall(town_hall_id),
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "reporting" (
  "reporting_id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title"  VARCHAR(30) NOT NULL,
  "email" TEXT NOT NULL,
  "phonenumber" CHAR(10) NOT NULL,
  "first_name" TEXT NOT NULL,
  "last_name" TEXT NOT NULL,
  "user_image" TEXT,
  "user_text" TEXT NOT NULL,
  "admin_text" TEXT,
  "admin_image" TEXT,
  "reporting_category" TEXT,
  "reporting_statut" TEXT,
  "town_hall_id" INT NOT NULL REFERENCES town_hall(town_hall_id),
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "service" ( 
  "service_id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "service_name" TEXT NOT NULL,
  "phonenumber" TEXT NOT NULL ,
  "adress" TEXT NOT NULL ,
  "email" TEXT NOT NULL ,
  "image" TEXT,
  "logo" TEXT,
  "town_hall_id" INT NOT NULL REFERENCES town_hall(town_hall_id),
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "town_hall_staff" (
  "town_hall_staff_id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "last_name" TEXT,
  "first_name" TEXT,
  "role" TEXT,
  "photo" TEXT,
  "town_hall_id" INT NOT NULL REFERENCES town_hall(town_hall_id),
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS "service_admin" (
  "admin_id" INT REFERENCES admin("admin_id"),
  "service_id" INT REFERENCES service("service_id")
);

CREATE TABLE IF NOT EXISTS "reporting_admin" (
  "admin_id" INT REFERENCES admin("admin_id"),
  "reporting_id" INT REFERENCES reporting("reporting_id")
);

CREATE TABLE IF NOT EXISTS "article_admin" (
  "admin_id" INT REFERENCES admin("admin_id"),
  "article_id" INT REFERENCES article("article_id")
);

CREATE TABLE IF NOT EXISTS "town_hall_staff_admin" (
  "admin_id" INT REFERENCES admin("admin_id"),
  "town_hall_staff_id" INT REFERENCES town_hall_staff("town_hall_staff_id")
);

COMMIT;