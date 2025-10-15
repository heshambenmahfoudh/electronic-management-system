'use client'
import { useMemo } from 'react'
import DataTable from '../DataTable'
import FixedHeader from '../Headers/FixedHeader'
import { useForm } from 'react-hook-form'
import { departmentArchiveColumn } from '@/app/(dummy)/data'
import TextInputSearch from '../FormInputs/TextInputSearch'
import {
  AdministrativePosittion,
  HumanResourcePermission,
} from '@prisma/client'

export default function AdministrativePositionsData({
  data,
  permission,
}: {
  data: AdministrativePosittion[]
  permission: HumanResourcePermission
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
      data?.filter((item: AdministrativePosittion) => {
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
        linkUrl="/dashboard/human-resources/administrative-positions/new"
        textValue="Administrative Positions"
        numberData={newData?.length | 0}
        isHidden={!permission?.adminstrativeCreate}
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
        columns={departmentArchiveColumn}
        onUpdated={permission?.adminstrativeUpdate}
        onDeleted={permission?.adminstrativeDelete}
        linkToUpdate="/dashboard/human-resources/administrative-positions/update/"
        linkToCreate="/dashboard/human-resources/administrative-positions/new"
        titleToCreate="administrative-positions"
        resourceName="Administrative Positions"
      />
    </div>
  )
}
