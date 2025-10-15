import React from 'react'
import { getServerUser } from '@/actions/auth'
import { getHumanResourcePermissionById } from '@/actions/permissions/humanResourcePermission'
import AcadimecDepartmentForm from '@/components/forms/AcadimecDepartmentForm'
import { redirect } from 'next/navigation'

export default async function NewAcadimicDepartment() {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const permission = (await getHumanResourcePermissionById(session?.id))?.data
  if (!permission?.departmentAacademicCreate) {
    redirect('/authrization')
  }
  return <AcadimecDepartmentForm />
}
