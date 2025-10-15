import React from 'react'
import { getOfficeById } from '@/actions/offices'
import OfficeForm from '@/components/forms/OfficeForm'
import { Office } from '@prisma/client'
import { getServerUser } from '@/actions/auth'
import { redirect } from 'next/navigation'
import { getOfficePermissionById } from '@/actions/permissions/officePermissions'

export default async function UpdateOffice({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }

  const { id } = await params

  const data = (await getOfficeById(id))?.data as Office
  const permission = (await getOfficePermissionById(session?.id))?.data
  if (!permission?.officeUpdate) {
   redirect('/authrization')
  }
  return <OfficeForm isUpdate={id} initialData={data} />
}
