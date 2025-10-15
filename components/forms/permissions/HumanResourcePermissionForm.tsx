/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { getServerUser } from '@/actions/auth'

import { getHumanResourcePermissionById, updateHumanResourcePermissionById } from '@/actions/permissions/humanResourcePermission'
import { getUsers } from '@/actions/users'
import { className } from '@/app/(dummy)/data'
import CheckBoxInput from '@/components/FormInputs/CheckBoxInput'
import SelectInput from '@/components/FormInputs/SelectInput'
import SubmitButton from '@/components/FormInputs/SubmitButton'
import { useStateContext } from '@/contexts/ContextProvider'
import { HumanResourcePermission } from '@prisma/client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function HumanResourcePermissionForm() {
  const { isLoading, setIsLoading } = useStateContext()
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<HumanResourcePermission>()
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
    queryKey: ['humanResourcePermission', id],
    queryFn: () => getHumanResourcePermissionById(id!),
    enabled:!!id
  })

  useEffect(() => {
    if (permissionData) {
      Object.entries(permissionData?.data as HumanResourcePermission)?.forEach(
        ([key, value]) => {
          setValue(
            key as keyof HumanResourcePermission,
            value as boolean,
          )
        },
      )
    } else {
      reset()
    }
  }, [permissionData, setValue])
  const query = useQueryClient()
  async function onSubmit(data: HumanResourcePermission) {
    setIsLoading(true)

    const updatedPermission = await updateHumanResourcePermissionById(data)
    if (updatedPermission?.status === 200) {
      reset()
      setIsLoading(false)
      query.invalidateQueries({ queryKey: ['humanResourcePermission'] })
      toast.success('User human resource updated successfully')
    } else {
      setIsLoading(false)
      toast.error(updatedPermission?.error)
    }
  }

  return (
    <div className="p-3 bg-gray-100 rounded-lg mt-2">
      <h2 className="text-center font-semibold text-17 underline  ">
        Human Resource Pages
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
            <h2>Administrative Posittion</h2>
            <div className="grid grid-cols-4 gap-2 mt-2">
              <CheckBoxInput
                label="Display"
                name="adminstrativeDisplay"
                register={register}
                className={className}
              />
              <CheckBoxInput
                label="Create"
                name="adminstrativeCreate"
                register={register}
                className={className}
              />
              <CheckBoxInput
                label="Update"
                name="adminstrativeUpdate"
                register={register}
                className={className}
              />
              <CheckBoxInput
                label="Delete"
                name="adminstrativeDelete"
                register={register}
                className={className}
              />
            </div>
          </div>
          <div className="w-fit border-1 border-blue-300 p-3 pt-2  rounded-lg">
            <h2>Department Acadimic</h2>
            <div className="grid grid-cols-4 gap-2 mt-2">
              <CheckBoxInput
                label="Display"
                name="departmentAacademicDisplay"
                register={register}
                className={className}
              />
              <CheckBoxInput
                label="Create"
                name="departmentAacademicCreate"
                register={register}
                className={className}
              />
              <CheckBoxInput
                label="Update"
                name="departmentAacademicUpdate"
                register={register}
                className={className}
              />
              <CheckBoxInput
                label="Delete"
                name="departmentAacademicDelete"
                register={register}
                className={className}
              />
            </div>
          </div>
          <div className="w-fit border-1 border-blue-300 p-3 pt-2  rounded-lg">
            <h2>Employees</h2>
          <div className="grid grid-cols-4 gap-2 mt-2">
              <CheckBoxInput
                label="Display"
                name="employeeDisplay"
                register={register}
                className={className}
              />
              <CheckBoxInput
                label="Create"
                name="employeeCreate"
                register={register}
                className={className}
              />
              <CheckBoxInput
                label="Update"
                name="employeeUpdate"
                register={register}
                className={className}
              />
              <CheckBoxInput
                label="Delete"
                name="employeeDelete"
                register={register}
                className={className}
              />
              <CheckBoxInput
                label="Print --"
                name="employeePrint"
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
