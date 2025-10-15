import React from 'react'
import { getDepartmentArchiveById } from '@/actions/departmentArchive'
import { DepartmentArchive } from '@prisma/client'
import DepartmentArchiveForm from '@/components/forms/DepartmentArchiveForm'
import { getArchiveMessagePermissionById } from '@/actions/permissions/archiveMessagePermissions'
import { redirect } from 'next/navigation'
import { getServerUser } from '@/actions/auth'

export default async function UpdateDepartmentArchive({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const { id } = await params
  const data = (await getDepartmentArchiveById(id))?.data as DepartmentArchive
  const permission = (await getArchiveMessagePermissionById(session?.id))?.data
  if (!permission?.departmentArchiveUpdate) {
      redirect('/authrization')
  }
  return <DepartmentArchiveForm isUpdate={id} initialData={data} />
}
