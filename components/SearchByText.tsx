'use client'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import TextInput from './FormInputs/TextInput'
type SearchFormProps = {
  typeMessage: string
}
export default function SearchByText() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<SearchFormProps>()

  const typeMessage = watch('typeMessage')

  const router = useRouter()
  useEffect(() => {
    if (typeMessage) {
      router.push(
        `/dashboard/recive-messages/delayed-messages?type=${typeMessage}`,
      )
    } else {
      router.push(`/dashboard/recive-messages/delayed-messages`)
    }
  }, [router, typeMessage])

  return (
    <div className="my-1.5 -mb-2.5 md:mx-5 sm:mx-4 mx-3">
      <TextInput
        name="typeMessage"
        register={register}
        className="md:w-1/3 w-full"
        errors={errors}
        placeholder="Saerch Type message"
      
      />
    </div>
  )
}
