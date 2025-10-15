'use client'
import React, { useState } from 'react'
import SubmitButton from '../FormInputs/SubmitButton'
import { useForm } from 'react-hook-form'
import TextInput from '../FormInputs/TextInput'
import SelectInput from '../FormInputs/SelectInput'
import TextAreaInput from '../FormInputs/TextAreaInput'
import SelectFileInput from '../FormInputs/SelectFileInput'
import ButtonClose from '../ButtonClose'
import { TypeManageMessageFormProps } from '@/types/types'
import { getOffices } from '@/actions/offices'
import { getTypeMessages } from '@/actions/typeMessages'
import { createNewSentMessage } from '@/actions/manageMessages'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import FormHeader from '../Headers/FormHeader'
import { useEdgeStore } from '@/lib/edgestore'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getServerUser } from '@/actions/auth'

export default function ManageMessageForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingFile, setIsLoadingFile] = useState(false)
  const [file, setFile] = useState<string>('')
  const [fileName, setFileName] = useState<string>('')
  const { edgestore } = useEdgeStore()
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TypeManageMessageFormProps>()

  async function changeFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    try {
      if (!file) {
        toast.error('Please Select file')
        return
      }
      setIsLoadingFile(true)
      const upload = await edgestore.publicFiles.upload({
        file,
      })
      setFile(upload.url)
      setFileName(file.name)
      setIsLoadingFile(false)
      toast.success('New file Upload Successfully ')
    } catch (error) {
      setIsLoadingFile(false)
      toast.error('Failed to upload file')
    }
  }

  const { data: user } = useQuery({
    queryKey: ['userSession'],
    queryFn: getServerUser,
  })
  const router = useRouter()
  const officeId = user?.office?.id
  const { data: officesData } = useQuery({
    queryKey: ['officeData', officeId],
    queryFn: () => getOffices(officeId!),
    enabled: !!officeId,
  })
  const officeOptions = officesData?.data?.map(({ id, name }) => ({
    value: id,
    label: name,
  }))
  const { data: typeMessagesData } = useQuery({
    queryKey: ['typeMessageData', officeId],
    queryFn: () => getTypeMessages(officeId!),
    enabled: !!officeId,
  })
  const typeMessageOptions = typeMessagesData?.data?.map(({ title }) => ({
    value: title,
    label: title,
  }))
  const query = useQueryClient()
  async function onSubmit(data: TypeManageMessageFormProps) {
    setIsLoading(true)
    const officeSentId = officeId
    const officeReciveId = data?.sentToOffice
    data.officeSentId = officeSentId as string
    data.officeReciveId = officeReciveId as string
    data.file = file
    data.fileName = fileName
    try {
      const newMessage = await createNewSentMessage(data)
      if (newMessage?.status === 200) {
        router.push('/dashboard/sent-messages/management-messages')
        setFile('')
        setFileName('')
        reset()
        setIsLoading(false)
        query.invalidateQueries({ queryKey: ['notification'] })
        toast.success('New message send successfully')
      } else {
        setIsLoading(false)
        toast.error(newMessage?.error)
      }
    } catch (error) {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <FormHeader
        titleValue="new message"
        linkUrl="/dashboard/sent-messages/management-messages"
      />
      <form
        className="lg:p-10 p-6  md:mx-auto mx-2.5
             my-5  rounded-md 
           bg-white shadow-md max-w-4xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-x-6 md:gap-y-4 gap-y-2.5 md:grid-cols-2 grid-cols-1  mt-3">
          <TextInput
            label="Sent From Office"
            register={register}
            name="sentFromOffice"
            errors={errors}
            className="w-full"
            readOnly={true}
            isRequired={false}
            defaultValue={user?.office?.name}
          />
          <SelectInput
            label="Sent To Office"
            name="sentToOffice"
            control={control}
            className="w-full"
            options={officeOptions}
            errors={errors}
            option="Sent To"
          />
          <SelectInput
            label="Type Message"
            name="typeMessage"
            control={control}
            className="w-full"
            options={typeMessageOptions}
            errors={errors}
            option="Type Message"
          />
          <TextInput
            label="Name Sent"
            register={register}
            name="sentName"
            errors={errors}
            className="w-full"
            readOnly={true}
            defaultValue={user?.name}
          />
          <TextInput
            label="Subject"
            register={register}
            name="subject"
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Date"
            type="date"
            register={register}
            name="date"
            errors={errors}
            className="w-full"
          />
          <TextAreaInput
            label="Notes"
            register={register}
            name="notes"
            errors={errors}
          />
          <SelectFileInput
            label="File"
            changeValue={changeFile}
            register={register}
            errors={errors}
            file={file}
            setFile={setFile}
            fileName={fileName}
            setFileName={setFileName}
            isLoadingFile={isLoadingFile}
            className="col-span-full"
          />
        </div>
        <div className="mt-8 flex justify-between gap-4 items-center">
          <SubmitButton
            title="Send new message"
            isLoading={isLoading}
            loadingTitle="Sending message please wait..."
          />
          <ButtonClose hrefUrl="/dashboard/sent-messages/management-messages" />
        </div>
      </form>
    </div>
  )
}
