/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { getServerUser } from '@/actions/auth'
import {
  getArchiveMessagePermissionById,
  updateArchiveMessagePermissionById,
} from '@/actions/permissions/archiveMessagePermissions'
import { getUsers } from '@/actions/users'
import { className } from '@/app/(dummy)/data'
import CheckBoxInput from '@/components/FormInputs/CheckBoxInput'
import SelectInput from '@/components/FormInputs/SelectInput'
import SubmitButton from '@/components/FormInputs/SubmitButton'
import { useStateContext } from '@/contexts/ContextProvider'
import { ArchiveMessagePermission } from '@prisma/client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function ArchiveMessagePermissionForm() {
  const { isLoading, setIsLoading } = useStateContext()
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<ArchiveMessagePermission>()
  const { data: user } = useQuery({
    queryKey: ['userSession'],
    queryFn: getServerUser,
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
    queryKey: ['archiveMessagePermission', id],
    queryFn: () => getArchiveMessagePermissionById(id!),
    enabled: !!id,
  })

  useEffect(() => {
    if (permissionData) {
      Object.entries(permissionData?.data as ArchiveMessagePermission)?.forEach(
        ([key, value]) => {
          setValue(key as keyof ArchiveMessagePermission, value as boolean)
        },
      )
    } else {
      reset()
    }
  }, [permissionData, setValue])
  const query = useQueryClient()
  async function onSubmit(data: ArchiveMessagePermission) {
    setIsLoading(true)

    const updatedPermission = await updateArchiveMessagePermissionById(data)
    if (updatedPermission?.status === 200) {
      reset()
      setIsLoading(false)
      query.invalidateQueries({ queryKey: ['archiveMessagePermission'] })
      toast.success('User archive message permission updated successfully')
    } else {
      setIsLoading(false)
      toast.error(updatedPermission?.error)
    }
  }

  return (
    <div className="p-3 bg-gray-100 rounded-lg mt-2">
      <h2 className="text-center font-semibold text-17 underline  ">
        Archive Messages Pages
      </h2>
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-3 grid-cols-1  gap-2 mt-6">
          <div className="w-fit border-1 border-blue-300 p-3 pt-2  rounded-lg">
            <h2>Department Archive</h2>
            <div className="grid grid-cols-4 gap-2 mt-2">
              <CheckBoxInput
                label="Display"
                name="departmentArchiveDisplay"
                register={register}
                className={className}
              />
              <CheckBoxInput
                label="Create"
                name="departmentArchiveCreate"
                register={register}
                className={className}
              />
              <CheckBoxInput
                label="Update"
                name="departmentArchiveUpdate"
                register={register}
                className={className}
              />
              <CheckBoxInput
                label="Delete"
                name="departmentArchiveDelete"
                register={register}
                className={className}
              />
            </div>
          </div>
          <div className="w-fit border-1 border-blue-300 p-3 pt-2  rounded-lg">
            <h2>Archive Sent Messages</h2>
            <div className="grid grid-cols-4 gap-2 mt-2">
              <CheckBoxInput
                label="Display"
                name="ArchiveSentMessageDisplay"
                register={register}
                className={className}
              />
              <CheckBoxInput
                label="View"
                name="ArchiveSentMessageView"
                register={register}
                className={className}
              />
              <CheckBoxInput
                label="Delete"
                name="ArchiveSentMessageDelete"
                register={register}
                className={className}
              />
            </div>
          </div>
          <div className="w-fit border-1 border-blue-300 p-3 pt-2  rounded-lg">
            <h2>Archive Recive Messages</h2>
            <div className="grid grid-cols-4 gap-2 mt-2">
              <CheckBoxInput
                label="Display"
                name="ArchiveReciveMessageDisplay"
                register={register}
                className={className}
              />
              <CheckBoxInput
                label="View"
                name="ArchiveReciveMessageView"
                register={register}
                className={className}
              />
              <CheckBoxInput
                label="Delete"
                name="ArchiveReciveMessageDelete"
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
