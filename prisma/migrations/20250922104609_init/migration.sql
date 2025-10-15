/*
  Warnings:

  - A unique constraint covering the columns `[messageId]` on the table `notification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "notification_messageId_key" ON "notification"("messageId");
