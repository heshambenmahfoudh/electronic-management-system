'use server'
import jwt from 'jsonwebtoken'
import { db } from '@/lib/db'
import { TypeLoginFormProps, TypeSesstionData } from '@/types/types'
import { compare } from 'bcrypt'
import bcrypt from 'bcrypt'
import { createNewUserLog } from './userLogs'
import { cookies } from 'next/headers'
import { revalidatePath, revalidateTag } from 'next/cache'
import { generateAccessToken, generateRefrechToken } from '@/lib/generateJWT'
import { UserAccessToken, UserRefrechToken } from '@prisma/client'
import { createNewDocument } from './documents'

export async function loginOffice(formData: TypeLoginFormProps) {
  const { email, password } = formData

  try {
    const existingOffices = await db.office.findMany()

    const existingOffice = await db.office.findUnique({
      where: { email },
    })
    if (existingOffices.length <= 0) {
      return await createNewOffice(formData)
    }
    if (!existingOffice) {
      return {
        data: null,
        status: 403,
        error: `Office Email ${email} not Found`,
      }
    }

    let passwordMatch: boolean = false
    if (existingOffice && existingOffice.password) {
      passwordMatch = await compare(password, existingOffice.password)
    }
    if (!passwordMatch) {
      return {
        data: null,
        status: 403,
        error: `Wrong Password or Email`,
      }
    }
    const office = {
      id: existingOffice.id,
      name: existingOffice.name,
    }
    const accessToken = await generateAccessToken(existingOffice?.id)
    await createOfficeServerSession(accessToken)
    revalidateTag('/dashboard')
    return {
      data: office,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to Login Office',
    }
  }
}

export async function loginUser(formData: TypeLoginFormProps) {
  const { email, password } = formData

  try {
    const id = (await getServerOffice()) ?? ''
    console.log(id)
    const existingOffice = await db.office.findUnique({
      where: { id },
      select: {
        name: true,
        user: true,
      },
    })
    const existingUser = await db.user.findUnique({
      where: { email, officeId: id },
    })

    if ((existingOffice?.user?.length as number) <= 0) {
      return createNewAdmin(formData)
    } else {
      if (!existingUser) {
        return {
          data: null,
          status: 403,
          error: `User Email ${email} not Found`,
        }
      }
    }

    let passwordMatch: boolean = false
    if (existingUser && existingUser.password) {
      passwordMatch = await compare(password, existingUser.password)
    }

    if (!passwordMatch) {
      return {
        data: null,
        status: 403,
        error: `Wrong Password or Email`,
      }
    }
    const user = {
      id: existingUser.id,
      name: existingUser.name,
    }
    const userLog = {
      userId: user?.id,
      officeId: existingUser?.officeId,
      activity: `User (${user?.name}) Logged In Successfully`,
    }
    const cookiesStore = await cookies()
    cookiesStore.delete({ name: 'token', path: '/' })
    await createNewUserLog(userLog)
    const accessToken = await generateUserAccessToken(existingUser.id)
    const refrechToken = await generateUserRefrechToken(existingUser.id)
    await createNewServerSession(
      accessToken?.data ?? '',
      refrechToken?.data ?? '',
    )
    revalidateTag('/dashboard')
    return {
      data: user,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 200,
      error: 'Failed to Login User',
    }
  }
}

export async function createNewServerSession(
  accessToken: string,
  refrechToken: string,
) {
  try {
    const cookieStore = await cookies()
    cookieStore?.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60, // 60 minutes
      path: '/',
    })
    cookieStore.set('refrechToken', refrechToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Invalid data' }
  }
}

export async function createOfficeServerSession(token: string) {
  try {
    const cookieStore = await cookies()
    cookieStore?.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 30, // 60 minutes
      path: '/',
    })

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Invalid data' }
  }
}

