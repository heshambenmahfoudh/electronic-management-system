/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { db } from '@/lib/db'
import { TypeUserLogsGroupDate, userLogForm } from '@/types/types'
import { headers } from 'next/headers'
import { UAParser } from 'ua-parser-js'
import { revalidatePath } from 'next/cache'

export async function createNewUserLog(formData: userLogForm) {
  const { officeId, userId, activity } = formData
  const data = await informationLogs()

  try {
    const newUserLog = await db.userLog.create({
      data: {
        userId,
        officeId,
        activity,
        ipAdress: data?.ipAdress,
        device: data?.device,
      },
    })

    return {
      data: newUserLog,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Faild to Created new User log',
    }
  }
}

export async function getUserLogs(officeId: string) {
  try {
    const usersLogsData = await db.userLog.findMany({
      where: {
        officeId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    })

    const groupedDate = usersLogsData?.reduce((acc, log: any) => {
      const date = log?.createdAt?.toString()?.slice(0, 15)
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date]?.push(log)
      return acc
    }, {} as TypeUserLogsGroupDate)
    const usersLogs = Object.entries(groupedDate).map(
      ([logDate, userLogs]) => ({
        logDate,
        userLogs,
      }),
    )

    return {
      data: usersLogs,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to fetching users logs',
    }
  }
}

export async function deleteUserLogById(id: string) {
  try {
    if (!id) {
      return {
        message: 'User Id not Found',
        status: 404,
        error: null,
      }
    }
    await db.userLog.delete({
      where: { id },
    })
    console.log('id user lod', id)
    revalidatePath('/dashboard/logs')
    return {
      message: 'User log Deleted successfully',
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to Deleted user logs',
    }
  }
}

async function informationLogs() {
  try {
    const userAgent = (await headers()).get('user-agent') || ''
    const parser = new UAParser(userAgent)
    const result = await parser.getResult()
    const device = (await result.device.type) || 'Desktop'
    const browser = (await result.browser.name) || ''
    const ipAdress =
      (await headers()).get('x-forwarded-for') ||
      (await headers()).get('x-real-ip') ||
      'Unknown IP'
    return {
      ipAdress: ipAdress,
      device: device,
      browser: browser,
    }
  } catch {}
}
