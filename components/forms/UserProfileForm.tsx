'use client'
import { ChangeEvent, useState } from 'react'
import SubmitButton from '../FormInputs/SubmitButton'
import TextInput from '../FormInputs/TextInput'
import { useForm } from 'react-hook-form'
import SelectImageUrlInput from '../FormInputs/SelectImageUrlInput'
import { updateUserProfile } from '@/actions/users'
import toast from 'react-hot-toast'
import FormHeader from '../Headers/FormHeader'
import { makePostRequestImageUrl } from '@/lib/apiRequest'
import { useStateContext } from '@/contexts/ContextProvider'
import { SettingPermission, User } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'

export default function UserProfileForm({
  initialData,
  permission,
}: {
  initialData: User
  permission: SettingPermission
}) {
  const { isLoading, setIsLoading } = useStateContext()
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl)
  const [isLoadingImageUrl, setIsLoadingImageUrl] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: { ...initialData, password: '**********' },
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
  const id = permission?.userId
  const query = useQueryClient()
  async function onSubmit(data: User) {
    try {
      setIsLoading(true)
      data.imageUrl = imageUrl ?? ''
      const updatedUser = await updateUserProfile(data, id)
      if (updatedUser?.status === 200) {
        setIsLoading(false)
        query.invalidateQueries({ queryKey: ['userSession'] })
        toast.success('User Profile Updated successfully')
      } else {
        setIsLoading(false)
        toast.error(updatedUser?.error)
      }
    } catch (error) {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <FormHeader titleValue="update user profile" isHidden={true} />
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
          />
          <TextInput
            type="email"
            label="Email"
            register={register}
            name="email"
            readOnly={true}
            errors={errors}
            className="w-full"
          />
          <TextInput
            type="password"
            label="Password"
            register={register}
            name="password"
            errors={errors}
            className="w-full"
          />
          <SelectImageUrlInput
            register={register}
            errors={errors}
            chaneValue={changeImageUrl}
            imageUrl={imageUrl!}
            setImageUrl={setImageUrl}
            isLoadingImageUrl={isLoadingImageUrl}
          />
        </div>
        {permission?.userUpdate && (
          <div className="mt-6 flex justify-between gap-4 items-center">
            <SubmitButton
              title="Update profile"
              isLoading={isLoading}
              loadingTitle="Updating please wait..."
            />
          </div>
        )}
      </form>
    </div>
  )
}
