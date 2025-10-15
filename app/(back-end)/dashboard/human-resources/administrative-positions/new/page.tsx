import React from 'react'
import { getServerUser } from '@/actions/auth'
import { getHumanResourcePermissionById } from '@/actions/permissions/humanResourcePermission'
import AdministrativepositionsForm from '@/components/forms/AdministrativepositionsForm'
import { redirect } from 'next/navigation'

export default async function NewAdministrativePositions() {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const permission = (await getHumanResourcePermissionById(session?.id))?.data
  if (!permission?.adminstrativeCreate) {
    redirect('/authrization')
  }
  return <AdministrativepositionsForm />
}
