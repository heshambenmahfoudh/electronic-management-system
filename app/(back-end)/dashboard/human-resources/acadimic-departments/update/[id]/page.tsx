import React from 'react'
import { getServerUser } from '@/actions/auth'
import { getDepartmentAacademicById } from '@/actions/departmentAcademics'
import { getHumanResourcePermissionById } from '@/actions/permissions/humanResourcePermission'
import AcadimecDepartmentForm from '@/components/forms/AcadimecDepartmentForm'
import { AcadimicDepartment } from '@prisma/client'
import { redirect } from 'next/navigation'

export default async function UpdateAcadimicDepartment({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const permission = (await getHumanResourcePermissionById(session?.id))?.data
  if (!permission?.departmentAacademicUpdate) {
    redirect('/authrization')
  }
  const { id } = await params
  const data = (await getDepartmentAacademicById(id))
    ?.data as AcadimicDepartment
  return <AcadimecDepartmentForm isUpdate={id} initialData={data} />
}
