import React from 'react'
import { getSentMessages } from '@/actions/manageMessages'
import { getServerUser } from '@/actions/auth'
import { getSentMessagePermissionById } from '@/actions/permissions/sentMessagePermissions'
import { redirect } from 'next/navigation'
import SentMessagesData from '@/components/ListData/sent-messagesData'

export default async function ManagementMessages() {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const officeId = session?.office?.id
  const data = (await getSentMessages(officeId))?.data || []
  const permission = (await getSentMessagePermissionById(session?.id??""))?.data
  if (!permission?.sentMessageDisplay) {
     redirect('/authrization')
  }

  return <SentMessagesData data={data} permission={permission} />
}
