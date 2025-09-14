/*
  Warnings:

  - Added the required column `adopted` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."pets" ADD COLUMN     "adopted" BOOLEAN NOT NULL;
