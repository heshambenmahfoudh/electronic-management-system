import React from 'react'
import DepartmentsAcademicDataData from '@/components/ListData/departments-academicData'
import { getServerUser } from '@/actions/auth'
import { redirect } from 'next/navigation'
import { getDepartmentAcademics } from '@/actions/departmentAcademics'
import { getHumanResourcePermissionById } from '@/actions/permissions/humanResourcePermission'

export default async function AcadimicsDepartments() {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const permission = (await getHumanResourcePermissionById(session?.id))?.data
  if (!permission?.departmentAacademicDisplay) {
    redirect('/authrization')
  }
  const officeId = session?.office?.id ?? ''
  const data = (await getDepartmentAcademics(officeId)).data || []
  return <DepartmentsAcademicDataData data={data} permission={permission} />
}
