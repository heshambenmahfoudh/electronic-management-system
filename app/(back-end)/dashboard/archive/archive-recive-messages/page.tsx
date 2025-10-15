import React from 'react'
import { getReciveArchives } from '@/actions/reciveMessagesArchives'
import { getServerUser } from '@/actions/auth'
import { getArchiveMessagePermissionById } from '@/actions/permissions/archiveMessagePermissions'
import { redirect } from 'next/navigation'
import ReciveMessagesArchiveData from '@/components/ListData/recive-messages-archiveData'

export default async function archiveReciveMessages() {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const officeId = session?.office?.id ?? ''
  const data = (await getReciveArchives(officeId!))?.data || []
  const permission = (await getArchiveMessagePermissionById(session?.id))?.data
  if (!permission?.ArchiveReciveMessageDisplay) {
    redirect('/authrization')
  }

  return (
    <ReciveMessagesArchiveData
      data={data}
      permission={permission}
      officeId={officeId}
    />
  )
}
