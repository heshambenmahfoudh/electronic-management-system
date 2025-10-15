'use server'
import { db } from '@/lib/db'
import { createNewUserLog } from '../userLogs'
import { getUserById } from '../users'
import { revalidateTag } from 'next/cache'
import { getServerUser } from '../auth'
import { HumanResourcePermission } from '@prisma/client'

export async function getHumanResourcePermissionById(userId: string) {
  try {
    if (!userId) return null
    const existingPermission = await db.humanResourcePermission.findUnique({
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
      error: 'Failed to Fetch Human Resource Permission',
    }
  }
}

export async function updateHumanResourcePermissionById(
  formData: HumanResourcePermission,
) {
  const {
    departmentAacademicDisplay,
    departmentAacademicCreate,
    departmentAacademicUpdate,
    departmentAacademicDelete,
    adminstrativeDisplay,
    adminstrativeCreate,
    adminstrativeUpdate,
    adminstrativeDelete,
    employeeDisplay,
    employeeCreate,
    employeeUpdate,
    employeeDelete,
    employeePrint,
    userId,
  } = formData
  try {
    const updatePermission = await db.humanResourcePermission.update({
      where: {
        userId,
      },
      data: {
        departmentAacademicDisplay,
        departmentAacademicCreate,
        departmentAacademicUpdate,
        departmentAacademicDelete,
        adminstrativeDisplay,
        adminstrativeCreate,
        adminstrativeUpdate,
        adminstrativeDelete,
        employeeDisplay,
        employeeCreate,
        employeeUpdate,
        employeeDelete,
        employeePrint,
      },
    })
    const session = await getServerUser()
    const existingUser = (await getUserById(userId))?.data
    const userLog = {
      userId: session?.id ?? '',
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Updated Human Resource Permission of user (${existingUser?.name}) Successfully`,
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
      error: 'Failed to updated Human resource Permission',
    }
  }
}
