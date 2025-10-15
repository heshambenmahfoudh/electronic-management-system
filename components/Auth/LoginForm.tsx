'use client'
import TextInput from '../FormInputs/TextInput'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import SubmitButton from '../FormInputs/SubmitButton'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { TypeLoginFormProps } from '@/types/types'
import { loginOffice, loginUser } from '@/actions/auth'
import { useStateContext } from '@/contexts/ContextProvider'
import CustomCarousel from '../CustomCarousel'

export default function LoginForm() {
  const { isLoading, setIsLoading } = useStateContext()
  const [isLoginOffice, setIsLoginOffice] = useState(false)

  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TypeLoginFormProps>()

  async function onSubmit(data: TypeLoginFormProps) {
    try {
      setIsLoading(true)
      const loginData = isLoginOffice
        ? await loginUser(data)
        : await loginOffice(data)

      if (loginData?.status === 200) {
        if (!isLoginOffice) {
          setIsLoginOffice(true)
        }
        reset()
        setIsLoading(false)
        toast.success(`Login ${isLoginOffice ? 'user' : 'office'} successfully`)
        if (isLoginOffice) {
          return router.push('/')
        }
      } else {
        setIsLoading(false)
        toast.error(loginData?.error)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }
  return (
    <div
      className="relative w-full lg:grid h-screen
      lg:grid-cols-2 bg-gray-200"
    >
      <div className="flex items-center gap-2 absolute left-3 top-3 ">
        <div
          className=" rounded-full
            w-[45px] h-[45px] p-0.5 bg-white shadow-md border-1 border-blue-200    "
        >
          <Image
            src="/images/logosystem.png"
            alt="404"
            className="rounded-md"
            width={100}
            height={100}
          />
        </div>
        <h2 className="text-[18px] font-medium">Electronic System</h2>
      </div>
      <div className="flex items-center justify-center h-[90vh] mx-3 md:h-screen py-12">
        <div className="mx-auto grid w-[400px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-2xl font-bold">
              Login {isLoginOffice ? 'User' : 'Office'}
            </h1>
            <p className="text-balance text-muted-foreground underline">
              Enter your email below to login to{' '}
              {isLoginOffice ? 'your' : 'office'} account
            </p>
          </div>
          <form
            className="grid grid-cols-1 gap-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              label="Email Address"
              register={register}
              name="email"
              type="email"
              errors={errors}
              placeholder="Eg. heshan@gmail.com"
            />
            <TextInput
              label="Password"
              register={register}
              page="login"
              name="password"
              type="password"
              errors={errors}
              placeholder="******"
            />
            <SubmitButton
              title="Login in your account"
              isLoading={isLoading}
              loadingTitle="Logging you please wait..."
            />
          </form>
        </div>
      </div>
      <div className="hidden lg:block">
        <CustomCarousel />
      </div>
    </div>
  )
}
