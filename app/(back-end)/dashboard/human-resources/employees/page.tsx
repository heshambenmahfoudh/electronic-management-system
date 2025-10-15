import React from 'react'
import { getServerUser } from '@/actions/auth'
import { getEmployees } from '@/actions/employees'
import { getHumanResourcePermissionById } from '@/actions/permissions/humanResourcePermission'
import EmployeesData from '@/components/ListData/employeesData'
import { redirect } from 'next/navigation'

export default async function Employees() {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const officeId = session?.office?.id

  const data = (await getEmployees(officeId!))?.data || []
  const permission = (await getHumanResourcePermissionById(session?.id))?.data
  if (!permission?.employeeDisplay) {
    redirect('/authrization')
  }
  return <EmployeesData data={data} permission={permission} />
}
