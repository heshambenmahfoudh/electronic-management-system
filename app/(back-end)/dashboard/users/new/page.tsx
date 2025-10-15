import { getServerUser } from '@/actions/auth'
import { getUserPermissionById } from '@/actions/permissions/userPermissions'
import UserForm from '@/components/forms/UserForm'
import { redirect } from 'next/navigation'

export default async function newUser() {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const permission = (await getUserPermissionById(session?.id))?.data
  if (!permission?.userCreate) {
      redirect('/authrization')
  }
  return <UserForm />
}
