import React from 'react'
import { getUserById } from '@/actions/users'
import UserForm from '@/components/forms/UserForm'
import { User } from '@prisma/client'
import { getServerUser } from '@/actions/auth'
import { redirect } from 'next/navigation'
import { getUserPermissionById } from '@/actions/permissions/userPermissions'

export default async function UpdateUser({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const { id } = await params
  const data = (await getUserById(id))?.data as User
  const permission = (await getUserPermissionById(session?.id))?.data
  if (!permission?.userUpdate) {
      redirect('/authrization')
  }
  return <UserForm isUpdate={id} initialData={data} />
}
