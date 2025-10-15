import React from 'react'
import { getOffices } from '@/actions/offices'
import { getServerUser } from '@/actions/auth'
import { getOfficePermissionById } from '@/actions/permissions/officePermissions'
import { redirect } from 'next/navigation'
import OfficesData from '@/components/ListData/officesData'

export default async function officesData() {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const officeId = session?.office?.id
  const data = (await getOffices(officeId))?.data || []
  const permission = (await getOfficePermissionById(session?.id))?.data
  if (!permission?.officeDisplay) {
    redirect('/authrization')
  }

  return <OfficesData data={data} permission={permission} />
}
