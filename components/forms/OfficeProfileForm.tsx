'use client'
import { ChangeEvent, useState } from 'react'
import SubmitButton from '../FormInputs/SubmitButton'
import TextInput from '../FormInputs/TextInput'
import { useForm } from 'react-hook-form'
import SelectImageUrlInput from '../FormInputs/SelectImageUrlInput'
import { updateOfficeProfile } from '@/actions/offices'
import toast from 'react-hot-toast'
import FormHeader from '../Headers/FormHeader'
import { Office, SettingPermission } from '@prisma/client'
import { useStateContext } from '@/contexts/ContextProvider'
import { makePostRequestImageUrl } from '@/lib/apiRequest'
import { getServerUser } from '@/actions/auth'
import { useQuery } from '@tanstack/react-query'
export default function OfficeProfileForm({
  initialData,
  permission,
}: {
  initialData: Office
  permission: SettingPermission
}) {
  const { isLoading, setIsLoading } = useStateContext()
  const [imageUrl, setImageUrl] = useState(
    initialData?.imageUrl,
  )
  const [isLoadingImageUrl, setIsLoadingImageUrl] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Office>({
    defaultValues: { ...initialData, 
      password: '**********' },
  })

  
  const { data: user } = useQuery({
    queryKey: ['userSession'],
    queryFn:getServerUser,
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
  const id = user?.office?.id
  async function onSubmit(data: Office) {
    try {
      setIsLoading(true)
      data.imageUrl = imageUrl ?? ''
      const updatedOffice = await updateOfficeProfile(data, id!)
      if (updatedOffice?.status === 200) {
        setIsLoading(false)
        toast.success('Office Profile Updated successfully')
      } else {
        setIsLoading(false)
        toast.error(updatedOffice?.error)
      }
    } catch {}
  }

  return (
    <div>
      <FormHeader titleValue="update office profile" isHidden={true} />
      <form
        className="lg:p-10 p-6  md:mx-auto mx-2.5   
            my-5  rounded-md 
       bg-white shadow-md max-w-4xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-x-6 md:gap-y-4 gap-y-2.5 md:grid-cols-2 grid-cols-1  mt-3">
          <TextInput
            label="Office Name"
            register={register}
            name="name"
            errors={errors}
            placeholder="Enter Name "
            className="w-full"
          />
          <TextInput
            label="Office Email"
            type="email"
            register={register}
            name="email"
            errors={errors}
            readOnly={true}
            placeholder="Enter Email"
            className="w-full"
          />
          <TextInput
            label="Office Password"
            type="password"
            register={register}
            name="password"
            errors={errors}
            placeholder="Enter Password"
            className="w-full"
          />
          <SelectImageUrlInput
            register={register}
            errors={errors}
            chaneValue={changeImageUrl}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            isLoadingImageUrl={isLoadingImageUrl}
          />
        </div>
        {permission?.officeUpdate && (
          <div className="mt-6 flex justify-between gap-4 items-center">
            <SubmitButton
              title="Update office profile"
              isLoading={isLoading}
              loadingTitle="Updating please wait..."
            />
          </div>
        )}
      </form>
    </div>
  )
}
