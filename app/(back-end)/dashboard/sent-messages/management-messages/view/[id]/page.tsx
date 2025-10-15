import React from 'react'
import { getSentMessageById } from '@/actions/manageMessages'
import { getServerUser } from '@/actions/auth'
import { redirect } from 'next/navigation'
import { getSentMessagePermissionById } from '@/actions/permissions/sentMessagePermissions'
import ArchiveSentMessageForm from '@/components/forms/ArchiveSentMessageForm'
import { SentMessage } from '@prisma/client'
export default async function viewMessage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const { id } = await params
  const data = (await getSentMessageById(id))?.data as SentMessage
  const permission = (await getSentMessagePermissionById(session?.id))?.data
  if (!permission?.sentMessageView) {
      redirect('/authrization')
  }
  return <ArchiveSentMessageForm initialData={data} permission={permission} />
}
