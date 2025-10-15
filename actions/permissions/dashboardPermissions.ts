'use server'
import { db } from '@/lib/db'
import { createNewUserLog } from '../userLogs'
import { getServerUser } from '../auth'
import { getUserById } from '../users'
import { revalidateTag } from 'next/cache'
import { DashboardPermission } from '@prisma/client'

export async function getDashboardPermissionById(userId: string) {
  try {
    if (!userId || userId === 'Select User') return null
    const existingPermission = await db.dashboardPermission.findUnique({
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
      error: 'Failed to Fetch Dashboard Permission',
    }
  }
}

export async function updateDashboardPermissionById(
  formData: DashboardPermission,
) {
  const { homeDisplay, userLogDisplay, userLogDelete, userId } = formData
  try {
    const updatedPermission = await db.dashboardPermission.update({
      where: {
        userId,
      },
      data: {
        homeDisplay,
        userLogDisplay,
        userLogDelete,
      },
    })
    const session = await getServerUser()
    const existingUser = (await getUserById(userId))?.data
    const userLog = {
      userId: session?.id ?? '',
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Updated Dashboard Permission of user (${existingUser?.name}) Successfully`,
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
      error: 'Failed to updated Dashboard Permission',
    }
  }
}
