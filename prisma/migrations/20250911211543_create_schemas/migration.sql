-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ORG', 'MEMBER');

-- CreateEnum
CREATE TYPE "public"."Age" AS ENUM ('CUB', 'ADULT');

-- CreateEnum
CREATE TYPE "public"."EnergyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "public"."users" (
    "id_user" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'MEMBER',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "public"."orgs" (
    "id_org" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id_org")
);

-- CreateTable
CREATE TABLE "public"."pets" (
    "id_pet" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT,
    "age" "public"."Age",
    "energy_level" "public"."EnergyLevel",
    "photo_url" TEXT,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id_pet")
);

-- AddForeignKey
ALTER TABLE "public"."orgs" ADD CONSTRAINT "orgs_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "public"."users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "public"."orgs"("id_org") ON DELETE RESTRICT ON UPDATE CASCADE;
