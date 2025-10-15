/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `userAccessToken` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sessionId]` on the table `userRefrechToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "userAccessToken_sessionId_key" ON "userAccessToken"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "userRefrechToken_sessionId_key" ON "userRefrechToken"("sessionId");
