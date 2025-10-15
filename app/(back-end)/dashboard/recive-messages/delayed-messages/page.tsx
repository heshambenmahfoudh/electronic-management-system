import React from 'react'
import { getDelayMessages } from '@/actions/delayMessages'
import { getServerUser } from '@/actions/auth'
import { getReciveMessagePermissionById } from '@/actions/permissions/reciveMessagePermissions'
import { redirect } from 'next/navigation'
import DelayMessagesData from '@/components/ListData/delay-messagesData'

export default async function DelayMessages() {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const officeId = session?.office?.id
  const data = (await getDelayMessages(officeId!))?.data || []
  const permission = (await getReciveMessagePermissionById(session?.id))?.data
  if (!permission?.delayMessageDisplay) {
   redirect('/authrization')
  }
  return <DelayMessagesData data={data} permission={permission} />
}
