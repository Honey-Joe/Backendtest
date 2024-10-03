-- CreateTable
CREATE TABLE "Techx" (
    "partid" TEXT NOT NULL,
    "dept" TEXT NOT NULL,

    CONSTRAINT "Techx_pkey" PRIMARY KEY ("partid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Techx_partid_key" ON "Techx"("partid");
