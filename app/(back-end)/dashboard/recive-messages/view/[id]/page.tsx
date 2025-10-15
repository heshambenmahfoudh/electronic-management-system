import React from 'react'
import { getReciveMessageById } from '@/actions/reciveMessages'
import { getReciveMessagePermissionById } from '@/actions/permissions/reciveMessagePermissions'
import { getServerUser } from '@/actions/auth'
import { redirect } from 'next/navigation'
import ArchiveReciveMessageForm from '@/components/forms/ArchiveReciveMessageForm'
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
  const data = (await getReciveMessageById(id))?.data
  const permission = (await getReciveMessagePermissionById(session?.id))?.data
  if (!permission?.reciveMessageView) {
     redirect('/authrization')
  }

  return <ArchiveReciveMessageForm initialData={data} permission={permission} />
}
