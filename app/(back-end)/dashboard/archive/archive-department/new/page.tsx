import React from 'react'
import DepartmentArchiveForm from '@/components/forms/DepartmentArchiveForm'
import { getServerUser } from '@/actions/auth'
import { getArchiveMessagePermissionById } from '@/actions/permissions/archiveMessagePermissions'
import { redirect } from 'next/navigation'

export default async function newDepartmentArchive() {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const permission = (await getArchiveMessagePermissionById(session?.id))?.data
  if (!permission?.departmentArchiveCreate) {
    redirect('/authrization')
  }
  return <DepartmentArchiveForm />
}
