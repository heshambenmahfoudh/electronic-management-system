/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useState } from 'react'
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
import toast from 'react-hot-toast'
import { createNewReciveArchive } from '@/actions/reciveMessagesArchives'
import CheckBoxInput from '../FormInputs/CheckBoxInput'
import { createNewDelayMessage } from '@/actions/delayMessages'
import { ReciveMessagePermission } from '@prisma/client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getServerUser } from '@/actions/auth'

export default function ArchiveReciveMessageForm({
  initialData,
  permission,
}: {
  initialData: any
  permission: ReciveMessagePermission
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
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
    enabled:!!officeId
  })
  const departmentOptions = departmentsData?.data?.map(({ id, title }) => ({
    value: id,
    label: title,
  }))
  const query = useQueryClient()
  useEffect(() => {
    if (!initialData?.isRead) {
      query.invalidateQueries({ queryKey: ['notification'] })
    }
  }, [])

  const isDelay = watch('delay')

  async function onSubmit(data: TypeArchiveAndDelayProps) {
    
    try {
      setIsLoading(true)
      data.departmentArciveId = data?.archiveTo ?? ''
      data.id = initialData?.id
      const response = isDelay
        ? await createNewDelayMessage(data)
        : await createNewReciveArchive(data)
      if (response?.status === 200) {
        reset()
        setIsLoading(false)
        toast.success(
          `Create new ${isDelay ? 'Delay' : 'Archive'} message successfully`,
        )
        if (isDelay) {
          router.push('/dashboard/recive-messages/delayed-messages')
        } else {
          router.push('/dashboard/recive-messages')
        }
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
        titleValue="Recive message details"
        linkUrl="/dashboard/recive-messages"
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
            label="Sent From Office"
            register={register}
            name="sentFromOffice"
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
          {permission?.reciveMessageTrDelay &&
            permission?.reciveMessageArchive && (
              <CheckBoxInput
                label="Are you Delay Message ?"
                name="delay"
                register={register}
                disabled={isLoading ? true : false}
              />
            )}
          {permission?.reciveMessageArchive && (
            <TextInput
              label={isDelay ? 'Delay Date' : 'Archive Date'}
              type="date"
              register={register}
              name={isDelay ? 'delayDate' : 'archiveDate'}
              errors={errors}
              className="w-full"
            />
          )}
          {!isDelay && permission?.reciveMessageArchive && (
            <SelectInput
              label="Archive To Department"
              name="archiveTo"
              control={control}
              className=""
              options={departmentOptions}
              errors={errors}
              option="Department Archive"
            />
          )}
        </div>
        {!permission?.reciveMessageArchive ? (
          <div className="mt-8 flex justify-between gap-4 items-center">
            <div></div>
            <ButtonClose hrefUrl="/dashboard/recive-messages" />
          </div>
        ) : (
          <div className="mt-8 flex justify-between gap-4 items-center">
            <SubmitButton
              title={isDelay ? 'Delay new message' : 'Archive new message '}
              isLoading={isLoading}
              loadingTitle={
                isDelay
                  ? 'Delayed message please wait...'
                  : 'Archived message please wait...'
              }
            />
            <ButtonClose hrefUrl="/dashboard/recive-messages" />
          </div>
        )}
      </form>
    </div>
  )
}
