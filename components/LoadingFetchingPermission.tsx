import React from 'react'
import { Loader2 } from 'lucide-react'

export default function LoadingFetchingPermission({
  customSize,
}: {
  customSize?: string
}) {
  return (
    <div className="h-[78px] my-6 flex items-center justify-center  ">
      <Loader2
        className={` ${customSize ? customSize : 'h-6 w-6'} animate-spin`}
      />
    </div>
  )
}
