'use server'
import { db } from '@/lib/db'
import { createNewUserLog } from './userLogs'
import { getServerOffice, getServerUser } from './auth'
import { revalidateTag } from 'next/cache'
import { Document } from '@prisma/client'

export async function createNewDocument() {
  try {
    const session = await getServerUser()
    const officeId = (await getServerOffice()) ?? ''
    const createNew = await db.document.create({
      data: {
        imageUrl: 'imageUrl',
        officeId,
        collegeName: 'Faculity of Engennering',
        universityName: 'University of Aden',
        officeName: 'Office Employee',
      },
    })
    const userLog = {
      userId: session?.id,
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Create Document Data Successfully`,
    }
    if (createNew) {
      await createNewUserLog(userLog)
    }
    revalidateTag('/dashboard/settings/documents/update')
    return {
      data: createNew,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to create Document Data',
    }
  }
}

export async function updateDocumentDataById(formData: Document, id: string) {
  const {
    imageUrl,
    officeId,
    collegeName,
    universityName,
    officeName,
  } = formData
  try {
    const updatedDocumentData = await db.document.update({
      where: {
        id,
      },
      data: {
        imageUrl,
        officeId,
        collegeName,
        universityName,
        officeName,
      },
    })
    const session = await getServerUser()
    const userLog = {
      userId: session?.id,
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Updated Document Data Successfully`,
    }
    if (updatedDocumentData) {
      await createNewUserLog(userLog)
    }
    revalidateTag('/dashboard/settings/documents/update')
    return {
      data: updatedDocumentData,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to updated Document Data',
    }
  }
}

export async function getDocumentData() {
  try {
    const existingDocumentData = await db.document.findFirst()
    if (!existingDocumentData) {
      return {
        data: null,
        status: 402,
        error: 'Document Data not found',
      }
    }
    return {
      data: existingDocumentData,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to fetching Document Data',
    }
  }
}
