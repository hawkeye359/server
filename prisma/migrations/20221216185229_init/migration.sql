-- CreateTable
CREATE TABLE "Schedule" (
    "id" INTEGER NOT NULL,
    "timing" TEXT NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" BIGINT NOT NULL,
    "scheduleId" INTEGER NOT NULL,
    "sessionPackage" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "fee_current" BOOLEAN NOT NULL,
    "fee_next_month" BOOLEAN NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_id_key" ON "Schedule"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