export async function generateUserAccessToken(userId: string) {
  try {
    const sessionId = crypto.randomUUID()
    const accessToken = await generateAccessToken(sessionId)

    const existingToken = await db.userAccessToken.findUnique({
      where: {
        userId,
      },
    })
    if (existingToken) {
      await db.userAccessToken.update({
        where: {
          userId,
        },
        data: {
          sessionId,
          userId,
          expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
        },
      })
    } else {
      await db.userAccessToken.create({
        data: {
          sessionId,
          userId,
          expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
        },
      })
    }

    return {
      data: accessToken,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to Create Access Token',
    }
  }
}

export async function generateUserRefrechToken(userId: string) {
  try {
    const sessionId = crypto.randomUUID()
    const refrechToken = await generateRefrechToken(sessionId)
    const existingToken = await db.userRefrechToken.findUnique({
      where: {
        userId,
      },
    })
    if (existingToken) {
      await db.userRefrechToken.update({
        where: {
          userId,
        },
        data: {
          sessionId,
          userId,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      })
    } else {
      await db.userRefrechToken.create({
        data: {
          sessionId,
          userId,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      })
    }
    return {
      data: refrechToken,
      status: 200,
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      status: 500,
      error: 'Failed to Create Refrech Token',
    }
  }
}

export async function logoutUser() {
  try {
    const session = await getServerUser()
    const userId = session?.id
    await db.userAccessToken.delete({
      where: {
        userId,
      },
    })
    await db.userRefrechToken.delete({
      where: {
        userId,
      },
    })
    const cookieStore = await cookies()
    cookieStore.delete({ name: 'accessToken', path: '/' })
    cookieStore.delete({ name: 'refrechToken', path: '/' })
    cookieStore.delete({ name: 'token', path: '/' })
    return {
      message: 'User session Deleted successfully',
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Faild to Logout user',
    }
  }
}

export async function getServerUser() {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value
    const refrechToken = cookieStore.get('refrechToken')?.value

    let existingToken: (UserAccessToken | UserRefrechToken) | null
    let sessionId = ''
    if (accessToken) {
      sessionId = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN as string,
      ) as string
      existingToken = await db.userAccessToken.findUnique({
        where: {
          sessionId,
        },
      })
    } else {
      sessionId = jwt.verify(
        refrechToken as string,
        process.env.REFRECH_TOKEN as string,
      ) as string
      existingToken = await db.userRefrechToken.findUnique({
        where: {
          sessionId,
        },
      })
    }
    const id = existingToken?.userId
    const existingUser = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        imageUrl: true,
        role: true,
        office: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
      },
    })
    return existingUser as TypeSesstionData
  } catch {
    return null
  }
}

export async function getServerOffice() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    const data = jwt.verify(
      token as string,
      process.env.ACCESS_TOKEN as string,
    ) as string
    console.log('data============', data)
    return data
  } catch {
    return null
  }
}

async function createNewOffice(formData: TypeLoginFormProps) {
  const { email, password } = formData
  try {
    // Encrypt the Password
    const hashedPassword = await bcrypt.hash(password, 10)

    const newOffice = await db.office.create({
      data: {
        name: 'office manager',
        email,
        password: hashedPassword,
        imageUrl: 'office manager',
      },
    })
    const accessToken = await generateAccessToken(newOffice?.id)
    await createOfficeServerSession(accessToken)
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
      error: 'Faild to Created new Office',
    }
  }
}

