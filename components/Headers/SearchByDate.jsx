'use client'
import React, { useEffect, useState } from 'react'
import Lables from '../Forms/Lables'
import { usePathname, useRouter } from 'next/navigation'
import searchByDate from '@/app/lib/searchByDate'
import SearchByTitleOrName from '../Forms/SearchByTitleOrName'


const SearchByDate = () => {
 const [data, setData] = useState('')
 const router = useRouter()
 const pathName = usePathname()
 const changeData = (e) => {
  setData({ ...data, [e.target.name]: e.target.value })
 }
 
useEffect(() => {
  searchByDate(pathName, router, data?.fromDate, data?.toDate)
}, [data.fromDate , data.toDate])
  

 

  return (
    <div className=" px-8 flex items-center justify-start mt-2 -mb-3 sms:gap-2.5 sms:px-4   gap-4">
        <div className=" flex items-center gap-1.5 sms:gap-1" >
            <div className="w-fit sms:w-[35px]" >
              <Lables text="From Date" />
            </div>:
            <input 
              type="date"
              name="fromDate"
               className="
                p-1 text-15 border-[2px] 
                rounded-md focus:outline-none sms:w-[180px] smss:w-fit
                focus:border-blue-300  w-[220px]
                mt-1 placeholder:text-gray-500  "
                onChange={changeData}
            />
        </div>
        <div className=" flex items-center gap-1.5 sms:gap-1"  >
              <div className="w-fit sms:w-[35px]">
                <Lables text="To Date" />
              </div>:
              <input 
                type="date"
                name="toDate"
                className="
                  p-1 text-15 border-[2px] 
                  rounded-md focus:outline-none
                  focus:border-blue-300 w-[220px] sms:w-[180px] smss:w-fit
                  mt-1 placeholder:text-gray-500  "
                  onChange={changeData}
              />
        </div>
      </div>
  )
}

export default SearchByDate