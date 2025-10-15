'use server'
import { db } from '@/lib/db'
import { createNewUserLog } from '../userLogs'
import { getServerUser } from '../auth'
import { getUserById } from '../users'
import { revalidateTag } from 'next/cache'
import { SentMessagePermission } from '@prisma/client'

export async function getSentMessagePermissionById(userId: string) {
  try {
    const permission = await db.sentMessagePermission.findFirst({
      where: {
        userId,
      },
    })

    return {
      data: permission,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 200,
      error: 'Failed to Fetch Sent Message Permission',
    }
  }
}

export async function updateSentMessagePermissionById(
  formData: SentMessagePermission,
) {
  const {
    typeMessageDisplay,
    typeMessageCreate,
    typeMessageUpdate,
    typeMessageDelete,
    sentMessageDisplay,
    sentMessageCreate,
    sentMessageView,
    sentMessageDelete,
    sentMessageArchive,
     userId,
  } = formData
  try {
    const updatePermission = await db.sentMessagePermission.update({
      where: {
        userId,
      },
      data: {
        typeMessageDisplay,
        typeMessageCreate,
        typeMessageUpdate,
        typeMessageDelete,
        sentMessageDisplay,
        sentMessageCreate,
        sentMessageView,
        sentMessageDelete,
        sentMessageArchive,
      },
    })

    const session = await getServerUser()
    const existingUser = (await getUserById(userId))?.data
    const userLog = {
      userId: session?.id ?? '',
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Updated Sent Messages Permission of user (${existingUser?.name}) Successfully`,
    }
    if (updatePermission) {
      await createNewUserLog(userLog)
    }
    revalidateTag('/dashboard')
    return {
      data: updatePermission,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 200,
      error: 'Failed to updated Sent Message Permission',
    }
  }
}