async function createNewAdmin(formData: TypeLoginFormProps) {
  const { email, password } = formData
  try {
    const officeId = (await getServerOffice()) ?? ''

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    })
    if (existingUser) {
      return {
        data: null,
        status: 403,
        error: `User email (${email}) Alredy exist`,
      }
    }
    const existingOffices = await db.office.findMany({
      select: {
        user: true,
      },
    })
    let isFound: boolean = false
    existingOffices?.map(({ user }) => {
      user?.map(({ role }) => {
        isFound = role === 'SUPER ADMIN' ? true : false
      })
    })

    // Encrypt the Password
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await db.user.create({
      data: {
        officeId,
        name: 'Super Admin',
        email,
        password: hashedPassword,
        imageUrl: 'imageUrl',
        role: isFound ? 'ADMIN' : 'SUPER ADMIN',
      },
    })
    const userLog = {
      userId: newUser?.id,
      officeId: newUser?.officeId,
      activity: `User (${newUser?.name}) Logged In Successfully`,
    }
    await createNewDocument()
    await createNewUserLog(userLog)
    await createAdminPermission(newUser?.id, newUser?.role)
    const accessToken = await generateUserAccessToken(newUser?.id)
    const refrechToken = await generateUserRefrechToken(newUser?.id)
    await createNewServerSession(
      accessToken?.data ?? '',
      refrechToken?.data ?? '',
    )
    revalidatePath('/dashboard/home/overview')
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
      error: 'Faild to Created new Office',
    }
  }
}

export async function createAdminPermission(userId: string, role: string) {
  try {
    const officeId = (await getServerOffice()) ?? ''

    await db.dashboardPermission.create({
      data: {
        userId,
        officeId,
        homeDisplay: true,
        userLogDisplay: true,
        userLogDelete: true,
      },
    })
    await db.settingPermission.create({
      data: {
        userId,
        officeId,
        officeDisplay: true,
        officeUpdate: true,
        userDisplay: true,
        userUpdate: true,
        documentDisplay: true,
        documentUpdate: true,
      },
    })
    if (role === 'SUPER ADMIN') {
      await db.officePermission.create({
        data: {
          userId,
          officeId,
          officeDisplay: true,
          officeCreate: true,
          officeUpdate: true,
          officeDelete: true,
        },
      })
    }

    await db.userPermission.create({
      data: {
        userId,
        officeId,
        userDisplay: true,
        userCreate: true,
        userUpdate: true,
        userDelete: true,
        userPermissionDisplay: true,
      },
    })
    await db.sentMessagePermission.create({
      data: {
        userId,
        officeId,
        typeMessageDisplay: true,
        typeMessageCreate: true,
        typeMessageUpdate: true,
        typeMessageDelete: true,
        sentMessageDisplay: true,
        sentMessageCreate: true,
        sentMessageView: true,
        sentMessageDelete: true,
        sentMessageArchive: true,
      },
    })
    await db.reciveMessagePermission.create({
      data: {
        userId,
        officeId,
        reciveMessageDisplay: true,
        reciveMessageView: true,
        reciveMessageDelete: true,
        reciveMessageArchive: true,
        reciveMessageTrDelay: true,
        delayMessageDisplay: true,
        delayMessageView: true,
        delayMessageDelete: true,
        delayMessageArchive: true,
        notificationDisplay: true,
        notificationRead: true,
      },
    })
    await db.archiveMessagePermission.create({
      data: {
        userId,
        officeId,
        departmentArchiveCreate: true,
        departmentArchiveDisplay: true,
        departmentArchiveUpdate: true,
        departmentArchiveDelete: true,
        ArchiveSentMessageDisplay: true,
        ArchiveSentMessageView: true,
        ArchiveSentMessageDelete: true,
        ArchiveReciveMessageDisplay: true,
        ArchiveReciveMessageView: true,
        ArchiveReciveMessageDelete: true,
      },
    })
    await db.backUpPermission.create({
      data: {
        userId,
        officeId,
        takeBackupDisplay: true,
        takeBackupCreate: true,
        restoreBackup: true,
      },
    })
    await db.humanResourcePermission.create({
      data: {
        userId,
        officeId,
        departmentAacademicDisplay: true,
        departmentAacademicCreate: true,
        departmentAacademicUpdate: true,
        departmentAacademicDelete: true,
        adminstrativeDisplay: true,
        adminstrativeCreate: true,
        adminstrativeUpdate: true,
        adminstrativeDelete: true,
        employeeDisplay: true,
        employeeCreate: true,
        employeeUpdate: true,
        employeeDelete: true,
        employeePrint: true,
      },
    })
  } catch (error) {}
}
