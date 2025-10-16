/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useMemo, useRef, useState } from 'react'
import DataTable from '../DataTable'
import FixedHeader from '../Headers/FixedHeader'
import { useForm } from 'react-hook-form'
import { employeeColumn } from '@/app/(dummy)/data'
import TextInputSearch from '../FormInputs/TextInputSearch'
import { Employee, HumanResourcePermission } from '@prisma/client'
import { spliteObject } from '@/lib/spliteItem'
import { Printer } from 'lucide-react'
import EmployeeInvoice from '../Invoices/EmployeeInvoice'
import { useReactToPrint } from 'react-to-print'

export default function EmployeesData({
  data,
  permission,
}: {
  data: Employee[]
  permission: HumanResourcePermission
}) {
  const printReference = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({
    contentRef: printReference as any,
  })
  const {
    register,
    watch,
    formState: { errors },
  } = useForm()
  const search = watch('search')
  const newData = useMemo(() => {
    return (
      data?.length > 0 &&
      data?.filter((item: Employee) => {
        const searchValue =
          search === '' ||
          Object.values(spliteObject(item))
            ?.join()
            ?.toLowerCase()
            ?.includes(search?.toLowerCase())
        return searchValue
      })
    )
  }, [data, search]) as []

  return (
    <div>
      <FixedHeader
        linkUrl="/dashboard/human-resources/employees/new"
        textValue="Employees"
        numberData={newData?.length || 0}
        isHidden={!permission?.employeeCreate}
      />
      <div className=" overflow-auto md:mt-6 mt-4  md:mx-5 mx-3 ">
        {data?.length > 0 && (
          <div
            className="flex justify-start items-center
             md:gap-x-3 gap-x-2.5 md:gap-y-4 gap-y-0.1 
                        "
          >
            <div className="md:w-[274px] w-full">
              <TextInputSearch
                register={register}
                name="search"
                className="w-full"
                placeholder="Search Data"
              />
            </div>
            <div>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 mt-1
                px-5 h-[44px] w-[100px] cursor-pointer  shadow-sm border-1 border-gray-300 
            font-medium text-[14px]   bg-whitefont-medium
             text-14  rounded-md bg-white"
              >
                <Printer className="h-[16px]" />
                Print
              </button>
              <div className="hidden">
                <div>
                  <EmployeeInvoice initialData={newData} ref={printReference} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <DataTable
        data={newData}
        columns={employeeColumn}
        onUpdated={permission?.employeeUpdate}
        onDeleted={permission?.employeeDelete}
        linkToUpdate="/dashboard/human-resources/employees/update/"
        linkToCreate="/dashboard/human-resources/employees/new"
        titleToCreate="employee"
        resourceName="Employee"
      />
    </div>
  )
}
