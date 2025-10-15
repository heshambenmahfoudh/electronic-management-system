/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { ChangeEvent, useState } from 'react'
import SubmitButton from '../FormInputs/SubmitButton'
import TextInput from '../FormInputs/TextInput'
import { useForm } from 'react-hook-form'
import ButtonClose from '../ButtonClose'
import SelectImageUrlInput from '../FormInputs/SelectImageUrlInput'
import { createOffice, updateOfficeById } from '@/actions/offices'
import toast from 'react-hot-toast'
import FormHeader from '../Headers/FormHeader'
import { useRouter } from 'next/navigation'
import { useStateContext } from '@/contexts/ContextProvider'
import { makePostRequestImageUrl } from '@/lib/apiRequest'
import { Office } from '@prisma/client'
export default function OfficeForm({
  isUpdate,
  initialData,
}: {
  isUpdate?: string
  initialData?: Office
}) {
  const { isLoading, setIsLoading } = useStateContext()
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    initialData?.imageUrl,
  )
  const [isLoadingImageUrl, setIsLoadingImageUrl] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Office>({
    defaultValues: { ...initialData, password: isUpdate && '**********' },
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

  const router = useRouter()
  async function onSubmit(data: Office) {
    setIsLoading(true)
    data.imageUrl = imageUrl ?? ''

    if (isUpdate) {
      try {
        const updatedOffice = await updateOfficeById(data, isUpdate)
        if (updatedOffice?.status === 200) {
          router.push('/dashboard/offices')
          reset()
          setImageUrl('')
          setIsLoading(false)
          toast.success('Office Profile Updated successfully')
        } else {
          setIsLoading(false)
          toast.error(updatedOffice?.error)
        }
      } catch (error) {
        setIsLoading(false)
      }
    } else {
      try {
        const newOffice = await createOffice(data)
        if (newOffice?.status === 200) {
          router.push('/dashboard/offices')
          reset()
          setImageUrl('')
          setIsLoading(false)
          toast.success('New office created successfully')
        } else {
          setIsLoading(false)
          toast.error(newOffice?.error)
        }
      } catch (error) {
        setIsLoading(false)
      }
    }
  }

  return (
    <div>
      <FormHeader
        titleValue={isUpdate ? 'update office' : 'new office'}
        linkUrl="/dashboard/offices"
      />
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
            className="w-full"
          />
          <TextInput
            label="Office Email"
            type="email"
            register={register}
            name="email"
            errors={errors}
            readOnly={isUpdate ? true : false}
            className="w-full"
          />
          <TextInput
            label="Office Password"
            type="password"
            register={register}
            name="password"
            errors={errors}
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
        <div className="mt-6 flex justify-between gap-4 items-center">
          <SubmitButton
            title={isUpdate ? 'Update office' : 'Save new office'}
            isLoading={isLoading}
            loadingTitle={
              isUpdate ? 'Updating please wait...' : 'Saving please wait...'
            }
          />
          <ButtonClose hrefUrl="/dashboard/offices" />
        </div>
      </form>
    </div>
  )
}
