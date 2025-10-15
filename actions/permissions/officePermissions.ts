'use server'
import { db } from '@/lib/db'
import { createNewUserLog } from '../userLogs'
import { getServerUser } from '../auth'
import { getUserById } from '../users'
import { revalidateTag } from 'next/cache'
import { OfficePermission } from '@prisma/client'

export async function getOfficePermissionById(userId: string) {
  try {
    if (!userId) return null
    const existingPermission = await db.officePermission.findUnique({
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
      error: 'Failed to Fetch Office Permission',
    }
  }
}

export async function updateOfficePermissionById(
  formData: OfficePermission,
) {
  const {
    officeDisplay,
    officeCreate,
    officeUpdate,
    officeDelete,
    userId,
  } = formData
  try {
    const updatePermission = await db.officePermission.update({
      where: {
        userId,
      },
      data: {
        officeDisplay,
        officeCreate,
        officeUpdate,
        officeDelete,
      },
    })
    const session = await getServerUser()
    const existingUser = (await getUserById(userId))?.data
    const userLog = {
      userId: session?.id ?? '',
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Updated Offices Permission of user (${existingUser?.name}) Successfully`,
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
      error: 'Failed to updated Office Permission',
    }
  }
}
