'use client'
import { useState } from 'react'
import SubmitButton from '../FormInputs/SubmitButton'
import TextInput from '../FormInputs/TextInput'
import { useForm } from 'react-hook-form'
import ButtonClose from '../ButtonClose'
import FormHeader from '../Headers/FormHeader'
import {
  createNewTypeMessage,
  updateTypeMessageById,
} from '@/actions/typeMessages'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { getServerUser } from '@/actions/auth'
import { useQuery } from '@tanstack/react-query'
import { TypeMessage } from '@prisma/client'

export default function TypeMessageForm({
  initialData,
  isUpdate,
}: {
  initialData?: TypeMessage
  isUpdate?: string
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TypeMessage>({
    defaultValues: initialData,
  })

  const { data: user } = useQuery({
    queryKey: ['userSession'],
    queryFn: getServerUser,
  })
  const router = useRouter()

  const officeId = user?.office?.id
  async function onSubmit(data: TypeMessage) {
    setIsLoading(true)

    data.officeId = officeId as string
    if (isUpdate) {
      try {
        const updated = await updateTypeMessageById(data, isUpdate)
        if (updated?.status === 200) {
          router.push('/dashboard/sent-messages/type-messages')
          reset()
          setIsLoading(false)
          toast.success('type message updated successfully')
        } else {
          setIsLoading(false)
          toast.error(updated?.error)
        }
      } catch (error) {
        setIsLoading(false)
      }
    } else {
      try {
        const createNew = await createNewTypeMessage(data)
        if (createNew?.status === 200) {
          router.push('/dashboard/sent-messages/type-messages')
          reset()
          setIsLoading(false)
          toast.success('New type message created successfully')
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
        titleValue={isUpdate ? 'update Type message' : 'new Type message'}
        linkUrl="/dashboard/sent-messages/type-messages"
      />
      <form
        className="ld:p-10 p-6   md:mx-auto mx-2.5
            my-5  rounded-md 
       bg-white shadow-md max-w-4xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-x-6 md:gap-y-4 gap-y-2.5 md:grid-cols-2 grid-cols-1  mt-3">
          <TextInput
            label="Title"
            register={register}
            name="title"
            errors={errors}
            placeholder="Enter Title "
            className="w-full"
          />
        </div>
        <div className="mt-6 flex justify-between gap-4 items-center">
          <SubmitButton
            title={isUpdate ? 'Update type message' : 'Save new type message'}
            isLoading={isLoading}
            loadingTitle={
              isUpdate
                ? 'Updating type message please wait...'
                : 'Saving type message please wait...'
            }
          />
          <ButtonClose hrefUrl="/dashboard/sent-messages/type-messages" />
        </div>
      </form>
    </div>
  )
}
