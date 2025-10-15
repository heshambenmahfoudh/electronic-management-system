import React from 'react'
import { getServerUser } from '@/actions/auth'
import { getEmployeeById } from '@/actions/employees'
import { getHumanResourcePermissionById } from '@/actions/permissions/humanResourcePermission'
import EmployeeForm from '@/components/forms/EmployeeForm'
import { Employee } from '@prisma/client'
import { redirect } from 'next/navigation'

export default async function UpdateEmployee({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const permission = (await getHumanResourcePermissionById(session?.id))?.data
  if (!permission?.employeeUpdate) {
    redirect('/authrization')
  }
  const { id } = await params
  const data = (await getEmployeeById(id))?.data as Employee
  return <EmployeeForm isUpdate={id} initialData={data} />
}
