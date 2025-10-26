'use client'
import { ChangeEvent, useState } from 'react'
import SubmitButton from '../FormInputs/SubmitButton'
import TextInput from '../FormInputs/TextInput'
import SelectInput from '../FormInputs/SelectInput'
import { useForm } from 'react-hook-form'
import SelectImageUrlInput from '../FormInputs/SelectImageUrlInput'
import ButtonClose from '../ButtonClose'
import { createNewUser, updateUserById } from '@/actions/users'
import toast from 'react-hot-toast'
import { roleOptions, roleSuperAdminOptions } from '@/app/(dummy)/data'
import FormHeader from '../Headers/FormHeader'
import { useRouter } from 'next/navigation'
import { makePostRequestImageUrl } from '@/lib/apiRequest'
import { useStateContext } from '@/contexts/ContextProvider'
import { getServerUser } from '@/actions/auth'
import { useQuery } from '@tanstack/react-query'
import { User } from '@prisma/client'

export default function UserForm({
  initialData,
  isUpdate,
}: {
  initialData?: User
  isUpdate?: string
}) {
  const { isLoading, setIsLoading } = useStateContext()
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl)
  const [isLoadingImageUrl, setIsLoadingImageUrl] = useState(false)
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<User>({
    defaultValues: { ...initialData, password: isUpdate && '**********' },
  })
  const router = useRouter()
  const { data: user } = useQuery({
    queryKey: ['userSession'],
    queryFn: getServerUser,
  })

  async function changeImageUrl(e: ChangeEvent<HTMLInputElement>) {
    const result = await makePostRequestImageUrl(e, setIsLoadingImageUrl)
    if (result?.status === 200) {
      setImageUrl(result?.data)
      toast.success('Upload imageUrl Successfully')
    } else {
      setImageUrl('')
      toast.error('Failed to Upload imageUrl')
    }
  }
  async function onSubmit(data: User) {
    setIsLoading(true)
    data.imageUrl = imageUrl ?? ''
    data.officeId = user?.office?.id as string
    if (isUpdate) {
      try {
        const updated = await updateUserById(data, isUpdate)
        if (updated?.status === 200) {
          router.push('/dashboard/users')
          reset()
          setImageUrl('')
          setIsLoading(false)
          toast.success(`User Updated successfully`)
        } else {
          setIsLoading(false)
          toast.error(updated?.error)
        }
      } catch (error) {
        setIsLoading(false)
      }
    } else {
      try {
        const createNew = await createNewUser(data)
        if (createNew?.status === 200) {
          router.push('/dashboard/users')
          reset()
          setImageUrl('')
          setIsLoading(false)
          toast.success('New user created successfully')
        } else {
          setIsLoading(false)
          toast.error(createNew?.error)
        }
      } catch (error) {
        setIsLoading(false)
      }
    }
  }

  return (
    <div>
      <FormHeader
        titleValue={isUpdate ? 'update user' : 'new user'}
        linkUrl="/dashboard/users"
      />
      <form
        className="lg:p-10 p-6 md:mx-auto mx-2.5 my-5 rounded-md 
               bg-white shadow-md max-w-4xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-x-6 md:gap-y-4 gap-y-2.5 md:grid-cols-2 grid-cols-1  mt-3">
          <TextInput
            label="Full Name"
            register={register}
            name="name"
            errors={errors}
            className="w-full"
            placeholder="Enter Full Name"
          />
          <TextInput
            type="email"
            label="Email"
            register={register}
            name="email"
            readOnly={isUpdate ? true : false}
            errors={errors}
            className="w-full"
            placeholder="Enter Email"
          />
          <TextInput
            type="password"
            label="Password"
            register={register}
            name="password"
            errors={errors}
            className="w-full"
            placeholder="Enter Password"
          />
          <SelectInput
            label="Role"
            name="role"
            control={control}
            className="w-full"
            options={
              user?.role === 'SUPER ADMIN' ? roleSuperAdminOptions : roleOptions
            }
            option="Role"
            errors={errors}
          />
          <SelectImageUrlInput
            register={register}
            errors={errors}
            chaneValue={changeImageUrl}
            imageUrl={imageUrl ?? ''}
            setImageUrl={setImageUrl}
            isLoadingImageUrl={isLoadingImageUrl}
          />
        </div>
        <div className="mt-6 flex justify-between gap-4 items-center">
          <SubmitButton
            title={isUpdate ? 'Update user' : 'Save new user'}
            isLoading={isLoading}
            loadingTitle={
              isUpdate ? 'Updating user ...' : 'Saving user ...'
            }
          />
          <ButtonClose hrefUrl="/dashboard/users" />
        </div>
      </form>
    </div>
  )
}
