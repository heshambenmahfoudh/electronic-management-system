'use server'
import { db } from '@/lib/db'
import bcrypt from 'bcrypt'
import { TypeSesstionData } from '@/types/types'
import { createNewUserLog } from './userLogs'
import { createAdminPermission, getServerUser } from './auth'
import { revalidatePath } from 'next/cache'
import { User } from '@prisma/client'

export async function createNewUser(formData: User) {
  const { name, email, password, role, officeId, imageUrl } = formData

  try {
    const check = await checkUserValue(formData)
    if (check?.data === null) {
      return {
        error: check.error,
      }
    }
    // Encrypt the Password =>bcrypt
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        imageUrl,
        role,
        officeId,
      },
    })

    if (role === 'ADMIN' || role === 'SUPER ADMIN') {
      console.log('rolle adnen')
      await createAdminPermission(newUser?.id, role)
    } else {
      console.log('rolle userrrrrrrrrr')
      await createUserPermission(newUser?.id, officeId)
    }
    const session = (await getServerUser()) as TypeSesstionData
    const userLog = {
      userId: session?.id,
      officeId: newUser?.officeId,
      activity: `User (${session?.name}) Created a new User (${newUser?.name}) Successfully`,
    }
    await createNewUserLog(userLog)
    revalidatePath(`/dashboard/users`)
    return {
      data: newUser,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Faild to Created new User',
    }
  }
}

export async function updateUserById(formData: User, id: string) {
  const { name, email, password, imageUrl, role } = formData
  try {
    const existingUser = await db.user.findUnique({
      where: { id },
    })
    if (!existingUser) {
      return {
        data: null,
        status: 403,
        error: `User not Found`,
      }
    }
    let newPassword: string = ''
    if (password !== '**********') {
      newPassword = await bcrypt.hash(password, 10)
    } else {
      newPassword = existingUser.password
    }
    const updatedUser = await db.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password: newPassword,
        imageUrl,
        role,
      },
    })
    const session = (await getServerUser()) as TypeSesstionData
    const userLog = {
      userId: session?.id,
      officeId: updatedUser?.officeId,
      activity: `User (${session?.name}) Updated User (${updatedUser?.name}) Successfully`,
    }
    await createNewUserLog(userLog)
    revalidatePath(`/dashboard/users`)
    revalidatePath(`/dashboard/logs`)

    return {
      data: true,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to updated user',
    }
  }
}

export async function updateUserProfile(formData: User, id: string) {
  const { name, email, password, imageUrl } = formData
  try {
    const existingUser = await db.user.findUnique({
      where: { id },
    })
    if (!existingUser) {
      return {
        data: null,
        status: 403,
        error: `User not Found`,
      }
    }
    let newPassword: string = ''
    if (password !== '**********') {
      newPassword = await bcrypt.hash(password, 10)
    } else {
      newPassword = existingUser.password
    }
    const updatedUser = await db.user.update({
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

    const userLog = {
      userId: updatedUser?.id ?? '',
      officeId: updatedUser?.officeId,
      activity: `User (${updatedUser?.name}) Updated Profile Successfully`,
    }
    await createNewUserLog(userLog)
    revalidatePath(`/dashboard/users`)
    revalidatePath(`/dashboard/settings/user-profile/update`)
    revalidatePath(`/dashboard/logs`)

    return {
      data: updatedUser,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to updated user',
    }
  }
}

export async function deleteUserById(id: string) {
  try {
    const session = (await getServerUser()) as TypeSesstionData
    if (session?.id === id) {
      return {
        data: null,
        status: 403,
        error: 'Can`t Delete your self',
      }
    }
    const deletedSuccess = await db.user.delete({ where: { id } })
    const userLog = {
      userId: session?.id ?? '',
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Deleted User (${deletedSuccess?.name}) Successfully`,
    }
    if (deletedSuccess) {
      await createNewUserLog(userLog)
    }
    revalidatePath(`/dashboard/users`)
    return {
      message: 'User has been deleted',
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to deleted user',
    }
  }
}

export async function getUserById(id: string) {
  try {
    const existingUser = await db.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        imageUrl: true,
        role: true,
      },
    })
    if (!existingUser) {
      return {
        data: null,
        status: 402,
        error: 'User not found',
      }
    }
    return {
      data: existingUser,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to fetching user',
    }
  }
}

export async function getUsers(officeId: string, id?: string) {
  try {
    const usersData = await db.user.findMany({
      where: {
        officeId,
        id: {
          not: id,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },

      include: {
        office: {
          select: {
            id: true,
            name: true,
            email: true,
            imageUrl: true,
          },
        },
      },
    })

    return {
      data: usersData,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to fetching users',
    }
  }
}

async function checkUserValue(formData: User) {
  const { name, email, officeId } = formData
  const existingUserName = await db.user.findFirst({
    where: {
      name,
      officeId,
    },
  })
  if (existingUserName) {
    return {
      data: null,
      status: 401,
      error: `User name (${name}) alredy Created`,
    }
  }
  //  =========================
  const existingUserEmail = await db.user.findUnique({
    where: {
      email,
    },
  })
  if (existingUserEmail) {
    return {
      data: null,
      status: 401,
      error: `User email (${email}) alredy Created`,
    }
  }
}

async function createUserPermission(userId: string, officeId: string) {
  try {
    await db.dashboardPermission.create({
      data: {
        userId,
        officeId,
      },
    })
    await db.settingPermission.create({
      data: {
        userId,
        officeId,
      },
    })
    await db.officePermission.create({
      data: {
        userId,
        officeId,
      },
    })
    await db.userPermission.create({
      data: {
        userId,
        officeId,
      },
    })
    await db.sentMessagePermission.create({
      data: {
        userId,
        officeId,
      },
    })
    await db.reciveMessagePermission.create({
      data: {
        userId,
        officeId,
      },
    })
    await db.archiveMessagePermission.create({
      data: {
        userId,
        officeId,
      },
    })
    await db.humanResourcePermission.create({
      data: {
        userId,
        officeId,
      },
    })
    await db.backUpPermission.create({
      data: {
        userId,
        officeId,
      },
    })
  } catch (error) {
    console.log(error)
  }
}
