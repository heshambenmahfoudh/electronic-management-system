'use client'
import DataTable from '../DataTable'
import FixedHeader from '../Headers/FixedHeader'
import { useForm } from 'react-hook-form'
import { officeColumn } from '@/app/(dummy)/data'
import { useMemo } from 'react'
import TextInputSearch from '../FormInputs/TextInputSearch'
import { Office, OfficePermission } from '@prisma/client'

export default function OfficesData({
  data,
  permission,
}: {
  data: Office[]
  permission: OfficePermission
}) {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm()
  const search = watch('search')
  const newData = useMemo(() => {
    return (
      data?.length > 0 &&
      data?.filter((item: Office) => {
        const searchValue =
          search === '' ||
          Object.values(item)
            ?.join()
            ?.toLowerCase()
            ?.includes(search?.toLowerCase())
        return searchValue
      })
    )
  }, [data, search])as []
  return (
    <div>
      <FixedHeader
        linkUrl="/dashboard/offices/new"
        textValue="Offices"
        numberData={newData?.length ||0}
        isHidden={!permission?.officeCreate}
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
          </div>
        )}
      </div>
      <DataTable
        data={newData}
        columns={officeColumn}
        onUpdated={permission?.officeUpdate}
        onDeleted={permission?.officeDelete}
        linkToUpdate="/dashboard/offices/update/"
        linkToCreate="/dashboard/offices/new"
        titleToCreate="offices"
        resourceName="Office"
      />
    </div>
  )
}
