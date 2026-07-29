CREATE EXTENSION IF NOT EXISTS postgis;
-- AlterTable
ALTER TABLE "hafifa"."tasks" ADD COLUMN "location" public.geometry(Point, 4326);