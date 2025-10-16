'use client'
import { ChangeEvent, useState } from 'react'
import SubmitButton from '../FormInputs/SubmitButton'
import TextInput from '../FormInputs/TextInput'
import { useForm } from 'react-hook-form'
import SelectImageUrlInput from '../FormInputs/SelectImageUrlInput'
import toast from 'react-hot-toast'
import FormHeader from '../Headers/FormHeader'
import { Document, SettingPermission } from '@prisma/client'
import { useStateContext } from '@/contexts/ContextProvider'
import { makePostRequestImageUrl } from '@/lib/apiRequest'
import { updateDocumentDataById } from '@/actions/documents'
export default function DocumentDataForm({
  initialData,
  permission,
}: {
  initialData: Document
  permission: SettingPermission
}) {
  const { isLoading, setIsLoading } = useStateContext()
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl)
  const [isLoadingImageUrl, setIsLoadingImageUrl] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Document>({
    defaultValues: initialData,
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

  async function onSubmit(data: Document) {
    try {
      setIsLoading(true)
      data.imageUrl = imageUrl ?? ''
      const updated = await updateDocumentDataById(data, initialData?.id ?? '')
      if (updated?.status === 200) {
        setIsLoading(false)
        toast.success('Document Data Updated successfully')
      } else {
        setIsLoading(false)
        toast.error(updated?.error)
      }
    } catch {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <FormHeader titleValue="update document data" isHidden={true} />
      <form
        className="lg:p-10 p-6  md:mx-auto mx-2.5   
            my-5  rounded-md 
       bg-white shadow-md max-w-4xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-x-6 md:gap-y-4 gap-y-2.5 md:grid-cols-2 grid-cols-1  mt-3">
          <TextInput
            label="Faculity Name"
            register={register}
            name="collegeName"
            errors={errors}
            placeholder="Enter Faculity Name"
            className="w-full"
          />
          <TextInput
            label="University Name"
            register={register}
            name="universityName"
            errors={errors}
            placeholder="Enter University Name"
            className="w-full"
          />
          <TextInput
            label="office Name"
            register={register}
            name="officeName"
            errors={errors}
            placeholder="Enter office Name"
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
        {permission?.documentUpdate && (
          <div className="mt-6 flex justify-between gap-4 items-center">
            <SubmitButton
              title="Update document data"
              isLoading={isLoading}
              loadingTitle="Updating please wait..."
            />
          </div>
        )}
      </form>
    </div>
  )
}
