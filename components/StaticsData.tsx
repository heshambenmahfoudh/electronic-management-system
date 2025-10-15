import { getServerUser } from '@/actions/auth'
import { getDelayMessages } from '@/actions/delayMessages'
import { getSentMessages } from '@/actions/manageMessages'
import { getReciveMessages } from '@/actions/reciveMessages'
import { getUsers } from '@/actions/users'
import { Inbox, MessageSquare, Users } from 'lucide-react'

export default async function StaticsData() {
  const session = await getServerUser()
  const officeId = session?.office?.id
  const usersLength: number | undefined = (await getUsers(officeId!))?.data
    ?.length
  const sentMessagesLength: number | undefined = (
    await getSentMessages(officeId!)
  )?.data?.length
  const reciveMessagesLength: number | undefined = (
    await getReciveMessages(officeId!)
  )?.data?.length
  const delayMessagesLength: number | undefined = (
    await getDelayMessages(officeId!)
  )?.data?.length

  return (
    <div
      className="grid lg:grid-cols-4 md:grid-cols-3  
          sm:grid-cols-2 grid-cols-1  gap-2 mb-2 parent"
    >
      <div
        className="bg-white
          cursor-pointer border-1 border-gray-200 shadow 
          hover:border-blue-400 transition-all duration-300 
            rounded-2xl p-3 h-32  mb-1 sm:mb-0 "
      >
        <span
          className="p-2 mb-1 flex items-center justify-center w-fit
                       rounded-full  text-2xl text-blue-400"
        >
          <Users />
        </span>
        <h3 className="font-bold text-[14px]">Total Users</h3>
        <h1 className="font-bold text-2xl mb-2 text-blue-500 ">
          {usersLength}
        </h1>
      </div>
      <div
        className="bg-center  cursor-pointer border  border-gray-200 shadow
          hover:border-blue-400 transition-all duration-300  bg-white rounded-2xl p-3 
          h-32  mb-1 sm:mb-0 item"
      >
        <span
          className="p-2 mb-1 flex items-center justify-center w-fit
            rounded-full bg-white text-blue-400   text-2xl "
        >
          <MessageSquare />
        </span>
        <h3 className="font-bold text-[14px]">Total Sent Messages</h3>
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl mb-2 text-blue-500">
            {sentMessagesLength}
          </h1>
        </div>
      </div>
      <div
        className="bg-center  cursor-pointer border  border-gray-200 shadow
          hover:border-blue-400 transition-all duration-300  bg-white rounded-2xl p-3 h-32  mb-1 sm:mb-0 item"
      >
        <span
          className="p-2 mb-1 flex items-center justify-center w-fit
            rounded-full bg-bg-basic text-2xl text-blue-400"
        >
          <Inbox />
        </span>
        <h3 className="font-bold text-[14px]">Total Recive Messages</h3>
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl mb-2 text-blue-500">
            {reciveMessagesLength}
          </h1>
        </div>
      </div>
      <div
        className="bg-center  cursor-pointer border  border-gray-200 shadow
          hover:border-blue-400 transition-all duration-300  bg-white rounded-2xl p-3 h-32  mb-1 sm:mb-0 item"
      >
        <span
          className="p-2 mb-1 flex items-center justify-center w-fit
            rounded-full bg-bg-basic text-2xl text-blue-400"
        >
          <Inbox />
        </span>
        <h3 className="font-bold text-[14px]">Total Delay Messages</h3>
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-2xl mb-2 text-blue-500">
            {delayMessagesLength}
          </h1>
        </div>
      </div>
    </div>
  )
}
