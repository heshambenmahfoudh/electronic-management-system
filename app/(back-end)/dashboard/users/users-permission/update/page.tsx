import { getServerUser } from '@/actions/auth'
import { getUserPermissionById } from '@/actions/permissions/userPermissions'
import PermissionForm from '@/components/forms/permissions/PermissionForm'
import { redirect } from 'next/navigation'

export default async function UpdatePermissions() {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const permission = (await getUserPermissionById(session?.id))?.data
  if (!permission?.userPermissionDisplay) {
     redirect('/authrization')
  }
  return <PermissionForm session={session} />
}
