import React from 'react'
import { getServerUser } from '@/actions/auth'
import { getOfficeById } from '@/actions/offices'
import { Office } from '@prisma/client'
import { TypeSesstionData } from '@/types/types'
import { redirect } from 'next/navigation'
import { getSettingPermissionById } from '@/actions/permissions/settingPermissions'
import OfficeProfileForm from '@/components/forms/OfficeProfileForm'

export default async function UpdateOfficeProfile() {
  const session = (await getServerUser()) as TypeSesstionData
  if (!session) {
    redirect('/login')
  }
  const officeId = session?.office?.id
  const id = session?.id
  const data = (await getOfficeById(officeId!))?.data as Office
  const permission = (await getSettingPermissionById(id!))?.data
  if (!permission?.officeDisplay) {
  redirect('/authrization')
  }
  return <OfficeProfileForm permission={permission} initialData={data} />
}
