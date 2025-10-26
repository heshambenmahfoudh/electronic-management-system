/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'
import ButtonClose from '../ButtonClose'
import SubmitButton from '../FormInputs/SubmitButton'
import SelectFileInput from '../FormInputs/SelectFileInput'
import TextAreaInput from '../FormInputs/TextAreaInput'
import TextInput from '../FormInputs/TextInput'
import { TypeArchiveAndDelayProps } from '@/types/types'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { getDepartmentArchives } from '@/actions/departmentArchive'
import SelectInput from '../FormInputs/SelectInput'
import FormHeader from '../Headers/FormHeader'
import { createNewSentArchive } from '@/actions/sentMessagesArchives'
import toast from 'react-hot-toast'
import { SentMessagePermission } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { getServerUser } from '@/actions/auth'

export default function ArchiveSentMessageForm({
  initialData,
  permission,
}: {
  initialData: any
  permission: SentMessagePermission
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TypeArchiveAndDelayProps>({
    defaultValues: {
      ...initialData,
      sentFromOffice: initialData?.officeSent?.name,
      sentToOffice: initialData?.officeRecive?.name,
      date: initialData?.date?.toString()?.slice(0, 25),
    },
  })

  const { data: user } = useQuery({
    queryKey: ['userSession'],
    queryFn: getServerUser,
  })
  const officeId = user?.office?.id
  const router = useRouter()

  const { data: departmentsData } = useQuery({
    queryKey: ['departmentData', officeId],
    queryFn: () => getDepartmentArchives(officeId!),
    enabled: !!officeId,
  })
  const departmentOptions = departmentsData?.data?.map(({ id, title }) => ({
    value: id,
    label: title,
  }))

  async function onSubmit(data: TypeArchiveAndDelayProps) {
    try {
      setIsLoading(true)
      data.departmentArciveId = data?.archiveTo ?? ''
      data.id = initialData?.id
      const response = await createNewSentArchive(data)

      if (response?.status === 200) {
        router.push('/dashboard/sent-messages/management-messages')
        reset()
        setIsLoading(false)
        toast.success(`Archive new sent message successfully`)
      } else {
        setIsLoading(false)
        toast.error(response?.error)
      }
    } catch (error) {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <FormHeader
        titleValue="Sent message details"
        linkUrl="/dashboard/sent-messages/management-messages"
      />
      <form
        className="lg:p-10 p-6 md:mx-auto mx-2.5 my-5 rounded-md 
                    bg-white shadow-md max-w-4xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          className="grid gap-x-6 md:gap-y-4 gap-y-2.5 md:grid-cols-2 grid-cols-1
         mt-3"
        >
         
          <TextInput
            label="Sent To Office"
            register={register}
            name="sentToOffice"
            errors={errors}
            className="w-full"
            isRequired={false}
            readOnly={true}
          />
          <TextInput
            label="Type Message"
            register={register}
            name="typeMessage"
            errors={errors}
            className="w-full"
            readOnly={true}
            isRequired={false}
          />
          <TextInput
            label="Name Sent"
            register={register}
            name="sentName"
            errors={errors}
            className="w-full"
            readOnly={true}
            isRequired={false}
          />
          <TextInput
            type="text"
            label="Subject"
            register={register}
            name="subject"
            errors={errors}
            className="w-full"
            readOnly={true}
            isRequired={false}
          />
          <TextInput
            type="text"
            label="Date"
            register={register}
            name="date"
            errors={errors}
            className="w-full"
            readOnly={true}
            isRequired={false}
          />
          <TextAreaInput
            label="Notes"
            register={register}
            name="notes"
            readonly={true}
            isRequired={false}
            errors={errors}
          />
          <SelectFileInput
            label="File"
            register={register}
            errors={errors}
            file={initialData?.file}
            fileName={initialData?.fileName}
            isDelete={false}
          />
          {permission?.sentMessageArchive && (
            <>
              <TextInput
                label="Archive Date"
                type="date"
                register={register}
                name="archiveDate"
                errors={errors}
                className="w-full"
              />
              <SelectInput
                label="Archive To Department"
                name="archiveTo"
                control={control}
                className=""
                options={departmentOptions}
                errors={errors}
                option="Department Archive"
              />
            </>
          )}
        </div>
        {permission?.sentMessageArchive ? (
          <div className="mt-8 flex justify-between gap-4 items-center">
            <SubmitButton
              title="Archive new message"
              isLoading={isLoading}
              loadingTitle="Archiving message ..."
            />
            <ButtonClose hrefUrl="/dashboard/sent-messages/management-messages" />
          </div>
        ) : (
          <div className="mt-8 flex justify-between gap-4 items-center">
            <div></div>
            <ButtonClose hrefUrl="/dashboard/sent-messages/management-messages" />
          </div>
        )}
      </form>
    </div>
  )
}
