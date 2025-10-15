-- CreateTable
CREATE TABLE "acadimicDegree" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "officeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "acadimicDegree_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "acadimicDepartment" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "officeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "acadimicDepartment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "acadimicCertificate" TEXT NOT NULL,
    "officeId" TEXT NOT NULL,
    "degreeId" TEXT NOT NULL,
    "departmenOnetId" TEXT NOT NULL,
    "departmenTwotId" TEXT NOT NULL,
    "departmenThreetId" TEXT NOT NULL,
    "departmenFourtId" TEXT NOT NULL,
    "universiry" TEXT NOT NULL,
    "administrativePosittion" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "fileName" TEXT DEFAULT 'document',
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "acadimicDegree" ADD CONSTRAINT "acadimicDegree_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "offices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "acadimicDepartment" ADD CONSTRAINT "acadimicDepartment_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "offices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "offices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_degreeId_fkey" FOREIGN KEY ("degreeId") REFERENCES "acadimicDegree"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_departmenOnetId_fkey" FOREIGN KEY ("departmenOnetId") REFERENCES "acadimicDepartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_departmenTwotId_fkey" FOREIGN KEY ("departmenTwotId") REFERENCES "acadimicDepartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_departmenThreetId_fkey" FOREIGN KEY ("departmenThreetId") REFERENCES "acadimicDepartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee" ADD CONSTRAINT "employee_departmenFourtId_fkey" FOREIGN KEY ("departmenFourtId") REFERENCES "acadimicDepartment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
