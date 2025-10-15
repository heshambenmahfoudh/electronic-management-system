'use server'
import { db } from '@/lib/db'
import { TypeArchiveAndDelayProps } from '@/types/types'
import { revalidateTag } from 'next/cache'
import { createNewUserLog } from './userLogs'
import { getServerUser } from './auth'

export async function createNewDelayMessage(
  formData: TypeArchiveAndDelayProps,
) {
  const {
    officeSentId,
    officeReciveId,
    typeMessage,
    sentName,
    subject,
    file,
    fileName,
    delayDate,
    date,
    notes,
    id,
  } = formData

  try {
    const newDelayMessage = await db.delayMessage.create({
      data: {
        officeSentId,
        officeReciveId,
        typeMessage,
        sentName,
        subject,
        file,
        fileName,
        date: new Date(date),
        delayDate: new Date(delayDate),
        notes,
      },
    })
    const session = await getServerUser()
    const userLogDelay = {
      userId: session?.id,
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Created Delay Message  
      (${newDelayMessage?.subject}) Successfully`,
    }
    const userLogRecive = {
      userId: session?.id,
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Transfer Recive Message (${newDelayMessage?.subject}) to Delay Message Successfully`,
    }
    await db.reciveMessage.delete({ where: { id } })

    await createNewUserLog(userLogRecive)
    await createNewUserLog(userLogDelay)
    revalidateTag('/dashboard/recive-messages/delayed-messages')
    return {
      data: newDelayMessage,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Faild to Created delay message',
    }
  }
}

export async function deleteDelayMessageById(id: string) {
  try {
    const successDelete = await db.delayMessage.delete({ where: { id } })
    const session = await getServerUser()
    const userLog = {
      userId: session?.id,
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Deleted Delay Message (${successDelete?.subject}) Successfully`,
    }
    if (successDelete) {
      await createNewUserLog(userLog)
    }
    return {
      message: 'Delay message deleted successfully',
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to deleted delay message',
    }
  }
}

export async function getDelayMessageById(id: string) {
  try {
    const existingDelayMessage = await db.delayMessage.findUnique({
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
    if (!existingDelayMessage) {
      return {
        data: null,
        status: 402,
        error: 'Delay message not found',
      }
    }
    return {
      data: existingDelayMessage,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to fetching delay message',
    }
  }
}

export async function getDelayMessages(officeReciveId: string) {
  try {
    const delayMessagesData = await db.delayMessage.findMany({
      where: {
        officeReciveId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        officeSent: true,
        officeRecive: true,
      },
    })

    return {
      data: delayMessagesData,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to fetching delay messages',
    }
  }
}
