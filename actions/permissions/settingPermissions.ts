'use server'
import { db } from '@/lib/db'
import { createNewUserLog } from '../userLogs'
import { getServerUser } from '../auth'
import { getUserById } from '../users'
import { revalidateTag } from 'next/cache'
import { SettingPermission } from '@prisma/client'

export async function getSettingPermissionById(userId: string) {
  try {
    if (!userId) return null
    const existingPermission = await db.settingPermission.findUnique({
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
      error: 'Failed to Fetch Setting Permission',
    }
  }
}

export async function updateSettingPermissionById(formData: SettingPermission) {
  const {
    officeDisplay,
    officeUpdate,
    userDisplay,
    userUpdate,
    documentDisplay,
    documentUpdate,
    userId,
  } = formData
  try {
    const updatedPermission = await db.settingPermission.update({
      where: {
        userId,
      },
      data: {
        officeDisplay,
        officeUpdate,
        userDisplay,
        userUpdate,
        documentDisplay,
        documentUpdate,
      },
    })
    const session = await getServerUser()
    const existingUser = (await getUserById(userId))?.data
    const userLog = {
      userId: session?.id ?? '',
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Updated Settings Permission of user (${existingUser?.name}) Successfully`,
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
      error: 'Failed to updated Setting Permission',
    }
  }
}
