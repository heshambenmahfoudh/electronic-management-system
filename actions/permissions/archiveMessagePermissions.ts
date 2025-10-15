'use server'
import { db } from '@/lib/db'
import { getServerUser } from '../auth'
import { createNewUserLog } from '../userLogs'
import { getUserById } from '../users'
import { revalidateTag } from 'next/cache'
import { ArchiveMessagePermission } from '@prisma/client'

export async function getArchiveMessagePermissionById(userId: string) {
  try {
    if (!userId) return null
    const existingPermission = await db.archiveMessagePermission.findFirst({
      where: {
        userId,
      },
    })

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
      error: 'Failed to Fetch Archive Message Permission',
    }
  }
}

export async function updateArchiveMessagePermissionById(
  formData: ArchiveMessagePermission,
) {
  const {
    departmentArchiveDisplay,
    departmentArchiveCreate,
    departmentArchiveDelete,
    departmentArchiveUpdate,
    ArchiveSentMessageDisplay,
    ArchiveSentMessageView,
    ArchiveSentMessageDelete,
    ArchiveReciveMessageDisplay,
    ArchiveReciveMessageView,
    ArchiveReciveMessageDelete,
    userId,
  } = formData
  try {
    const updateArchiveMessagePermission = await db.archiveMessagePermission.update(
      {
        where: {
          userId,
        },
        data: {
          departmentArchiveDisplay,
          departmentArchiveCreate,
          departmentArchiveDelete,
          departmentArchiveUpdate,
          ArchiveSentMessageDisplay,
          ArchiveSentMessageView,
          ArchiveSentMessageDelete,
          ArchiveReciveMessageDisplay,
          ArchiveReciveMessageView,
          ArchiveReciveMessageDelete,
        },
      },
    )
    const session = await getServerUser()
    const existingUser = (await getUserById(userId))?.data
    const userLog = {
      userId: session?.id ?? '',
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Updated Archives Permission of user (${existingUser?.name}) Successfully`,
    }
    if (updateArchiveMessagePermission) {
      await createNewUserLog(userLog)
    }
    revalidateTag('/dashboard')
    return {
      data: updateArchiveMessagePermission,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 200,
      error: 'Failed to updated Archive Message Permission',
    }
  }
}
