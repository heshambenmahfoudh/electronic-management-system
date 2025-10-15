import React from 'react'
import { getAdministrativePosittionById } from '@/actions/administrativePosittions'
import { getServerUser } from '@/actions/auth'
import AdministrativepositionsForm from '@/components/forms/AdministrativepositionsForm'
import { AdministrativePosittion } from '@prisma/client'
import { redirect } from 'next/navigation'
import { getHumanResourcePermissionById } from '@/actions/permissions/humanResourcePermission'

export default async function UpdateAdministrativePositions({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const permission = (await getHumanResourcePermissionById(session?.id))?.data
  if (!permission?.adminstrativeUpdate) {
    redirect('/authrization')
  }
  const { id } = await params
  const data = (await getAdministrativePosittionById(id))
    ?.data as AdministrativePosittion
  return <AdministrativepositionsForm isUpdate={id} initialData={data} />
}
