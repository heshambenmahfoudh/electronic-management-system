'use client'
import DataTable from '../DataTable'
import FixedHeader from '../Headers/FixedHeader'
import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import { spliteObject } from '@/lib/spliteItem'
import { SentMessage, SentMessagePermission } from '@prisma/client'
import TextInputSearch from '../FormInputs/TextInputSearch'
import { sentMessageColumn } from '@/app/(dummy)/data'

export default function SentMessagesData({
  data,
  permission,
}: {
  data: SentMessage[]
  permission: SentMessagePermission
}) {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm()

  const search = watch('search')
  const fromDate = watch('fromDate')
  const toDate = watch('toDate')
  const newData = useMemo(() => {
    return (
      data?.length > 0 &&
      data?.filter((item: SentMessage) => {
        const searchValue =
          search === '' ||
          Object.values(spliteObject(item))
            ?.join()
            ?.toLowerCase()
            ?.includes(search?.toLowerCase())
        const existDate = new Date(item?.date)
        const rangeDate =
          (!fromDate || new Date(fromDate) <= existDate) &&
          (!toDate || existDate <= new Date(toDate))
        return searchValue && rangeDate
      })
    )
  }, [data, search, fromDate, toDate]) as []
  return (
    <div>
      <FixedHeader
        linkUrl="/dashboard/sent-messages/management-messages/new"
        textValue="Sent Messages"
        numberData={newData?.length | 0}
        isHidden={!permission?.sentMessageCreate}
      />

      <div className=" overflow-auto md:mt-6 mt-4  md:mx-5 mx-3 ">
        {data?.length > 0 && (
          <div
            className="grid gap-x-3 md:gap-y-4 gap-y-0.1 
                      md:grid-cols-4 grid-cols-1  "
          >
            <TextInputSearch
              register={register}
              name="search"
              className="w-full"
              placeholder="Search Data"
            />
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
        columns={sentMessageColumn}
        onDeleted={permission?.sentMessageDelete}
        onView={permission?.sentMessageView}
        linkToCreate="/dashboard/sent-messages/management-messages/new"
        linkToView="/dashboard/sent-messages/management-messages/view/"
        titleToCreate="sent-messages"
        resourceName="Sent message"
      />
    </div>
  )
}
