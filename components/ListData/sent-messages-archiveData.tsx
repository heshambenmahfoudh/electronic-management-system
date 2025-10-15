'use client'
import DataTable from '../DataTable'
import FixedHeader from '../Headers/FixedHeader'
import { useForm } from 'react-hook-form'
import { useMemo, useState } from 'react'
import { spliteObject } from '@/lib/spliteItem'
import { ArchiveMessagePermission, SentArchive } from '@prisma/client'
import TextInputSearch from '../FormInputs/TextInputSearch'
import { archiveSentMessageColumn } from '@/app/(dummy)/data'
import { useStateContext } from '@/contexts/ContextProvider'
import VeiwMessageForm from '../forms/VeiwMessageForm'
import { useQuery } from '@tanstack/react-query'
import { getDepartmentArchives } from '@/actions/departmentArchive'

import SelectInputSearch from '../FormInputs/SelectInputSearch'

export default function SentMessagesArchiveData({
  data,
  permission,
  officeId,
}: {
  data: SentArchive[]
  permission: ArchiveMessagePermission
  officeId: string
}) {
  const { register, control, watch } = useForm()

  const search = watch('search')
  const department = watch('department')
  const fromDate = watch('fromDate')
  const toDate = watch('toDate')
  const newData = useMemo(() => {
    return (
      data?.length > 0 &&
      data?.filter((item: SentArchive) => {
        const searchValue =
          !search ||
          Object.values(spliteObject(item))
            ?.join()
            ?.toLowerCase()
            ?.includes(search?.toLowerCase())
        const existDate = new Date(item?.date)
        const existDepartment =
          !department || item?.departmentArciveId === department

        const rangeDate =
          (!fromDate || new Date(fromDate) <= existDate) &&
          (!toDate || existDate <= new Date(toDate))
        return searchValue && existDepartment && rangeDate
      })
    )
  }, [data, search, department, fromDate, toDate]) as []
  const [numberId, setNumberId] = useState<string | null>()
  const { openViewModel, setOpenViewModel } = useStateContext()
  const initialData =
    newData && newData?.filter((item: SentArchive) => item?.id === numberId)
  function handleClickGetId(id: string) {
    setNumberId(id)
    setOpenViewModel(!openViewModel)
  }

  const { data: departmentData } = useQuery({
    queryKey: ['departmentArchivesData'],
    queryFn: () => getDepartmentArchives(officeId),
    enabled: !!officeId,
  })
  const departmentOptions = departmentData?.data?.map(({ id, title }) => ({
    value: id,
    label: title,
  }))

  return (
    <div>
      <FixedHeader
        textValue="Archive Sent Messages"
        numberData={Number(newData?.length) | 0}
        isHidden={true}
      />

      <div className="md:mt-6 mt-4  md:mx-5 mx-3   ">
        {data?.length > 0 && (
          <div
            className="grid gap-x-2 md:gap-y-4 gap-y-0.1 
                       md:grid-cols-4 grid-cols-1  "
          >
            <div className="flex items-center md:col-span-2 md:gap-x-2">
              <TextInputSearch
                register={register}
                name="search"
                className="md:w-full w-1/2 "
                placeholder="Search Data"
              />
              <SelectInputSearch
                name="department"
                control={control}
                className="md:w-full w-1/2  "
                options={departmentOptions}
                option="Department"
              />
            </div>

            <div className="flex items-center">
              <TextInputSearch
                type="date"
                register={register}
                name="fromDate"
                className="w-full"
                placeholder="Enter from date"
              />
              <TextInputSearch
                type="date"
                register={register}
                name="toDate"
                className="w-full"
                placeholder="Enter to date"
              />
            </div>
          </div>
        )}
      </div>
      <DataTable
        data={newData}
        columns={archiveSentMessageColumn}
        onDeleted={permission?.ArchiveSentMessageDelete}
        onView={permission?.ArchiveSentMessageView}
        resourceName="Arcive Sent Message"
        handleClickGetId={handleClickGetId}
      />
      {openViewModel && <VeiwMessageForm initialData={initialData?.[0]} />}
    </div>
  )
}
