import React from 'react'
import { getDepartmentArchives } from '@/actions/departmentArchive'
import { getServerUser } from '@/actions/auth'
import { getArchiveMessagePermissionById } from '@/actions/permissions/archiveMessagePermissions'
import { redirect } from 'next/navigation'
import DepartmentsArchiveData from '@/components/ListData/departments-archiveData'

export default async function departmentArchive() {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const officeId = session?.office?.id ?? ''
  const data = (await getDepartmentArchives(officeId)).data || []
  const permission = (await getArchiveMessagePermissionById(session?.id))?.data
  if (!permission?.departmentArchiveDisplay) {
     redirect('/authrization')
  }
  return <DepartmentsArchiveData data={data} permission={permission} />
}
