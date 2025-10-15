'use server'
import { db } from '@/lib/db'
import { createNewUserLog } from './userLogs'
import { getServerUser } from './auth'
import { revalidateTag } from 'next/cache'
import { AcadimicDepartment } from '@prisma/client'

export async function createNewDepartmentAcademic(
  formData: AcadimicDepartment,
) {
  const { title, officeId } = formData

  try {
    if (!officeId) return null
    const check = await checkDepartmentAcademicValue(formData)
    if (check?.data === null) {
      return {
        error: check.error,
        status: check.status,
      }
    }

    const newDepartment = await db.acadimicDepartment.create({
      data: {
        title,
        officeId: officeId!,
      },
    })
    const session = await getServerUser()
    const userLog = {
      userId: session?.id,
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Created Department Academic
       (${newDepartment?.title}) Successfully`,
    }
    if (newDepartment) {
      await createNewUserLog(userLog)
    }
    revalidateTag('/dashboard/human-resources/acadimic-departments')
    return {
      data: newDepartment,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Faild to Created Department academic',
    }
  }
}

export async function updateDepartmentAcademicById(
  formData: AcadimicDepartment,
  id: string,
) {
  const { title, officeId } = formData
  try {
    const updatedDepartment = await db.acadimicDepartment.update({
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
      activity: `User (${session?.name}) Updated Department Academic
       (${updatedDepartment?.title}) Successfully`,
    }
    if (updatedDepartment) {
      await createNewUserLog(userLog)
    }
    revalidateTag('/dashboard/archive/archive-department')
    return {
      data: updatedDepartment,
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

export async function deleteDepartmentAacademicById(id: string) {
  try {
    const deletedSuccess = await db.acadimicDepartment.delete({ where: { id } })
    const session = await getServerUser()
    const userLog = {
      userId: session?.id,
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Deleted Department Academic
       (${deletedSuccess?.title}) Successfully`,
    }
    if (deletedSuccess) {
      await createNewUserLog(userLog)
    }
    revalidateTag('/dashboard/human-resources/acadimic-departments')
    return {
      message: 'Department Academic deleted successfully',
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to deleted Department Academic',
    }
  }
}

export async function getDepartmentAacademicById(id: string) {
  try {
    const existingDepartment = await db.acadimicDepartment.findUnique({
      where: {
        id,
      },
    })
    if (!existingDepartment) {
      return {
        data: null,
        status: 402,
        error: 'Department Academic not found',
      }
    }
    return {
      data: existingDepartment,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to fetching Department Academic',
    }
  }
}

export async function getDepartmentAcademics(officeId: string) {
  try {
    const epartmentData = await db.acadimicDepartment.findMany({
      where: {
        officeId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      data: epartmentData,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to fetching Department Academics',
    }
  }
}

/*FUNCTIONS*/

async function checkDepartmentAcademicValue(formData: AcadimicDepartment) {
  const { title, officeId } = formData
  const existingDepartment = await db.acadimicDepartment.findFirst({
    where: {
      title,
      officeId,
    },
  })
  if (existingDepartment) {
    return {
      data: null,
      status: 401,
      error: `Department acadimic (${title}) alredy Created`,
    }
  }
}
