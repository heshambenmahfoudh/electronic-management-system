import { getServerUser } from '@/actions/auth'
import { getOfficePermissionById } from '@/actions/permissions/officePermissions'
import OfficeForm from '@/components/forms/OfficeForm'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function newOffice() {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const permission = (await getOfficePermissionById(session?.id))?.data
  if (!permission?.officeCreate) {
     redirect('/authrization')
  }
  return <OfficeForm />
}
