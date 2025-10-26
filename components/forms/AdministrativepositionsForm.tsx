'use client'
import { useState } from 'react'
import SubmitButton from '../FormInputs/SubmitButton'
import TextInput from '../FormInputs/TextInput'
import { useForm } from 'react-hook-form'
import ButtonClose from '../ButtonClose'
import FormHeader from '../Headers/FormHeader'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { AdministrativePosittion } from '@prisma/client'
import {
  createNewAdministrativePosittion,
  updateAdministrativePosittionById,
} from '@/actions/administrativePosittions'
import { getServerUser } from '@/actions/auth'
import { useQuery } from '@tanstack/react-query'

export default function AdministrativepositionsForm({
  initialData,
  isUpdate,
}: {
  initialData?: AdministrativePosittion
  isUpdate?: string
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdministrativePosittion>({ defaultValues: initialData })
  const { data: user } = useQuery({
    queryKey: ['userSession'],
    queryFn: getServerUser,
  })
  const router = useRouter()
  const officeId = user?.office?.id

  async function onSubmit(data: AdministrativePosittion) {
    setIsLoading(true)

    data.officeId = officeId as string
    if (isUpdate) {
      try {
        const updated = await updateAdministrativePosittionById(data, isUpdate)
        if (updated?.status === 200) {
          router.push('/dashboard/human-resources/administrative-positions')
          reset()
          setIsLoading(false)
          toast.success('Administrative Position updated successfully')
        } else {
          setIsLoading(false)
          toast.error(updated?.error)
        }
      } catch (error) {
        setIsLoading(false)
      }
    } else {
      try {
        const createNew = await createNewAdministrativePosittion(data)
        if (createNew?.status === 200) {
          reset()
          setIsLoading(false)
          router.push('/dashboard/human-resources/administrative-positions')
          toast.success('New Administrative Position created successfully')
        } else {
          setIsLoading(false)
          toast.error(createNew?.error as string)
        }
      } catch (error) {
        setIsLoading(false)
      }
    }
  }

  return (
    <div>
      <FormHeader
        titleValue="new Administrative Position"
        linkUrl="/dashboard/human-resources/administrative-positions"
      />
      <form
        className="lg:p-10 p-6    md:mx-auto mx-2.5
            my-5  rounded-md 
       bg-white shadow-md max-w-4xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-x-6 md:gap-y-4 gap-y-2.5 md:grid-cols-2 grid-cols-1  mt-3">
          <TextInput
            label="Administrative Position Title"
            register={register}
            name="title"
            errors={errors}
            className="w-full"
          />
        </div>
        <div className="mt-8 flex justify-between gap-4 items-center">
          <SubmitButton
            title={
              isUpdate
                ? 'Update administrative'
                : 'Save new administrative'
            }
            isLoading={isLoading}
            loadingTitle={
              isUpdate
                ? 'Updating administrative ...'
                : 'Saving administrative ...'
            }
          />
          <ButtonClose hrefUrl="/dashboard/human-resources/administrative-positions" />
        </div>
      </form>
    </div>
  )
}
