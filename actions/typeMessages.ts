'use server'
import { db } from '@/lib/db'
import {  getServerUser } from './auth'
import { createNewUserLog } from './userLogs'
import { revalidatePath } from 'next/cache'
import { TypeMessage } from '@prisma/client'

export async function createNewTypeMessage(formData: TypeMessage) {
  const { title, officeId } = formData

  try {
    const check = await checkTypeMessageValue(formData)
    if (check?.data === null) {
      return {
        error: check.error,
      }
    }

    const newTypeMessage = await db.typeMessage.create({
      data: {
        title,
        officeId,
      },
    })
    const session = await getServerUser()
    const userLog = {
      userId: session?.id,
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Created Type message (${newTypeMessage?.title}) Successfully`,
    }
    if (newTypeMessage) {
      await createNewUserLog(userLog)
    }
    revalidatePath(`/dashboard/sent-messages/type-messages`)
    return {
      data: newTypeMessage,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Faild to Created new Type Message',
    }
  }
}

export async function updateTypeMessageById(
  formData: TypeMessage,
  id: string,
) {
  const { title } = formData
  try {
    const updatedTypeMessage = await db.typeMessage.update({
      where: {
        id,
      },
      data: {
        title,
      },
    })
    const session = await getServerUser()
    const userLog = {
      userId: session?.id,
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Updated Type message (${updatedTypeMessage?.title}) Successfully`,
    }
    if (updatedTypeMessage) {
      await createNewUserLog(userLog)
    }
    revalidatePath(`/dashboard/sent-messages/type-messages`)
    return {
      data: updatedTypeMessage,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to updated Type Message',
    }
  }
}

export async function deleteTypeMessageById(id: string) {
  try {
    const deletedSuccess = await db.typeMessage.delete({ where: { id } })
    const session = await getServerUser()
    const userLog = {
      userId: session?.id,
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Deleted Type message (${deletedSuccess?.title}) Successfully`,
    }
    if (deletedSuccess) {
      await createNewUserLog(userLog)
    }
    revalidatePath(`/dashboard/sent-messages/type-messages`)
    return {
      message: 'Type Message has been deleted',
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to deleted Type Message',
    }
  }
}

export async function getTypeMessageById(id: string) {
  try {
    const existingTypeMessage = await db.typeMessage.findUnique({
      where: {
        id,
      },
      include: {
        office: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })
    if (!existingTypeMessage) {
      return {
        data: null,
        status: 402,
        error: 'Type Message not found',
      }
    }
    return {
      data: existingTypeMessage,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to fetching Type Message',
    }
  }
}


export async function getTypeMessages(officeId: string | undefined) {
  try {
    const typeMessagesData = await db.typeMessage.findMany({
      where: {
        officeId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      data: typeMessagesData,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to fetching Type Message',
    }
  }
}

/*


FUNCTIONS


*/

async function checkTypeMessageValue(formData: TypeMessage) {
  const { title, officeId } = formData
  const existingTypeMessageTitle = await db.typeMessage.findFirst({
    where: {
      title,
      officeId,
    },
  })
  if (existingTypeMessageTitle) {
    return {
      data: null,
      status: 401,
      error: `Type Message (${title}) alredy Created`,
    }
  }
}
