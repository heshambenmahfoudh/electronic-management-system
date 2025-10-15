'use server'
import { db } from '@/lib/db'
import { createNewUserLog } from '../userLogs'
import { getServerUser } from '../auth'
import { getUserById } from '../users'
import { revalidateTag } from 'next/cache'
import { UserPermission } from '@prisma/client'

export async function getUserPermissionById(userId: string) {
  try {
    if (!userId) return null
    const existingPermission = await db.userPermission.findUnique({
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
      error: 'Failed to Fetch User Permission',
    }
  }
}

export async function updateUserPermissionById(
  formData: UserPermission,
) {
  const {
    userDisplay,
    userCreate,
    userUpdate,
    userDelete,
    userPermissionDisplay,
    userId,
  } = formData
  try {
    const updatedPermission = await db.userPermission.update({
      where: {
        userId,
      },
      data: {
        userDisplay,
        userCreate,
        userUpdate,
        userDelete,
        userPermissionDisplay,
      },
    })
    const session = await getServerUser()
    const existingUser = (await getUserById(userId))?.data
    const userLog = {
      userId: session?.id ?? '',
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Updated Users Permission of user (${existingUser?.name}) Successfully`,
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
      error: 'Failed to updated User Permission',
    }
  }
}
