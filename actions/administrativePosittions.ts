'use server'
import { db } from '@/lib/db'
import { createNewUserLog } from './userLogs'
import { getServerUser } from './auth'
import { revalidateTag } from 'next/cache'
import { AdministrativePosittion } from '@prisma/client'

export async function createNewAdministrativePosittion(
  formData: AdministrativePosittion,
) {
  const { title, officeId } = formData

  try {
    if (!officeId) return null
    const check = await checkAdministrativeValue(formData)
    if (check?.data === null) {
      return {
        error: check.error,
        status: check.status,
      }
    }

    const newDepartment = await db.administrativePosittion.create({
      data: {
        title,
        officeId: officeId!,
      },
    })
    const session = await getServerUser()
    const userLog = {
      userId: session?.id,
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Created Administrative 
      Posittion (${newDepartment?.title}) Successfully`,
    }
    if (newDepartment) {
      await createNewUserLog(userLog)
    }
    revalidateTag('/dashboard/human-resources/administrative-positions')
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
      error: 'Faild to Created Administrative Posittion',
    }
  }
}

export async function updateAdministrativePosittionById(
  formData: AdministrativePosittion,
  id: string,
) {
  const { title, officeId } = formData
  try {
    const updatedDepartment = await db.administrativePosittion.update({
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
      activity: `User (${session?.name}) Updated Administrative Posittion
       (${updatedDepartment?.title}) Successfully`,
    }
    if (updatedDepartment) {
      await createNewUserLog(userLog)
    }
       revalidateTag('/dashboard/human-resources/administrative-positions')
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
      error: 'Failed to updated Administrative Posittion',
    }
  }
}

export async function deleteAdministrativePosittionById(id: string) {
  try {
    const deletedSuccess = await db.administrativePosittion.delete({ where: { id } })
    const session = await getServerUser()
    const userLog = {
      userId: session?.id,
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Deleted Administrative Posittion 
      (${deletedSuccess?.title}) Successfully`,
    }
    if (deletedSuccess) {
      await createNewUserLog(userLog)
    }
    revalidateTag('/dashboard/human-resources/administrative-positions')
    return {
      message: 'Administrative Posittion deleted successfully',
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to deleted Administrative Posittion',
    }
  }
}

export async function getAdministrativePosittionById(id: string) {
  try {
    const existingDepartment = await db.administrativePosittion.findUnique({
      where: {
        id,
      },
    })
    if (!existingDepartment) {
      return {
        data: null,
        status: 402,
        error: 'Administrative Posittion not found',
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
      error: 'Failed to fetching Administrative Posittion',
    }
  }
}

export async function getAdministrativePosittions(officeId: string) {
  try {
    const departmentsData = await db.administrativePosittion.findMany({
      where: {
        officeId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      data: departmentsData,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to fetching Administrative Posittion',
    }
  }
}

/*FUNCTIONS*/

async function checkAdministrativeValue(
  formData: AdministrativePosittion,
) {
  const { title, officeId } = formData
  const existingDepartment = await db.administrativePosittion.findFirst({
    where: {
      title,
      officeId,
    },
  })
  if (existingDepartment) {
    return {
      data: null,
      status: 401,
      error: `Administrative Posittion (${title}) alredy Created`,
    }
  }
}
