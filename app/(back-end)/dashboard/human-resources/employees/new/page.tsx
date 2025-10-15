import React from 'react'
import { getServerUser } from '@/actions/auth'
import { getHumanResourcePermissionById } from '@/actions/permissions/humanResourcePermission'
import EmployeeForm from '@/components/forms/EmployeeForm'
import { redirect } from 'next/navigation'

export default async function NewEmployee() {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const permission = (await getHumanResourcePermissionById(session?.id))?.data
  if (!permission?.employeeCreate) {
    redirect('/authrization')
  }
  return <EmployeeForm />
}
