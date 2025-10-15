import React from 'react'
import {  getAdministrativePosittions } from '@/actions/administrativePosittions'
import { getServerUser } from '@/actions/auth'
import AdministrativePositionsData from '@/components/ListData/administrative-positionsData'
import { redirect } from 'next/navigation'
import { getHumanResourcePermissionById } from '@/actions/permissions/humanResourcePermission'

export default async function AdministrativePositions() {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const permission = (await getHumanResourcePermissionById(session?.id))?.data
    if (!permission?.adminstrativeDisplay) {
      redirect('/authrization')
    }
  const officeId = session?.office?.id ?? ''
  const data = (await getAdministrativePosittions(officeId)).data || []
  return <AdministrativePositionsData data={data} permission={permission} />
}
