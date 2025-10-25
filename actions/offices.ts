'use server'
import { db } from '@/lib/db'
import { TypeSesstionData } from '@/types/types'
import bcrypt from 'bcrypt'
import { getServerUser } from './auth'
import { createNewUserLog } from './userLogs'
import { revalidatePath, revalidateTag } from 'next/cache'
import { Office } from '@prisma/client'

export async function createOffice(formData: Office) {
  const { name, email, password, imageUrl } = formData

  try {
    const check = await checkOfficeValue(formData)
    if (check?.data === null) {
      return {
        error: check.error,
        status: check.status,
      }
    }
    // Encrypt the Password
    const hashedPassword = await bcrypt.hash(password, 10)

    const newOffice = await db.office.create({
      data: {
        name,
        email,
        password: hashedPassword,
        imageUrl,
      },
    })
    const session = (await getServerUser()) as TypeSesstionData
    const userLog = {
      userId: session?.id,
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Created office (${newOffice?.name}) Successfully`,
    }
    if (newOffice) {
      await createNewUserLog(userLog)
    }
    revalidateTag('/dashboard/offices')
    return {
      data: newOffice,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Faild to Created Office',
    }
  }
}

export async function updateOfficeById(formData: Office, id: string) {
  const { name, email, password, imageUrl } = formData
  try {
    const existingOffice = await db.office.findUnique({
      where: { id },
    })
    if (!existingOffice) {
      return {
        data: null,
        status: 403,
        error: `Office not Found`,
      }
    }
    let newPassword: string = ''
    if (password !== '**********') {
      newPassword = await bcrypt.hash(password, 10)
    } else {
      newPassword = existingOffice.password
    }
    const updatedOffice = await db.office.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password: newPassword,
        imageUrl,
      },
    })
    const session = (await getServerUser()) as TypeSesstionData

    const userLog = {
      userId: session?.id,
      officeId: updatedOffice?.id,
      activity: `User (${session?.name}) Updated Office (${updatedOffice?.name}) Profile Successfully`,
    }
    await createNewUserLog(userLog)
    revalidatePath(`/dashboard/offices`)
    revalidatePath(`/dashboard/logs`)
    return {
      data: updatedOffice,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to updated office',
    }
  }
}

export async function updateOfficeProfile(formData: Office, id: string) {
  const { name, email, password, imageUrl } = formData
  try {
    const existingOffice = await db.office.findUnique({
      where: { id },
    })
    if (!existingOffice) {
      return {
        data: null,
        status: 403,
        error: `Office not Found`,
      }
    }
    let newPassword: string = ''
    if (password !== '**********') {
      newPassword = await bcrypt.hash(password, 10)
    } else {
      newPassword = existingOffice?.password
    }
    const updatedOffice = await db.office.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password: newPassword,
        imageUrl,
      },
    })
    const session = (await getServerUser()) as TypeSesstionData

    const userLog = {
      userId: session?.id,
      officeId: updatedOffice?.id,
      activity: `User (${session?.name}) Updated Office Profile (${updatedOffice?.name}) Successfully`,
    }
    await createNewUserLog(userLog)
    revalidatePath(`/dashboard/settings/office-profile/update`)
    revalidatePath(`/dashboard/offices`)
    revalidatePath(`/dashboard/logs`)
    return {
      data: updatedOffice,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to updated office',
    }
  }
}

export async function deleteOfficeById(id: string) {
  try {
    const deletedSuccess = await db.office.delete({ where: { id } })
    const session = (await getServerUser()) as TypeSesstionData
    const userLog = {
      userId: session?.id,
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Deleted office (${deletedSuccess?.name}) Successfully`,
    }
    if (deletedSuccess) {
      await createNewUserLog(userLog)
    }
    revalidateTag('/dashboard/offices')
    return {
      message: 'Office has been Deleted',
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to deleted office',
    }
  }
}

export async function getOfficeById(id: string) {
  try {
    const existingOffice = await db.office.findUnique({
      where: {
        id,
      },
    })
    if (!existingOffice) {
      return {
        data: null,
        status: 402,
        error: 'Office not found',
      }
    }
    return {
      data: existingOffice,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to fetching office',
    }
  }
}

export async function getOffices(id?: string) {
  try {
    const officesData = await db.office.findMany({
      where: {
        id: {
          not: id,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      data: officesData,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to fetching offices',
    }
  }
}

/*FUNCTIONS*/

async function checkOfficeValue(formData: Office) {
  const { name, email, imageUrl } = formData
  const existingOfficeName = await db.office.findUnique({
    where: {
      name,
    },
  })
  if (existingOfficeName) {
    return {
      data: null,
      status: 401,
      error: `Office name (${name}) alredy Created`,
    }
  }
  //  =========================
  const existingOfficeEmail = await db.office.findUnique({
    where: {
      email,
    },
  })
  if (existingOfficeEmail) {
    return {
      data: null,
      status: 401,
      error: `Office email (${email}) alredy Created`,
    }
  }
}
