'use server'
import { db } from '@/lib/db'
import { createNewUserLog } from './userLogs'
import { getServerUser } from './auth'
import { getOfficeById } from './offices'
import { revalidatePath } from 'next/cache'

export async function deleteReciveMessageById(id: string) {
  try {
    const deletedSuccess = await db.reciveMessage.delete({ where: { id } })
    const session = await getServerUser()
    const existinOffice = (await getOfficeById(deletedSuccess?.officeSentId))
      ?.data
    const userLog = {
      userId: session?.id,
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Deleted Recive message (${deletedSuccess?.subject}) from Office (${existinOffice?.name}) Successfully`,
    }
    if (deletedSuccess) {
      await createNewUserLog(userLog)
    }
    revalidatePath('/dashboard/recive-messages')
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

export async function getReciveMessageById(id: string) {
  try {
    const existingMessage = await db.reciveMessage.findUnique({
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
    const isReadMessage = await db.reciveMessage.findUnique({
      where: {
        id,
      },
    })
    if (!isReadMessage?.isRead) {
      await db.reciveMessage.update({
        where: {
          id,
        },
        data: {
          isRead: true,
        },
      })
    }
    const isReadNotification = await db.notification.findUnique({
      where: {
        messageId: id,
      },
    })
    if (isReadNotification) {
      await db.notification.delete({
        where: {
          messageId: id,
        },
      })
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

export async function getReciveMessages(officeReciveId: string | undefined) {
  try {
    const messagesData = await db.reciveMessage.findMany({
      where: {
        officeReciveId,
      },
      orderBy: [
        {
          isRead: 'asc',
        },
        {
          createdAt: 'desc',
        },
      ],
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

export async function getNotificationsMessages(officeReciveId: string) {
  try {
    const notificationsData = await db.notification.findMany({
      where: {
        officeReciveId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return {
      data: notificationsData,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to fetching notifications messages',
    }
  }
}
