/*
  Warnings:

  - You are about to drop the column `org_id` on the `pets` table. All the data in the column will be lost.
  - Added the required column `id_org` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."pets" DROP CONSTRAINT "pets_org_id_fkey";

-- AlterTable
ALTER TABLE "public"."pets" DROP COLUMN "org_id",
ADD COLUMN     "id_org" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."pets" ADD CONSTRAINT "pets_id_org_fkey" FOREIGN KEY ("id_org") REFERENCES "public"."orgs"("id_org") ON DELETE RESTRICT ON UPDATE CASCADE;
