import React from 'react'
import { Loader2 } from 'lucide-react'

type SubmitButtonProps = {
  title: string
  isLoading: boolean
  loadingTitle: string
}
export default function SubmitButton({
  title,
  isLoading = false,
  loadingTitle,
}: SubmitButtonProps) {
  return (
    <>
      {isLoading ? (
        <button
          disabled={true}
          className={`flex justify-center items-center gap-2 md:px-5 px-3 md:py-2.5 py-2
              text-center md:text-[16px] text-[14px]
         cursor-not-allowed disabled:bg-black/85 rounded-lg ${
           title?.includes('Login') && 'w-full'
         } bg-black/90 text-white`}
        >
          <Loader2 className=" h-4 w-4 animate-spin" />
          {loadingTitle}
        </button>
      ) : (
        <button
          className={`md:px-5 px-3 md:py-2.5 py-2 text-center md:text-[16px] text-[14px] 
        ${
          title?.includes('Login') && 'w-full'
        } cursor-pointer rounded-lg bg-black/90  text-white`}
        >
          {title}
        </button>
      )}
    </>
  )
}
