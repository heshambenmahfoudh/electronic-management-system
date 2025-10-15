import React from 'react'
import { getReciveMessages } from '@/actions/reciveMessages'
import { getServerUser } from '@/actions/auth'
import { getReciveMessagePermissionById } from '@/actions/permissions/reciveMessagePermissions'
import { redirect } from 'next/navigation'
import ReciveMessagesData from '@/components/ListData/recive-messagesData'

export default async function ReciveMessages() {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const officeId = session?.office?.id
  const data = (await getReciveMessages(officeId)).data || []
  const permission = (await getReciveMessagePermissionById(session?.id))?.data
  if (!permission?.reciveMessageDisplay) {
     redirect('/authrization')
  }
  return <ReciveMessagesData data={data} permission={permission} />
}
