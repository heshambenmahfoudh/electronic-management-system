import { Plus } from 'lucide-react'
import Link from 'next/link'

type fixedHeaderProps = {
  textValue: string
  isHidden?: boolean
  numberData?: number
  linkUrl?: string
}

export default function FixedHeader({
  textValue,
  numberData,
  linkUrl = '',
  isHidden = false,
}: fixedHeaderProps) {
  return (
    <div
      className="flex  justify-between items-center  sticky top-[60px] z-10
      px-8 h-[60px] bg-white   sms:px-6  shadow-sm
    "
    >
      <h2 className="font-medium capitalize text-20">
        {textValue}
        <span className="text-15 mx-1 ">( {numberData} )</span>
      </h2>
      {!isHidden && (
        <Link
          href={linkUrl}
          className="flex items-center 
        justify-center gap-2 bg-black/90 px-5
        text-white py-1.5 rounded-md font-medium"
        >
          <Plus className="w-4 h-4 text-white" />
          New
        </Link>
      )}
    </div>
  )
}
