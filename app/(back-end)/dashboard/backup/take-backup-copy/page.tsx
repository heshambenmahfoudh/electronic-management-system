import { getServerUser } from '@/actions/auth'
import { getBackupPermissionById } from '@/actions/permissions/backupPermissions'
import BackupForm from '@/components/forms/BackupForm'
import { redirect } from 'next/navigation'

export default async function BackupCopy() {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const permission = (await getBackupPermissionById(session?.id))?.data
  if (!permission?.takeBackupDisplay) {
     redirect('/authrization')
  }
  return <BackupForm permission={permission} />
}
