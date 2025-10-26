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
      md:px-8 h-[60px] bg-white   px-4  shadow-sm
    "
    >
      <h2 className="font-medium capitalize md:text-[16px] text-[14px]">
        {textValue}
        <span className="mx-1 ">( {numberData} )</span>
      </h2>
      {!isHidden && (
        <Link
          href={linkUrl}
          className="flex items-center 
        justify-center gap-2 bg-black/90 md:px-5 px-3
        text-white py-1.5 rounded-md font-medium md:text-[16px] text-[14px]"
        >
          <Plus className="w-4 h-4 text-white" />
          New
        </Link>
      )}
    </div>
  )
}
