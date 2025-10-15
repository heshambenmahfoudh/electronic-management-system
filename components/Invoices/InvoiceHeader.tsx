/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'
import { getDocumentData } from '@/actions/documents'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'

export default function InvoiceHeader() {
  const [timeNow, setTimeNow] = useState('')

  const date = new Date()
  const dateNow = date.toLocaleDateString('en-GB')
  const dayNow = date.toLocaleDateString('en-GB', { weekday: 'long' })
  useEffect(() => {
    const intervalTimeNow: any = setTimeNow(date.toLocaleTimeString('en-GB'))
    const timeInterval = setInterval(intervalTimeNow, 1000)
    return () => clearInterval(timeInterval)
  }, [])
  const { data: documentData } = useQuery({
    queryKey: ['documentData'],
    queryFn: getDocumentData,
  })

  return (
    <div
      className="flex justify-between items-end h-[120px] border-b-[1px] print:border-b-[1px]
          border-gray-400 print:mb-8 print:pb-4 pb-4 m-auto "
    >
      <div className="flex justify-start  flex-col items-start gap-1 print:gap-1">
        <h2 className="font-medium text-[18px] text-end capitalize">
          {documentData?.data?.collegeName}
        </h2>
        <h2 className="font-medium text-[18px] text-end capitalize">
          {documentData?.data?.universityName}
        </h2>
        <h2 className="font-medium text-[18px] text-end capitalize">
          {documentData?.data?.officeName}
        </h2>
      </div>
      <div className="w-[100px] h-[100px] relative">
        <img
          src={documentData?.data?.imageUrl}
          className="rounded-[50%] object-contain w-full h-full  "
          alt="Image-Invoice"
        />
      </div>
      <div className="flex justify-start  flex-col items-start  gap-1">
        <p className="text-16 font-medium uppercase text-start">
          <span className="capitalize">Date</span> : {dateNow}
        </p>
        <p className="text-16 font-medium uppercase text-start">
          <span className="capitalize">Time</span> : {timeNow}
        </p>
        <p className="text-16 font-medium capitalize">
          <span className="capitalize">Day</span> : {dayNow}
        </p>
      </div>
    </div>
  )
}
