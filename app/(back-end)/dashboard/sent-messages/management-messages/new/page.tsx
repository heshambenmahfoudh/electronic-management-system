import React from 'react'
import ManageMessageForm from '@/components/forms/ManageMessageForm'
import { getServerUser } from '@/actions/auth'
import { redirect } from 'next/navigation'
import { getSentMessagePermissionById } from '@/actions/permissions/sentMessagePermissions'

export default async function newSendMessage() {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const id = session?.id
  const permission = (await getSentMessagePermissionById(id!))?.data
  if (!permission?.sentMessageCreate) {
    redirect('/authrization')
  }
  return <ManageMessageForm />
}
