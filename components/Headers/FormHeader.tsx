import React from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

type formHeaderProps = {
  titleValue?: string
  linkUrl?: string
  isHidden?: boolean
}

export default function FormHeader({
  titleValue,
  linkUrl,
  isHidden,
}: formHeaderProps) {
  return (
    <div
      className="flex justify-between items-center 
    bg-white h-[60px] px-8 sticky top-[60px] shadow-sm z-10"
    >
      <h2 className="capitalize text-20 font-semibold text-black ">
        {titleValue}
      </h2>
      {!isHidden && (
        <Link
          href={linkUrl!}
          className="text-20 p-2
         bg-black/90  text-white rounded-full"
        >
          <X className="w-5 h-5" />
        </Link>
      )}
    </div>
  )
}
