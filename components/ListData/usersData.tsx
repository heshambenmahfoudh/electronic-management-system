'use client'
import DataTable from '../DataTable'
import FixedHeader from '../Headers/FixedHeader'
import { useForm } from 'react-hook-form'
import { userColumn } from '@/app/(dummy)/data'
import { useMemo } from 'react'
import TextInputSearch from '../FormInputs/TextInputSearch'
import { User, UserPermission } from '@prisma/client'

export default function UsersData({
  data,
  permission,
}: {
  data: User[]
  permission: UserPermission
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
      data?.filter((item: User) => {
        const searchValue =
          search === '' ||
          Object.values(item)
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
        linkUrl="/dashboard/users/new"
        textValue="Users"
        numberData={newData?.length || 0}
        isHidden={!permission?.userCreate}
      />
      <div className=" overflow-auto md:mt-6 mt-4  md:mx-5 mx-3 ">
        {data?.length > 0 && (
          <div className="grid gap-x-3 md:gap-y-4 gap-y-0.1 md:grid-cols-4 grid-cols-1">
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
        columns={userColumn}
        onUpdated={permission?.userUpdate}
        onDeleted={permission?.userDelete}
        linkToUpdate="/dashboard/users/update/"
        linkToCreate="/dashboard/users/new"
        titleToCreate="users"
        resourceName="User"
      />
    </div>
  )
}
