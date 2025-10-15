'use server'
import { db } from '@/lib/db'
import { createNewUserLog } from '../userLogs'
import { getUserById } from '../users'
import { revalidateTag } from 'next/cache'
import { getServerUser } from '../auth'
import { ReciveMessagePermission } from '@prisma/client'

export async function getReciveMessagePermissionById(userId: string) {
  try {
    if (!userId) return null
    const existingPermission = await db.reciveMessagePermission.findFirst(
      {
        where: {
          userId,
        },
      },
    )

    return {
      data: existingPermission,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 200,
      error: 'Failed to Fetch Recive Message Permission',
    }
  }
}

export async function updateReciveMessagePermissionById(
  formData: ReciveMessagePermission,
) {
  const {
    reciveMessageDisplay,
    reciveMessageView,
    reciveMessageDelete,
    reciveMessageArchive,
    reciveMessageTrDelay,
    delayMessageDisplay,
    delayMessageView,
    delayMessageDelete,
    delayMessageArchive,
    notificationDisplay,
    notificationRead,
     userId,
  } = formData
  try {
    const updatedPermission = await db.reciveMessagePermission.update(
      {
        where: {
          userId,
        },
        data: {
          reciveMessageDisplay,
          reciveMessageView,
          reciveMessageDelete,
          reciveMessageArchive,
          reciveMessageTrDelay,
          delayMessageDisplay,
          delayMessageView,
          delayMessageDelete,
          delayMessageArchive,
          notificationDisplay,
          notificationRead,
        },
      },
    )
    const session = await getServerUser()
    const existingUser = (await getUserById(userId))?.data
    const userLog = {
      userId: session?.id ?? '',
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Updated Recive Messages Permission of user (${existingUser?.name}) Successfully`,
    }
    if (updatedPermission) {
      await createNewUserLog(userLog)
    }
    revalidateTag('/dashboard')
    return {
      data: updatedPermission,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 200,
      error: 'Failed to updated Recive Message Permission',
    }
  }
}
