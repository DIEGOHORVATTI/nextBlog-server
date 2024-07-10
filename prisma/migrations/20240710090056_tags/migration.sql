-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "namme" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tags_namme_key" ON "tags"("namme");

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "blogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
