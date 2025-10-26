/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { ChangeEvent, useState } from 'react'
import SubmitButton from '../FormInputs/SubmitButton'
import { useForm } from 'react-hook-form'
import TextInput from '../FormInputs/TextInput'
import SelectInput from '../FormInputs/SelectInput'
import TextAreaInput from '../FormInputs/TextAreaInput'
import SelectFileInput from '../FormInputs/SelectFileInput'
import ButtonClose from '../ButtonClose'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import FormHeader from '../Headers/FormHeader'
import { useEdgeStore } from '@/lib/edgestore'
import { useQuery } from '@tanstack/react-query'
import {
  academicRankOptions,
  academicTitleOptions,
  degreeOptions,
  sexOptions,
} from '@/app/(dummy)/data'
import SelectImageUrlInput from '../FormInputs/SelectImageUrlInput'
import { Employee } from '@prisma/client'
import { makePostRequestImageUrl } from '@/lib/apiRequest'
import { createNewEmployee, updateEmployeeById } from '@/actions/employees'
import { getDepartmentAcademics } from '@/actions/departmentAcademics'
import { getAdministrativePosittions } from '@/actions/administrativePosittions'
import { getServerUser } from '@/actions/auth'

export default function EmployeeForm({
  initialData,
  isUpdate,
}: {
  initialData?: Employee
  isUpdate?: string
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl)
  const [isLoadingImageUrl, setIsLoadingImageUrl] = useState(false)
  const [file, setFile] = useState(initialData?.file)
  const [fileName, setFileName] = useState(initialData?.fileName)
  const [isLoadingFile, setIsLoadingFile] = useState(false)
  const { edgestore } = useEdgeStore()
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Employee>({
    defaultValues: {
      ...initialData,
      joinDate: initialData?.joinDate?.toString()?.slice(0, 25) as any,
    },
  })

  const { data: user } = useQuery({
    queryKey: ['userSession'],
    queryFn: getServerUser,
  })
  const router = useRouter()
  const officeId = user?.office?.id
  const { data: departmentAcadimicData } = useQuery({
    queryKey: ['departmentAcadimicData', officeId],
    queryFn: () => getDepartmentAcademics(officeId!),
    enabled: !!officeId,
  })
  const departmentAcadimicOptions = departmentAcadimicData?.data?.map(
    ({ id, title }) => ({
      value: id,
      label: title,
    }),
  )
  const { data: administrativePosittionData } = useQuery({
    queryKey: ['administrativePosittionData', officeId],
    queryFn: () => getAdministrativePosittions(officeId!),
    enabled: !!officeId,
  })
  const administrativePosittionOptions = administrativePosittionData?.data?.map(
    ({ id, title }) => ({
      value: id,
      label: title,
    }),
  )

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

  async function onSubmit(data: Employee) {
    setIsLoading(true)
    data.imageUrl = imageUrl ?? ''
    data.file = file ?? ''
    data.fileName = fileName ?? ''
    data.officeId = user?.office?.id as string
    if (isUpdate) {
      try {
        const updated = await updateEmployeeById(data, isUpdate)
        if (updated?.status === 200) {
          router.push('/dashboard/human-resources/employees')
          reset()
          setImageUrl('')
          setFile('')
          setFileName('')
          setIsLoading(false)
          toast.success(`Employee Updated successfully`)
        } else {
          setIsLoading(false)
          toast.error(updated?.error)
        }
      } catch (error) {
        setIsLoading(false)
      }
    } else {
      try {
        const createNew = await createNewEmployee(data)
        if (createNew?.status === 200) {
          router.push('/dashboard/human-resources/employees')
          reset()
          setImageUrl('')
          setFile('')
          setFileName('')
          setIsLoading(false)
          toast.success('New employee created successfully')
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
        titleValue={isUpdate ? 'update employee' : 'new employee'}
        linkUrl="/dashboard/human-resources/employees"
      />
      <form
        className="lg:p-10 p-6  md:mx-auto  mx-2.5
             my-5  rounded-md 
           bg-white shadow-md max-w-4xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-x-6 md:gap-y-4 gap-y-2.5 md:grid-cols-2 grid-cols-1  mt-3">
          <TextInput
            label="Employee Name"
            register={register}
            name="name"
            errors={errors}
            className="w-full"
          />
          <SelectInput
            label="Employee Sex"
            name="sex"
            control={control}
            className="w-full"
            options={sexOptions}
            errors={errors}
            option="Sex"
          />
          <TextInput
            label="Employee Qualification"
            register={register}
            name="qualification"
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Employee Unversity"
            register={register}
            name="universiry"
            errors={errors}
            className="w-full"
          />
          <SelectInput
            label="Employee Academic Degree"
            name="academicDegree"
            control={control}
            className="w-full"
            options={degreeOptions}
            errors={errors}
            option="Academic Degree"
          />
          <SelectInput
            label="Employee Academic Title"
            name="academicTitle"
            control={control}
            className="w-full"
            options={academicTitleOptions}
            errors={errors}
            option="Academic Degree"
          />
          <SelectInput
            label="Employee Academic Rank"
            name="academicRank"
            control={control}
            className="w-full"
            options={academicRankOptions}
            errors={errors}
            option="Academic Degree"
          />
          <SelectInput
            label="Employee Administrative Posittion"
            name="administrativeId"
            control={control}
            className="w-full"
            options={administrativePosittionOptions}
            errors={errors}
            option="Administrative Posittion"
          />
          <TextInput
            label="Employee Faculity"
            register={register}
            name="faculity"
            errors={errors}
            className="w-full"
          />
          <SelectInput
            label="Employee Department Academic "
            name="acadimicDepartmentId"
            control={control}
            className="w-full"
            options={departmentAcadimicOptions}
            errors={errors}
            option="Department Academic"
          />
          <SelectInput
            label="Employee anuther Department Academic "
            name="acadimicDepartmentSecondId"
            control={control}
            className="w-full"
            options={departmentAcadimicOptions}
            errors={errors}
            option="Department Academic"
          />
          <SelectInput
            label="Employee anuther Department Academic "
            name="acadimicDepartmentThirdId"
            control={control}
            className="w-full"
            options={departmentAcadimicOptions}
            errors={errors}
            option="Department Academic"
          />
          <TextInput
            label="Employee Place of Residence"
            register={register}
            name="placeResidence"
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Employee Nationality"
            register={register}
            name="nationality"
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Join Date "
            type="date"
            register={register}
            name="joinDate"
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Employee Date Of Brith"
            type="date"
            register={register}
            name="dateOfBrith"
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Employee Address"
            register={register}
            name="address"
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Employee Email"
            register={register}
            name="email"
            errors={errors}
            className="w-full"
          />
          <TextInput
            label="Employee Phone"
            register={register}
            name="phone"
            errors={errors}
            className="w-full"
          />
          <TextAreaInput
            label="Notes"
            register={register}
            name="notes"
            errors={errors}
            isRequired={false}
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
          <SelectImageUrlInput
            register={register}
            errors={errors}
            chaneValue={changeImageUrl}
            imageUrl={imageUrl ?? ''}
            setImageUrl={setImageUrl}
            isLoadingImageUrl={isLoadingImageUrl}
          />
        </div>
        <div className="mt-8 flex justify-between gap-4 items-center">
          <SubmitButton
            title={isUpdate ? 'Update employee' : 'Save new employee'}
            isLoading={isLoading}
            loadingTitle={
              isUpdate ? 'Updating employee ...' : 'Saving employee ...'
            }
          />
          <ButtonClose hrefUrl="/dashboard/human-resources/employees" />
        </div>
      </form>
    </div>
  )
}
