'use server'
import { db } from '@/lib/db'
import { TypeArchiveAndDelayProps } from '@/types/types'
import { revalidatePath } from 'next/cache'
import { getServerUser } from './auth'
import { getOfficeById } from './offices'
import { createNewUserLog } from './userLogs'
import { getDepartmentArchiveById } from './departmentArchive'

export async function createNewReciveArchive(
  formData: TypeArchiveAndDelayProps,
) {
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
    typeOperation,
  } = formData

  try {
    const newReciveMessageArchive = await db.reciveArchive.create({
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
    const session = await getServerUser()
    const existingOffice = (
      await getOfficeById(newReciveMessageArchive?.officeSentId)
    )?.data
    const existingDepartmentArchive = (
      await getDepartmentArchiveById(
        newReciveMessageArchive?.departmentArciveId,
      )
    )?.data

    if (typeOperation === 'delay') {
      await db.delayMessage.delete({ where: { id } })
      const userLogDelay = {
        userId: session?.id,
        officeId: session?.office?.id,
        activity: `User (${session?.name}) Transfer Delay message (${newReciveMessageArchive?.subject}) to Archive (${existingDepartmentArchive?.title}) Send from Office (${existingOffice?.name}) Successfully`,
      }
      await createNewUserLog(userLogDelay)
    } else {
      await db.reciveMessage.delete({ where: { id } })
      const userLogRecive = {
        userId: session?.id,
        officeId: session?.office?.id,
        activity: `User (${session?.name}) Transfer Recive message (${newReciveMessageArchive?.subject}) to Archive (${existingDepartmentArchive?.title}) Send from Office (${existingOffice?.name}) Successfully`,
      }
      await createNewUserLog(userLogRecive)
    }
    revalidatePath(`/dashboard/recive-messages`)
    revalidatePath(`/dashboard/archive/archive-recive-messages`)
    return {
      data: newReciveMessageArchive,
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

export async function deleteReciveArchiveById(id: string) {
  try {
    const deletedSuccess = await db.reciveArchive.delete({ where: { id } })
    const session = await getServerUser()
    const existingOffice = (await getOfficeById(deletedSuccess?.officeSentId))
      ?.data
    const existinArchive = (
      await getDepartmentArchiveById(deletedSuccess?.departmentArciveId)
    )?.data
    const userLogArchive = {
      userId: session?.id,
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Deleted Recive message (${deletedSuccess?.subject}) from Archive (${existinArchive?.title}) Sent from Office (${existingOffice?.name}) Successfully`,
    }
    if (deletedSuccess) {
      await createNewUserLog(userLogArchive)
    }

    revalidatePath(`/dashboard/archive/archive-recive-messages`)
    return {
      message: 'archive message recive deleted successfully',
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to deleted archive message recive',
    }
  }
}

export async function getReciveArchiveById(id: string) {
  try {
    const existingReciveMessageReciverchive = await db.reciveArchive.findUnique(
      {
        where: {
          id,
        },
        include: {
          departmentArcive: false,
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
      },
    )
    if (!existingReciveMessageReciverchive) {
      return {
        data: null,
        status: 402,
        error: 'Recive message archive not found',
      }
    }
    return {
      data: existingReciveMessageReciverchive,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to fetching recive message archive',
    }
  }
}

export async function getReciveArchives(
  officeReciveId: string,
  limit?: number,
) {
  try {
    if (!officeReciveId) return null
    const data = await db.reciveArchive.findMany({
      where: {
        officeReciveId,
      },
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
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
      data: data,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to fetching archive messages recive',
    }
  }
}
