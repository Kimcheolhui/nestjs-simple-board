-- AlterTable
ALTER TABLE "User" ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid();
