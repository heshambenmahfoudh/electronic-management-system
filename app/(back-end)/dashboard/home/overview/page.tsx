import { getServerUser } from '@/actions/auth'
import { getDashboardPermissionById } from '@/actions/permissions/dashboardPermissions'
import OverviewData from '@/components/ListData/overviewData'
import { redirect } from 'next/navigation'

export default async function Overview() {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const permission = (await getDashboardPermissionById(session?.id))?.data
  if (!permission?.homeDisplay) {
   redirect('/authrization')
  }

  return <OverviewData session={session} />
}
