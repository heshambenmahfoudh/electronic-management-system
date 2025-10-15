import React from 'react'
import { getSentArchives } from '@/actions/sentMessagesArchives'
import { getServerUser } from '@/actions/auth'
import { getArchiveMessagePermissionById } from '@/actions/permissions/archiveMessagePermissions'
import { redirect } from 'next/navigation'
import SentMessagesArchiveData from '@/components/ListData/sent-messages-archiveData'

export default async function archiveSentMessages() {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const officeId = session?.office?.id ??""
  const data = (await getSentArchives(officeId ?? ''))?.data || []
  const permission = (await getArchiveMessagePermissionById(session?.id))?.data
  if (!permission?.ArchiveSentMessageDisplay) {
    redirect('/authrization')
  }
  return (
    <SentMessagesArchiveData
      data={data}
      permission={permission}
      officeId={officeId}
    />
  )
}
