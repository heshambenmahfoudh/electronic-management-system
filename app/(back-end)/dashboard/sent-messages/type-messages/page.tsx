import React from 'react'
import { getServerUser } from '@/actions/auth'
import { getSentMessagePermissionById } from '@/actions/permissions/sentMessagePermissions'
import { getTypeMessages } from '@/actions/typeMessages'
import { redirect } from 'next/navigation'
import TypeMessagesData from '@/components/ListData/type-messagesData'

export default async function typeMessages() {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const officeId = session?.office?.id
  const data = (await getTypeMessages(officeId)).data || []
  const permission = (await getSentMessagePermissionById(session?.id))?.data
  if (!permission?.typeMessageDisplay) {
      redirect('/authrization')
  }

  return <TypeMessagesData data={data} permission={permission} />
}
