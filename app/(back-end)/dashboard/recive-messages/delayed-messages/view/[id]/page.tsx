import React from 'react'
import { getDelayMessageById } from '@/actions/delayMessages'
import { redirect } from 'next/navigation'
import { getReciveMessagePermissionById } from '@/actions/permissions/reciveMessagePermissions'
import { getServerUser } from '@/actions/auth'
import ArchiveDelayMessageForm from '@/components/forms/ArchiveDelayMessageForm'
export default async function viewDelayMessage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  const { id } = await params
  const data = (await getDelayMessageById(id))?.data
  const permission = (await getReciveMessagePermissionById(session?.id))?.data
  if (!permission?.delayMessageView) {
     redirect('/authrization')
  }
  return <ArchiveDelayMessageForm permission={permission} initialData={data} />
}
