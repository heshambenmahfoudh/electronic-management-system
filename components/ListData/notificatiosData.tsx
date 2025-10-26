'use client'
import { getReciveMessagePermissionById } from '@/actions/permissions/reciveMessagePermissions'
import { getNotificationsMessages } from '@/actions/reciveMessages'
import { useStateContext } from '@/contexts/ContextProvider'
import { Notification } from '@prisma/client'
import { Edit, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import capitlaiseLetter from '@/lib/capital-letter'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { getServerUser } from '@/actions/auth'

export default function NotificationData() {
    const { data: user } = useQuery({
    queryKey: ['userSession'],
    queryFn: getServerUser,
  })
  const router = useRouter()
  if (!user) {
    router.push('/login')
  }
  const { openNotification, setOpenNotification } = useStateContext()
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
    <div className=" h-full w-full fixed top-0  bottom-0 ring-0 left-0 
     bg-black/70 z-[999999]">
      <div className="fixed top-0 right-0 z-[99999999] w-[90%] sm:w-[400px] h-full bg-white  shadow-lg  px-4 py-5">
        <div
          className="w-full  
        flex justify-between items-center gap-3 
         "
        >
          <h2 className="text-center text-lg text-[18px]">
            Noticications ( {notificationData?.data?.length || 0} )
          </h2>
          <X
            onClick={() => setOpenNotification(!openNotification)}
            className="w-6 h-6 cursor-pointer mb-2 "
          />
        </div>

        <div className="h-[540px] overflow-y-auto mt-5 flex flex-col
         items-center gap-2">
          {notificationData?.data?.length || 0 > 0 ? (
            notificationData?.data?.map((item: Notification) => (
              <Link
                onClick={() =>
                  setOpenNotification(
                    !permission?.data?.notificationRead
                      ? openNotification
                      : !openNotification,
                  )
                }
                href={
                  !permission?.data?.notificationRead
                    ? '#'
                    : `/dashboard/recive-messages/view/${item?.messageId}`
                }
                key={item?.id}
                className={`flex justify-between  min-w-full hover:bg-gray-100 
                  px-3 md:py-5 py-3
                     rounded-md gap-x-3 ${
                       !permission?.data?.notificationRead &&
                       'cursor-not-allowed'
                     }`}
              >
                <span className="p-2.5 rounded-full h-fit bg-blue-100">
                  <Edit className="w-4 h-4 text-blue-700" />
                </span>
                <div className="flex flex-col ">
                  <h2 className="text-[15px] font-medium">
                    New Message from {item?.officeSent}
                  </h2>
                  <span className="text-[13px] text-neutral-500">
                    A Persion named {capitlaiseLetter(item?.userSent)} send a
                    message with a subject - {item?.subject}
                  </span>
                  <div className="flex justify-between mt-1 ">
                    <span className="text-[13px]  text-neutral-500">
                      {formatDistanceToNow(new Date(item?.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                    <span className="text-[13px] font-medium">
                      Mark as read
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex justify-center items-center h-[60%]">
              <p className="p-4 md:text-[20px] text-[17px]"> There is No Data to Display</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
