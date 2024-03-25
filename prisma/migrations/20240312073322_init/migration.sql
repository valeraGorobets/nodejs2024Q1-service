-- AlterTable
ALTER TABLE "User" ALTER COLUMN "version" SET DEFAULT 1,
ALTER COLUMN "version" DROP DEFAULT;
DROP SEQUENCE "User_version_seq";

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "grammy" BOOLEAN NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);
