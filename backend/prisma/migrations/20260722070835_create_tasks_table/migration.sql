-- CreateEnum
CREATE TYPE "task_status" AS ENUM ('open', 'in_process', 'closed');

-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "task_status" NOT NULL DEFAULT 'open',

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);
