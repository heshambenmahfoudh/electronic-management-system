import React from 'react'
import { getServerUser } from '@/actions/auth'
import { Document } from '@prisma/client'
import { TypeSesstionData } from '@/types/types'
import { redirect } from 'next/navigation'
import { getSettingPermissionById } from '@/actions/permissions/settingPermissions'
import { getDocumentData } from '@/actions/documents'
import DocumentDataForm from '@/components/forms/DocumentDataForm'

export default async function UpdateDocumentData() {
  const session = (await getServerUser()) as TypeSesstionData
  if (!session) {
    redirect('/login')
  }
  const id = session?.id
  const data = (await getDocumentData())?.data as Document
  const permission = (await getSettingPermissionById(id!))?.data
  if (!permission?.documentDisplay) {
    redirect('/authrization')
  }
  return <DocumentDataForm permission={permission} initialData={data} />
}
