CREATE EXTENSION IF NOT EXISTS postgis SCHEMA public;
-- AlterTable
ALTER TABLE "hafifa"."tasks" ADD COLUMN "location" public.geometry(Point, 4326);