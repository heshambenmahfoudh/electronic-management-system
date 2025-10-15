'use server'
import { db } from '@/lib/db'
import { createNewUserLog } from './userLogs'
import { getServerUser } from './auth'
import { revalidateTag } from 'next/cache'
import { DepartmentArchive } from '@prisma/client'

export async function createNewDepartmentArchive(
  formData: DepartmentArchive,
) {
  const { title, officeId } = formData
  console.log(formData)
  try {
    if (!officeId) return null
    const check = await checkDepartmentArchiveValue(formData)
    if (check?.data === null) {
      return {
        error: check.error,
        status: check.status,
      }
    }

    const newDepartmentArchive = await db.departmentArchive.create({
      data: {
        title,
        officeId: officeId!,
      },
    })
    const session = await getServerUser()
    const userLog = {
      userId: session?.id,
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Created Department Archive
       (${newDepartmentArchive?.title}) Successfully`,
    }
    if (newDepartmentArchive) {
      await createNewUserLog(userLog)
    }
    revalidateTag('/dashboard/archive/archive-department')
    return {
      data: newDepartmentArchive,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Faild to Created Department archive',
    }
  }
}

export async function updateDepartmentArchiveById(
  formData: DepartmentArchive,
  id: string,
) {
  const { title, officeId } = formData
  try {
    const updatedDepartmentArchive = await db.departmentArchive.update({
      where: {
        id,
      },
      data: {
        title,
        officeId,
      },
    })
    const session = await getServerUser()
    const userLog = {
      userId: session?.id,
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Updated Department Archive
       (${updatedDepartmentArchive?.title}) Successfully`,
    }
    if (updatedDepartmentArchive) {
      await createNewUserLog(userLog)
    }
    revalidateTag('/dashboard/archive/archive-department')
    return {
      data: updatedDepartmentArchive,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to updated Department Archive',
    }
  }
}

export async function deleteDepartmentArchiveById(id: string) {
  try {
    const deletedSuccess = await db.departmentArchive.delete({ where: { id } })
    const session = await getServerUser()
    const userLog = {
      userId: session?.id,
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Deleted Department Archive
       (${deletedSuccess?.title}) Successfully`,
    }
    if (deletedSuccess) {
      await createNewUserLog(userLog)
    }
    revalidateTag('/dashboard/archive/archive-department')
    return {
      message: 'Department Archive deleted successfully',
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to deleted Department Archive',
    }
  }
}

export async function getDepartmentArchiveById(id: string) {
  try {
    const existingDepartmentArchive = await db.departmentArchive.findUnique({
      where: {
        id,
      },
    })
    if (!existingDepartmentArchive) {
      return {
        data: null,
        status: 402,
        error: 'Department Archive not found',
      }
    }
    return {
      data: existingDepartmentArchive,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to fetching Department Archive',
    }
  }
}

export async function getDepartmentArchives(officeId: string) {
  try {
    const DepartmentArchiveData = await db.departmentArchive.findMany({
      where: {
        officeId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      data: DepartmentArchiveData,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to fetching Department Archive',
    }
  }
}

/*FUNCTIONS*/

async function checkDepartmentArchiveValue(
  formData: DepartmentArchive,
) {
  const { title, officeId } = formData
  const existingDepartmentArchive = await db.departmentArchive.findFirst({
    where: {
      title,
      officeId,
    },
  })
  if (existingDepartmentArchive) {
    return {
      data: null,
      status: 401,
      error: `Department archive (${title}) alredy Created`,
    }
  }
}
