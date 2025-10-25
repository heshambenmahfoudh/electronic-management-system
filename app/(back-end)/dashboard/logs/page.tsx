import { getServerUser } from '@/actions/auth'
import { getDashboardPermissionById } from '@/actions/permissions/dashboardPermissions'
import { getUserLogs } from '@/actions/userLogs'
import LogsData from '@/components/ListData/logsData'
import { redirect } from 'next/navigation'

export default async function logs() {
  const session = await getServerUser() 
  if (!session) {
    redirect('/login')
  }
  const officeId = session?.office?.id
  
  const data = (await getUserLogs(officeId!))?.data || []
  const permission = (await getDashboardPermissionById(session?.id))?.data 

  if (!permission?.userLogDisplay) {
     redirect('/authrization')
  }
  return (
    <LogsData data={data} permission={permission}/>
  )
}
