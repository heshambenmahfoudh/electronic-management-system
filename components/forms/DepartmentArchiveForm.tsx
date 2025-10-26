'use client'
import { useState } from 'react'
import SubmitButton from '../FormInputs/SubmitButton'
import TextInput from '../FormInputs/TextInput'
import { useForm } from 'react-hook-form'
import ButtonClose from '../ButtonClose'
import FormHeader from '../Headers/FormHeader'
import toast from 'react-hot-toast'
import {
  createNewDepartmentArchive,
  updateDepartmentArchiveById,
} from '@/actions/departmentArchive'
import { useRouter } from 'next/navigation'
import { getServerUser } from '@/actions/auth'
import { useQuery } from '@tanstack/react-query'
import { DepartmentArchive } from '@prisma/client'

export default function DepartmentArchiveForm({
  initialData,
  isUpdate,
}: {
  initialData?: DepartmentArchive
  isUpdate?: string
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DepartmentArchive>({ defaultValues: initialData })
  const { data: user } = useQuery({
    queryKey: ['userSession'],
    queryFn: getServerUser,
  })
  const router = useRouter()
  const officeId = user?.office?.id

  async function onSubmit(data: DepartmentArchive) {
    setIsLoading(true)

    data.officeId = officeId as string
    if (isUpdate) {
      try {
        const updated = await updateDepartmentArchiveById(data, isUpdate)
        if (updated?.status === 200) {
          router.push('/dashboard/archive/archive-department')
          reset()
          setIsLoading(false)
          toast.success('Department archive updated successfully')
        } else {
          setIsLoading(false)
          toast.error(updated?.error)
        }
      } catch (error) {
        setIsLoading(false)
      }
    } else {
      try {
        const createNew = await createNewDepartmentArchive(data)
        if (createNew?.status === 200) {
          router.push('/dashboard/archive/archive-department')
          reset()
          setIsLoading(false)
          toast.success('New Department archive created successfully')
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
        titleValue="new Deartment archive"
        linkUrl="/dashboard/archive/archive-department"
      />
      <form
        className="lg:p-10 p-6    md:mx-auto mx-2.5
            my-5  rounded-md 
       bg-white shadow-md max-w-4xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-x-6 md:gap-y-4 gap-y-2.5 md:grid-cols-2 grid-cols-1  mt-3">
          <TextInput
            label="Department Title"
            register={register}
            name="title"
            errors={errors}
            className="w-full"
          />
        </div>
        <div className="mt-8 flex justify-between gap-4 items-center">
          <SubmitButton
            title={isUpdate ? 'Update department ' : 'Save new department '}
            isLoading={isLoading}
            loadingTitle={
              isUpdate ? 'Updating department ...' : 'Saving department ...'
            }
          />
          <ButtonClose hrefUrl="/dashboard/archive/archive-department" />
        </div>
      </form>
    </div>
  )
}
