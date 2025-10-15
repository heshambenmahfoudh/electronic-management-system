import React from 'react'
import { getTypeMessageById } from '@/actions/typeMessages'
import TypeMessageForm from '@/components/forms/TypeMessageForm'
import { TypeMessage } from '@prisma/client'
import { getSentMessagePermissionById } from '@/actions/permissions/sentMessagePermissions'
import { getServerUser } from '@/actions/auth'
import { redirect } from 'next/navigation'

export default async function UpdateTypeMessage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const permission = (await getSentMessagePermissionById(session?.id))?.data
  if (!permission?.typeMessageUpdate) {
    redirect('/authrization')
  }
  const { id } = await params
  const data = (await getTypeMessageById(id))?.data as TypeMessage
  return <TypeMessageForm initialData={data} isUpdate={id} />
}
