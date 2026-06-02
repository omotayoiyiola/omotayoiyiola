-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "websiteUrl" TEXT;

-- CreateTable
CREATE TABLE "EducationHistory" (
    "id" SERIAL NOT NULL,
    "school" TEXT NOT NULL,
    "courseStudied" TEXT NOT NULL,
    "startYear" TEXT NOT NULL,
    "endYear" TEXT,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EducationHistory_pkey" PRIMARY KEY ("id")
);
