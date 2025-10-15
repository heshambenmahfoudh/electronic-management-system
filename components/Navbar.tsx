/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'
import { Bell, Menu, Search } from 'lucide-react'
import { useStateContext } from '../contexts/ContextProvider'
import getInitialName from '@/lib/getInitialName'
import SearchInput from './FormInputs/SearchInput'
import { getNotificationsMessages } from '@/actions/reciveMessages'
import NotificationData from './ListData/notificatiosData'
import { getReciveMessagePermissionById } from '@/actions/permissions/reciveMessagePermissions'
import { useQuery } from '@tanstack/react-query'
import { getServerUser } from '@/actions/auth'

export default function Navbar() {
  const {
    activeMenu,
    setActiveMenu,
    openNotification,
    setOpenNotification,
  } = useStateContext()
   const { data: user } = useQuery({
     queryKey: ['userSession'],
     queryFn: getServerUser,
   })
  const initial = getInitialName(user?.name)
  const officeId = user?.office?.id
  const id = user?.id

  const { data: notificationData } = useQuery({
    queryKey: ['notification', officeId],
    queryFn: () => getNotificationsMessages(officeId!),
    enabled:!!officeId
  })
  const { data: permission } = useQuery({
    queryKey: ['reciveMessagePermission', id],
    queryFn: () => getReciveMessagePermissionById(id!),
    enabled:!!id
  })

  return (
  
    <div
      className="md:px-4  px-3 py-2.5 border-b-1
       border-gray-300
    flex justify-between sticky top-0 z-20
    items-center  gap-3 bg-blue-300 min-w-full "
    >
      <div className="flex items-center gap-3">
        <span
          className="text-[23px] -ml-.5 p-2
        bg-gray-300 rounded-full text-emerald-900 cursor-pointer"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <Menu />
        </span>
        <div
          className="md:w-[300px] 
             px-2 py-1.5 bg-gray-100 sm:mx-auto 
             gap-2 rounded-xl hidden
          md:flex items-center"
        >
          <Search className="text-gray-500" />
          <SearchInput placeholder="Search" />
        </div>
      </div>
      <div className="flex items-center md:gap-16 gap-6">
        <div
          onClick={() => setOpenNotification(!openNotification)}
          className=" relative p-2 rounded-md border-1 border-white cursor-pointer"
        >
          <span
            className="absolute -top-2 -right-3 bg-white text-blue-500 text-[12px]  
            h-6 w-6 shadow-md flex justify-center items-center rounded-full font-medium"
          >
            {notificationData?.data?.length || 0}
          </span>
          <Bell className="w-4 h-4" />
        </div>
        {permission?.data?.notificationDisplay && openNotification && (
          <NotificationData />
        )}
        <div className=" flex  items-center justify-center gap-2">
          <h1
            className="capitalize font-medium underline
         md:text-[15px]
          text-[14px] text-white"
          >
            {user?.name}
          </h1>
          <div
            className="bg-blue-50 text-full text-center  w-10
        h-10 border-1 font-medium  justify-center items-center
        border-neutral-500   rounded-[50%] flex"
          >
            {user?.imageUrl ? (
              <img
                src={user?.imageUrl}
                className="rounded-[50%]  "
                alt="imageUrl"
              />
            ) : (
              <>{initial}</>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
