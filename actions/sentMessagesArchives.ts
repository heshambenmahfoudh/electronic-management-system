'use server'
import { db } from '@/lib/db'
import { TypeArchiveAndDelayProps } from '@/types/types'
import { revalidatePath } from 'next/cache'
import { getServerUser } from './auth'
import { getOfficeById } from './offices'
import { getDepartmentArchiveById } from './departmentArchive'
import { createNewUserLog } from './userLogs'

export async function createNewSentArchive(formData: TypeArchiveAndDelayProps) {
  const {
    officeSentId,
    officeReciveId,
    departmentArciveId,
    typeMessage,
    subject,
    sentName,
    file,
    fileName,
    date,
    notes,
    archiveDate,
    id,
  } = formData

  try {
    const newSentMessageArchive = await db.sentArchive.create({
      data: {
        officeSentId,
        officeReciveId,
        departmentArciveId,
        typeMessage,
        subject,
        sentName,
        file,
        fileName,
        date: new Date(date),
        archiveDate: new Date(archiveDate),
        notes,
      },
    })
    await db.sentMessage.delete({ where: { id } })
    const session = await getServerUser()
    const existingOffice = (
      await getOfficeById(newSentMessageArchive?.officeReciveId)
    )?.data
    const existingDepartmentArchive = (
      await getDepartmentArchiveById(newSentMessageArchive?.departmentArciveId)
    )?.data
    const userLogArchive = {
      userId: session?.id,
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Transfer Sent message (${newSentMessageArchive?.subject}) to Archive (${existingDepartmentArchive?.title}) Send to Office (${existingOffice?.name}) Successfully`,
    }
    await createNewUserLog(userLogArchive)
    revalidatePath(`/dashboard/sent-messages/management-messages`)
    revalidatePath(`/dashboard/archive/archive-sent-messages`)
    return {
      data: newSentMessageArchive,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Faild to Created archive message',
    }
  }
}

export async function deleteSentArchiveById(id: string) {
  try {
    const deletedSuccess = await db.sentArchive.delete({ where: { id } })
    const session = await getServerUser()
    const existingOffice = (await getOfficeById(deletedSuccess?.officeReciveId))
      ?.data
    const existingDepartmentArchive = (
      await getDepartmentArchiveById(deletedSuccess?.departmentArciveId)
    )?.data
    const userLogArchive = {
      userId: session?.id,
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Deleted Sent message (${deletedSuccess?.subject}) from Archive (${existingDepartmentArchive?.title}) Send to Office (${existingOffice?.name}) Successfully`,
    }
    if (deletedSuccess) {
      await createNewUserLog(userLogArchive)
    }

    revalidatePath(`/dashboard/archive/archive-sent-messages`)
    return {
      message: 'Archive message deleted successfully',
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to deleted archive message',
    }
  }
}

export async function getSentArchiveById(id?: string) {
  try {
    const existingSentArchive = await db.sentArchive.findUnique({
      where: {
        id,
      },
      include: {
        officeSent: {
          select: {
            id: true,
            name: true,
          },
        },
        officeRecive: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
    if (!existingSentArchive) {
      return {
        data: null,
        status: 402,
        error: 'Archive message not found',
      }
    }
    return {
      data: existingSentArchive,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to fetching archive message',
    }
  }
}

export async function getSentArchives(officeSentId: string, limit?: number) {
  try {
    if (!officeSentId) return null
    const sentArchiveData = await db.sentArchive.findMany({
      where: {
        officeSentId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      include: {
        officeSent: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        officeRecive: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    })

    return {
      data: sentArchiveData,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to fetching archive message',
    }
  }
}
