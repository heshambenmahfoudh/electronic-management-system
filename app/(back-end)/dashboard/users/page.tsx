import { getServerUser } from '@/actions/auth'
import { getUserPermissionById } from '@/actions/permissions/userPermissions'
import { getUsers } from '@/actions/users'
import UsersData from '@/components/ListData/usersData'
import { redirect } from 'next/navigation'

export default async function users() {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const officeId = session?.office?.id
  const data = (await getUsers(officeId!, session?.id))?.data || []
  const permission = (await getUserPermissionById(session?.id))?.data
  if (!permission?.userDisplay) {
     redirect('/authrization')
  }

  return <UsersData data={data} permission={permission} />
}
