'use client'
import React, { useEffect, useState } from 'react'
import SelectInput from './FormInputs/SelectInput'
import { FormOptionsDataType } from '@/types/types'
import { useForm } from 'react-hook-form'
import { getDepartmentArchives } from '@/actions/departmentArchive'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getServerUser } from '@/actions/auth'
type SearchFormProps = {
  department: string
}
export default function SearchByDepartment({ page }: { page: string }) {
  const [formOptionsData, setFormOptionsData] = useState<FormOptionsDataType>({
    departmentOptions: [],
  })
  const {
    control,
    watch,
    formState: { errors },
  } = useForm<SearchFormProps>()
const { data: user } = useQuery({
    queryKey: ['userSession'],
    queryFn: getServerUser,
  })
    const officeId = user?.office?.id
  const department = watch('department')
  console.log(department)
  useEffect(() => {
    async function fetchData() {
      const departmentData = (await getDepartmentArchives(officeId!)).data?.map(
        ({ id, title }) => ({
          value: id,
          label: title,
        }),
      )
      setFormOptionsData({
        departmentOptions: departmentData,
      })
    }
    fetchData()
  }, [officeId])
  const router = useRouter()
  useEffect(() => {
    if (department && department !== 'Select Department') {
      router.push(
        page === 'archiveSent'
          ? `/dashboard/archive/archive-sent-messages?dep=${department}`
          : `/dashboard/archive/archive-incoming-messages?dep=${department}`,
      )
    } else {
      router.push(
        page === 'archiveSent'
          ? `/dashboard/archive/archive-sent-messages`
          : `/dashboard/archive/archive-incoming-messages`,
      )
    }
  }, [department, officeId, page, router])

  return (
    <div className="my-1.5 -mb-2.5 md:mx-5 sm:mx-4 mx-3">
      <SelectInput
        name="department"
        control={control}
        className="md:w-1/3 w-full"
        options={formOptionsData?.departmentOptions}
        option="Department"
        errors={errors}
      />
    </div>
  )
}
