'use server'
import { db } from '@/lib/db'
import { createNewUserLog } from '../userLogs'
import { getUserById } from '../users'
import { revalidateTag } from 'next/cache'
import { getServerUser } from '../auth'
import { BackUpPermission } from '@prisma/client'

export async function getBackupPermissionById(userId: string) {
  try {
    if (!userId) return null
    const existingPermission = await db.backUpPermission.findUnique({
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
      error: 'Failed to Fetch Backup Permission',
    }
  }
}

export async function updateBackupPermissionById(formData: BackUpPermission) {
  const { takeBackupDisplay, takeBackupCreate, userId } = formData
  try {
    const updatedPermission = await db.backUpPermission.update({
      where: {
        userId,
      },
      data: {
        takeBackupDisplay,
        takeBackupCreate,
      },
    })
    const session = await getServerUser()
    const existingUser = (await getUserById(userId))?.data
    const userLog = {
      userId: session?.id ?? '',
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Updated Backup Permission of user (${existingUser?.name}) Successfully`,
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
      error: 'Failed to updated Backup Permission',
    }
  }
}
