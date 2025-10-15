'use server'
import { db } from '@/lib/db'
import { getServerUser } from './auth'
import { createNewUserLog } from './userLogs'
import { revalidateTag } from 'next/cache'
import { Employee } from '@prisma/client'

export async function createNewEmployee(formData: Employee) {
  const {
    name,
    sex,
    qualification,
    academicDegree,
    academicTitle,
    academicRank,
    nationality,
    universiry,
    address,
    email,
    phone,
    faculity,
    file,
    fileName,
    joinDate,
    dateOfBrith,
    placeResidence,
    imageUrl,
    notes,
    officeId,
    acadimicDepartmentId,
    acadimicDepartmentSecondId,
    acadimicDepartmentThirdId,
    administrativeId,
  } = formData
  const check = await checkEmployeeValue(formData)
  if (check?.data === null) {
    return {
      error: check.error,
      status: check.status,
    }
  }

  try {
    const newEmployee = await db.employee.create({
      data: {
        name,
        sex,
        qualification,
        academicDegree,
        academicTitle,
        academicRank,
        nationality,
        universiry,
        faculity,
        address,
        email,
        phone,
        file,
        fileName,
        dateOfBrith: new Date(dateOfBrith),
        placeResidence,
        imageUrl,
        notes,
        officeId,
        acadimicDepartmentId,
        acadimicDepartmentSecondId,
        acadimicDepartmentThirdId,
        administrativeId,
        joinDate: new Date(joinDate),
      },
    })

    const session = await getServerUser()

    const userLog = {
      userId: session?.id,
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Create New Employee
       ${newEmployee.name} Successfully`,
    }
    await createNewUserLog(userLog)
    revalidateTag('/dashboard/human-resources/employees')

    return {
      data: newEmployee,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Faild to Create new employee',
    }
  }
}

export async function updateEmployeeById(formData: Employee, id: string) {
  const {
    name,
    sex,
    qualification,
    academicDegree,
    academicTitle,
    academicRank,
    nationality,
    universiry,
    faculity,
    address,
    email,
    phone,
    file,
    fileName,
    dateOfBrith,
    placeResidence,
    imageUrl,
    notes,
    officeId,
    acadimicDepartmentId,
    acadimicDepartmentSecondId,
    acadimicDepartmentThirdId,
    administrativeId,
    joinDate,
  } = formData
  try {
    const updatedEmployee = await db.employee.update({
      where: {
        id,
      },
      data: {
        name,
        sex,
        qualification,
        academicDegree,
        dateOfBrith: new Date(dateOfBrith),
        academicTitle,
        academicRank,
        nationality,
        universiry,
        address,
        email,
        phone,
        file,
        faculity,
        fileName,
        placeResidence,
        imageUrl,
        notes,
        officeId,
        acadimicDepartmentId,
        acadimicDepartmentSecondId,
        acadimicDepartmentThirdId,
        administrativeId,
        joinDate: new Date(joinDate),
      },
    })
    const session = await getServerUser()
    const userLog = {
      userId: session?.id,
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Updated Employee
       (${updatedEmployee?.name}) Successfully`,
    }
    if (updatedEmployee) {
      await createNewUserLog(userLog)
    }

    revalidateTag('/dashboard/human-resources/employees')
    return {
      data: updatedEmployee,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to updated Employee',
    }
  }
}

export async function deleteEmployeeById(id: string) {
  try {
    const deletedSuccess = await db.employee.delete({ where: { id } })
    const session = await getServerUser()
    const userLog = {
      userId: session?.id,
      officeId: session?.office?.id,
      activity: `User (${session?.name}) Deleted Employee
       (${deletedSuccess?.name}) Successfully`,
    }
    if (deletedSuccess) {
      await createNewUserLog(userLog)
    }
    revalidateTag('/dashboard/human-resources/employees')

    return {
      message: 'Employee has been Deleted',
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to deleted Employee',
    }
  }
}

export async function getEmployeeById(id: string) {
  try {
    const existingEmployee = await db.employee.findUnique({
      where: {
        id,
      },
      include: {
        administrative: true,
        acadimicDepartment: true,
        acadimicDepartmentSecond: true,
        acadimicDepartmentThird: true,
      },
    })
    if (!existingEmployee) {
      return {
        data: null,
        status: 402,
        error: 'Employee not found',
      }
    }
    return {
      data: existingEmployee,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to fetching employee',
    }
  }
}

export async function getEmployees(officeId: string | undefined) {
  try {
    const employeesData = await db.employee.findMany({
      where: {
        officeId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        administrative: true,
        acadimicDepartment: true,
        acadimicDepartmentSecond: true,
        acadimicDepartmentThird: true,
      },
    })

    return {
      data: employeesData,
      status: 200,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      data: null,
      status: 500,
      error: 'Failed to fetching employees',
    }
  }
}

/*FUNCTIONS*/

async function checkEmployeeValue(formData: Employee) {
  const { name, email, phone, officeId } = formData
  const existingName = await db.employee.findUnique({
    where: {
      name,
      officeId,
    },
  })
  if (existingName) {
    return {
      data: null,
      status: 401,
      error: `Employee name (${name}) alredy Created`,
    }
  }
  const existingEmail = await db.employee.findUnique({
    where: {
      email,
      officeId,
    },
  })
  if (existingEmail) {
    return {
      data: null,
      status: 401,
      error: `Employee email (${email}) alredy Created`,
    }
  }
  const existingPhone = await db.employee.findUnique({
    where: {
      phone,
      officeId,
    },
  })
  if (existingPhone) {
    return {
      data: null,
      status: 401,
      error: `Employee phone (${phone}) alredy Created`,
    }
  }
}
