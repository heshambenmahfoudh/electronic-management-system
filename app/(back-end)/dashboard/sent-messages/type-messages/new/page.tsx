import { getServerUser } from '@/actions/auth'
import { getSentMessagePermissionById } from '@/actions/permissions/sentMessagePermissions'
import TypeMessageForm from '@/components/forms/TypeMessageForm'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function newTypeMessage() {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const permission = (await getSentMessagePermissionById(session?.id))?.data
  if (!permission?.typeMessageCreate) {
     redirect('/authrization')
  }
  return <TypeMessageForm />
}
