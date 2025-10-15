/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import crypto from 'crypto'
import { db } from '@/lib/db'
import { getServerUser } from './auth'
import { createNewUserLog } from './userLogs'

export async function createNewBackup() {
  try {
    const session = await getServerUser()
    const superAdmen = session?.role === 'SUPER ADMIN'
    const officeId = session?.office?.id
    const users = await db.user.findMany({
      where: {
        officeId,
      },
    })
    const offices = await db.office.findMany()
    const userLogs = await db.userLog.findMany({
      where: {
        officeId,
      },
    })
    const typeMessage = await db.typeMessage.findMany({
      where: {
        officeId,
      },
    })
    const sentMessages = await db.sentMessage.findMany({
      where: {
        officeSentId: officeId,
      },
    })
    const reciveMessages = await db.reciveMessage.findMany({
      where: {
        officeReciveId: officeId,
      },
    })
    const archiveSent = await db.sentArchive.findMany({
      where: {
        officeSentId: officeId,
      },
    })
    const archiveRecive = await db.reciveArchive.findMany({
      where: {
        officeReciveId: officeId,
      },
    })
    const departmentArchive = await db.departmentArchive.findMany({
      where: {
        officeId,
      },
    })
    const delayMessage = await db.delayMessage.findMany({
      where: {
        officeReciveId: officeId,
      },
    })
    const departmentAcadimic = await db.acadimicDepartment.findMany({
      where: {
        officeId,
      },
    })
    const administrativePosittion = await db.administrativePosittion.findMany({
      where: {
        officeId,
      },
    })
    const employee = await db.employee.findMany({
      where: {
        officeId,
      },
    })
    const userPermissions = await db.userPermission.findMany({
      where: {
        officeId,
      },
    })
    const officePermissions = await db.officePermission.findMany({
      where: {
        officeId,
      },
    })
    const dashboardPermissions = await db.dashboardPermission.findMany({
      where: {
        officeId,
      },
    })
    const sentMessagePermissions = await db.sentMessagePermission.findMany({
      where: {
        officeId,
      },
    })
    const reciveMessagePermissions = await db.reciveMessagePermission.findMany({
      where: {
        officeId,
      },
    })
    const archivePermissions = await db.archiveMessagePermission.findMany({
      where: {
        officeId,
      },
    })
    const backupPermissions = await db.backUpPermission.findMany({
      where: {
        officeId,
      },
    })
    const settingPermissions = await db.settingPermission.findMany({
      where: {
        officeId,
      },
    })
    let backUpData
    if (superAdmen) {
      backUpData = {
        users,
        offices,
        userLogs,
        typeMessage,
        sentMessages,
        reciveMessages,
        archiveSent,
        archiveRecive,
        departmentArchive,
        delayMessage,
        departmentAcadimic,
        administrativePosittion,
        employee,
        userPermissions,
        officePermissions,
        dashboardPermissions,
        sentMessagePermissions,
        reciveMessagePermissions,
        archivePermissions,
        backupPermissions,
        settingPermissions,
      }
    } else {
      backUpData = {
        users,
        userLogs,
        typeMessage,
        sentMessages,
        reciveMessages,
        archiveSent,
        archiveRecive,
        departmentArchive,
        delayMessage,
        departmentAcadimic,
        administrativePosittion,
        employee,
        userPermissions,
        officePermissions,
        dashboardPermissions,
        sentMessagePermissions,
        reciveMessagePermissions,
        archivePermissions,
        backupPermissions,
        settingPermissions,
      }
    }

    const encryptBacup = await encyptData(backUpData)

    const date = new Date()
    const existDate = date
      ?.toString()
      ?.replace(/[^\w.-]/g, '-')
      ?.slice(0, 15)
    const existTime = date
      ?.toString()
      ?.replace(/[^\w.-]/g, '-')
      ?.slice(16, 24)

    const data = {
      fileName: `Backup+( Date (${existDate}) + Time + (${existTime}) ).json`,
      blobData: encryptBacup,
    }

    const userLog = {
      userId: session?.id ?? '',
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Create a new Backup (${data?.fileName}) Successfully`,
    }
    if (data) {
      await createNewUserLog(userLog)
    }
    return {
      data: data,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Faild to Created new Back up',
    }
  }
}

export async function restoreOldBackup(restoreBackupData: string) {
  try {
    const decryptBacup = await decyptData(restoreBackupData!)

    const session = await getServerUser()
    const users = await db.user.createMany({
      data: decryptBacup.users,
      skipDuplicates: true,
    })
    const offices = await db.office.createMany({
      data: decryptBacup.offices,
      skipDuplicates: true,
    })
    const userLogs = await db.userLog.createMany({
      data: decryptBacup.userLogs,
      skipDuplicates: true,
    })
    const typeMessage = await db.typeMessage.createMany({
      data: decryptBacup.typeMessage,
      skipDuplicates: true,
    })
    const sentMessages = await db.sentMessage.createMany({
      data: decryptBacup.sentMessages,
      skipDuplicates: true,
    })
    const reciveMessages = await db.reciveMessage.createMany({
      data: decryptBacup.reciveMessages,
      skipDuplicates: true,
    })
    const archiveSent = await db.sentArchive.createMany({
      data: decryptBacup.archiveSent,
      skipDuplicates: true,
    })
    const archiveRecive = await db.reciveArchive.createMany({
      data: decryptBacup.archiveRecive,
      skipDuplicates: true,
    })
    const departmentArchive = await db.departmentArchive.createMany({
      data: decryptBacup.departmentArchive,
      skipDuplicates: true,
    })
    const delayMessage = await db.delayMessage.createMany({
      data: decryptBacup.delayMessage,
      skipDuplicates: true,
    })
    const departmentAcadimic = await db.acadimicDepartment.createMany({
      data: decryptBacup.departmentAcadimic,
      skipDuplicates: true,
    })
    const administrativePosittion = await db.administrativePosittion.createMany(
      {
        data: decryptBacup.administrativePosittion,
        skipDuplicates: true,
      },
    )
    const employee = await db.employee.createMany({
      data: decryptBacup.employee,
      skipDuplicates: true,
    })
    const userPermissions = await db.userPermission.createMany({
      data: decryptBacup.userPermissions,
      skipDuplicates: true,
    })
    const officePermissions = await db.officePermission.createMany({
      data: decryptBacup.officePermissions,
      skipDuplicates: true,
    })
    const dashboardPermissions = await db.dashboardPermission.createMany({
      data: decryptBacup.dashboardPermissions,
      skipDuplicates: true,
    })
    const sentMessagePermissions = await db.sentMessagePermission.createMany({
      data: decryptBacup.sentMessagePermissions,
      skipDuplicates: true,
    })
    const reciveMessagePermissions = await db.reciveMessagePermission.createMany(
      {
        data: decryptBacup.reciveMessagePermissions,
        skipDuplicates: true,
      },
    )
    const archivePermissions = await db.archiveMessagePermission.createMany({
      data: decryptBacup.archivePermissions,
      skipDuplicates: true,
    })
    const backupPermissions = await db.backUpPermission.createMany({
      data: decryptBacup.backupPermissions,
      skipDuplicates: true,
    })
    const settingPermissions = await db.settingPermission.createMany({
      data: decryptBacup.settingPermissions,
      skipDuplicates: true,
    })

    const backUpData = {
      users,
      offices,
      userLogs,
      typeMessage,
      sentMessages,
      reciveMessages,
      archiveSent,
      archiveRecive,
      departmentArchive,
      delayMessage,
      departmentAcadimic,
      administrativePosittion,
      employee,
      userPermissions,
      officePermissions,
      dashboardPermissions,
      sentMessagePermissions,
      reciveMessagePermissions,
      archivePermissions,
      backupPermissions,
      settingPermissions,
    }

    const userLog = {
      userId: session?.id ?? '',
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Restore a old Backup Successfully`,
    }
    if (backUpData) {
      await createNewUserLog(userLog)
    }
    return {
      message: 'Restore a old Backup Successfully',
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Faild to Created Restore Back up',
    }
  }
}

async function encyptData(data: any) {
  try {
    const SECRET_KEY = process.env.ENCRYPT_SECRET!.padEnd(32, '')
    const IV = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      Buffer.from(SECRET_KEY),
      IV,
    )
    const cipherUpdate = cipher.update(JSON.stringify(data), 'utf8')
    const encrypted = Buffer?.concat([cipherUpdate, cipher.final()])
    return {
      iv: IV.toString('hex'),
      content: encrypted.toString('hex'),
    }
  } catch (error) {
    console.log(error)
  }
}

async function decyptData(encrypted: string) {
  try {
    const parsed = JSON.parse(encrypted)

    const SECRET_KEY = process.env.ENCRYPT_SECRET!.padEnd(32, '')
    const IV = Buffer.from(parsed.iv, 'hex')
    const encryptedText = Buffer.from(parsed.content, 'hex')
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(SECRET_KEY),
      IV,
    )

    const cipherUpdate = decipher.update(encryptedText)
    const decrypted = Buffer.concat([cipherUpdate, decipher.final()])
    return JSON.parse(decrypted.toString('utf8'))
  } catch (error) {
    console.log(error)
  }
}
