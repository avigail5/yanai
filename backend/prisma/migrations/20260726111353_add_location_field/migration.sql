CREATE EXTENSION IF NOT EXISTS postgis;
-- AlterTable
ALTER TABLE "tasks" ADD COLUMN "location" geometry(Point, 4326);