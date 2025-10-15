'use server'
import { db } from '@/lib/db'
import { TypeManageMessageFormProps } from '@/types/types'
import { getServerUser } from './auth'
import { createNewUserLog } from './userLogs'
import { getOfficeById } from './offices'
import { revalidateTag } from 'next/cache'

export async function createNewSentMessage(
  formData: TypeManageMessageFormProps,
) {
  const {
    officeSentId,
    officeReciveId,
    sentName,
    typeMessage,
    subject,
    file,
    fileName,
    date,
    notes,
  } = formData

  try {
    const newSentMessage = await db.sentMessage.create({
      data: {
        officeSentId,
        officeReciveId,
        sentName,
        typeMessage,
        subject,
        file,
        fileName,
        date: new Date(date),
        notes,
      },
    })

    const newReciveMessage = await db.reciveMessage.create({
      data: {
        officeSentId,
        officeReciveId,
        sentName,
        typeMessage,
        subject,
        file,
        fileName,
        date: new Date(date),
        notes,
      },
    })
    const session = await getServerUser()
    await db.notification.create({
      data: {
        messageId: newReciveMessage?.id,
        subject,
        officeSent: session?.office?.name ?? '',
        userSent: session?.name ?? '',
        officeReciveId,
      },
    })

    const existingOffice = (await getOfficeById(newSentMessage?.officeReciveId))
      ?.data
    const userLog = {
      userId: session?.id,
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Send Message (${newSentMessage?.subject}) to office ${existingOffice?.name} Successfully`,
    }
    if (newSentMessage) {
      await createNewUserLog(userLog)
    }
    revalidateTag('/dashboard/sent-messages/management-messages')
    revalidateTag('/dashboard/recive-messages')
    return {
      data: newSentMessage,
      newReciveMessage,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Faild to Sent new message',
    }
  }
}

export async function deleteSentMessageById(id: string) {
  try {
    const deletedSuccess = await db.sentMessage.delete({ where: { id } })
    const session = await getServerUser()
    const userLog = {
      userId: session?.id,
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Deleted Sent Message (${deletedSuccess?.subject}) Successfully`,
    }
    if (deletedSuccess) {
      await createNewUserLog(userLog)
    }
    revalidateTag('/dashboard/sent-messages/management-messages')

    return {
      message: 'Message has been Deleted',
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to deleted Message',
    }
  }
}

export async function getSentMessageById(id: string) {
  try {
    const existingMessage = await db.sentMessage.findUnique({
      where: {
        id,
      },
      include: {
        officeSent: true,
        officeRecive: true,
      },
    })
    if (!existingMessage) {
      return {
        data: null,
        status: 402,
        error: 'Message not found',
      }
    }
    return {
      data: existingMessage,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to fetching message',
    }
  }
}

export async function getSentMessages(officeSentId: string | undefined) {
  try {
    const messagesData = await db.sentMessage.findMany({
      where: {
        officeSentId,
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
      data: messagesData,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to fetching messages',
    }
  }
}
