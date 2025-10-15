import React from 'react'
import { getUserById } from '@/actions/users'
import { getServerUser } from '@/actions/auth'
import { User } from '@prisma/client'
import { redirect } from 'next/navigation'
import { getSettingPermissionById } from '@/actions/permissions/settingPermissions'
import UserProfileForm from '@/components/forms/UserProfileForm'

export default async function UpdateUserProfile() {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const id = session?.id
  const data = (await getUserById(id!))?.data as User
  const permission = (await getSettingPermissionById(id!))?.data
  if (!permission?.userDisplay) {
     redirect('/authrization')
  }

  return <UserProfileForm permission={permission} initialData={data} />
}
