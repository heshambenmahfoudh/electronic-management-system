/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client'
import { getServerUser } from '@/actions/auth'
import {
  getUserPermissionById,
  updateUserPermissionById,
} from '@/actions/permissions/userPermissions'
import { getUsers } from '@/actions/users'
import { className } from '@/app/(dummy)/data'
import CheckBoxInput from '@/components/FormInputs/CheckBoxInput'
import SelectInput from '@/components/FormInputs/SelectInput'
import SubmitButton from '@/components/FormInputs/SubmitButton'
import { useStateContext } from '@/contexts/ContextProvider'
import { UserPermission } from '@prisma/client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function UserPermissionForm() {
  const { isLoading, setIsLoading } = useStateContext()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<UserPermission>()
   const { data: user } = useQuery({
    queryKey: ['userSession'],
    queryFn:getServerUser,
  })
  const officeId = user?.office?.id
  const userId = user?.id
  const id = watch('userId')
  const { data: usersData } = useQuery({
    queryKey: ['usersData', officeId,userId],
    queryFn: () => getUsers(officeId!,userId),
    enabled: !!officeId && !!userId,
  })
  const usersOptions = usersData?.data?.map(({ id, name }) => ({
    value: id,
    label: name,
  }))

  const { data: permissionData } = useQuery({
    queryKey: ['userPermission', id],
    queryFn: () => getUserPermissionById(id!),
    enabled:!!id
  })

  useEffect(() => {
    if (permissionData) {
      Object.entries(permissionData?.data as UserPermission)?.forEach(
        ([key, value]) => {
          setValue(key as keyof UserPermission, value as boolean)
        },
      )
    } else {
      reset()
    }
  }, [permissionData, setValue])
  const query = useQueryClient()
  async function onSubmit(data: UserPermission) {
    setIsLoading(true)
    const updatedPermission = await updateUserPermissionById(data)
    if (updatedPermission?.status === 200) {
      reset()
      setIsLoading(false)
      query.invalidateQueries({ queryKey: ['userPermission'] })
      toast.success('User user permission updated successfully')
    } else {
      setIsLoading(false)
      toast.error(updatedPermission?.error)
    }
  }

  return (
    <div className="p-3 bg-gray-100 rounded-lg mt-2">
      <h2 className="text-center font-semibold text-17 underline  ">
        Users Pages
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="  
        max-w-[354px]  mt-3"
        >
          <SelectInput
            label="Select User"
            name="userId"
            control={control}
            className="w-full"
            options={usersOptions}
            errors={errors}
            option="User"
          />
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1  gap-2 mt-6">
          <div className="w-fit border-1 border-blue-300 p-3 pt-2  rounded-lg">
            <h2>Users</h2>
            <div className="grid grid-cols-4 gap-2 mt-2">
              <CheckBoxInput
                label="Display"
                name="userDisplay"
                register={register}
                className={className}
              />
              <CheckBoxInput
                label="Create"
                name="userCreate"
                register={register}
                className={className}
              />
              <CheckBoxInput
                label="Update"
                name="userUpdate"
                register={register}
                className={className}
              />
              <CheckBoxInput
                label="Delete"
                name="userDelete"
                register={register}
                className={className}
              />
            </div>
          </div>
          <div className="w-fit border-1 border-blue-300 p-3 pt-2  rounded-lg">
            <h2>Usres Permissions</h2>
            <div className="grid grid-cols-4 gap-2 mt-2">
              <CheckBoxInput
                label="Display"
                name="userPermissionDisplay"
                register={register}
                className={className}
              />
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-between gap-4 items-center">
          <SubmitButton
            title="Update permission"
            isLoading={isLoading}
            loadingTitle="Updating permission please wait..."
          />
        </div>
      </form>
    </div>
  )
}
