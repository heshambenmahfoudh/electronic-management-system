/* eslint-disable @next/next/no-img-element */
'use client'
import { getArchiveMessagePermissionById } from '@/actions/permissions/archiveMessagePermissions'
import { getBackupPermissionById } from '@/actions/permissions/backupPermissions'
import { getDashboardPermissionById } from '@/actions/permissions/dashboardPermissions'
import { getOfficePermissionById } from '@/actions/permissions/officePermissions'
import { getReciveMessagePermissionById } from '@/actions/permissions/reciveMessagePermissions'
import { getSentMessagePermissionById } from '@/actions/permissions/sentMessagePermissions'
import { getSettingPermissionById } from '@/actions/permissions/settingPermissions'
import { getUserPermissionById } from '@/actions/permissions/userPermissions'
import {
  archiveMessagesLinks,
  backupLinks,
  dashboardLinks,
  reciveMessagesLinks,
  officesLinks,
  sendMessagesLinks,
  usersLinks,
  settingsLinks,
  humanResourcesLinks,
} from '@/app/(dummy)/data'
import { useStateContext } from '@/contexts/ContextProvider'
import getInitialName from '@/lib/getInitialName'
import {
  Archive,
  Briefcase,
  ChevronDown,
  ChevronRight,
  EyeClosed,
  Inbox,
  LucideLayoutDashboard,
  MessageSquare,
  PlusCircle,
  Power,
  Save,
  Settings,
  Users,
  X,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GiOfficeChair } from 'react-icons/gi'
import { typeKeyPermission } from '@/types/types'
import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { getHumanResourcePermissionById } from '@/actions/permissions/humanResourcePermission'
import { getServerUser, logoutUser } from '@/actions/auth'
export default function Sidebar() {
  const {
    activeMenu,
    setActiveMenu,
    dashboardsDrop,
    setDashboardsDrop,
    usersDrop,
    setUsersDrop,
    sendMessageDrop,
    setSendMessageDrop,
    reciveMessageDrop,
    setReciveMessageDrop,
    archiveMessageDrop,
    setArchiveMessageDrop,
    backupDrop,
    setBackupDrop,
    officeDrop,
    setOfficeDrop,
    settingDrop,
    setSettingDrop,
    humanResourceDrop,
    setHumanResourceDrop,
  } = useStateContext()
  const { data: user } = useQuery({
    queryKey: ['userSession'],
    queryFn: getServerUser,
  })

  const id = user?.id

  const { data: dashboardData } = useQuery({
    queryKey: ['dashboardPermission', id],
    queryFn: () => getDashboardPermissionById(id!),
  })

  const { data: settingData } = useQuery({
    queryKey: ['settingPermission', id],
    queryFn: () => getSettingPermissionById(id!),
  })

  const { data: userData } = useQuery({
    queryKey: ['userPermission', id],
    queryFn: () => getUserPermissionById(id!),
  })

  const { data: sentMessageData } = useQuery({
    queryKey: ['sentMessagePermission', id],
    queryFn: () => getSentMessagePermissionById(id!),
  })

  const { data: reciveMessageData } = useQuery({
    queryKey: ['reciveMessagePermission', id],
    queryFn: () => getReciveMessagePermissionById(id!),
  })

  const { data: archiveMessageData } = useQuery({
    queryKey: ['archiveMessagePermission', id],
    queryFn: () => getArchiveMessagePermissionById(id!),
  })

  const { data: backupData } = useQuery({
    queryKey: ['backupPermission', id],
    queryFn: () => getBackupPermissionById(id!),
  })

  const { data: officeData } = useQuery({
    queryKey: ['officePermission', id],
    queryFn: () => getOfficePermissionById(id!),
  })
  
  const { data: humanResourceData } = useQuery({
    queryKey: ['humanResourcePermission', id],
    queryFn: () => getHumanResourcePermissionById(id!),
  })

  const dashboardPermissions: typeKeyPermission = {
    overview: dashboardData?.data?.homeDisplay as boolean,
    logs: dashboardData?.data?.userLogDisplay as boolean,
  }

  const settingPermissions: typeKeyPermission = {
    officeProfile: settingData?.data?.officeDisplay as boolean,
    userProfile: settingData?.data?.userDisplay as boolean,
    document: settingData?.data?.documentDisplay as boolean,
  }

  const userPermissions: typeKeyPermission = {
    usersData: userData?.data?.userDisplay as boolean,
    usersPermissions: userData?.data?.userPermissionDisplay as boolean,
  }

  const sentMessagePermissions: typeKeyPermission = {
    typeMessages: sentMessageData?.data?.typeMessageDisplay as boolean,
    managementMessages: sentMessageData?.data?.sentMessageDisplay as boolean,
  }

  const reciveMessagePermissions: typeKeyPermission = {
    reciveMessages: reciveMessageData?.data?.reciveMessageDisplay as boolean,
    delayMessages: reciveMessageData?.data?.delayMessageDisplay as boolean,
  }

  const officePermissions: typeKeyPermission = {
    officeData: officeData?.data?.officeDisplay as boolean,
  }

  const archiveMessagePermissions: typeKeyPermission = {
    archiveDepartment: archiveMessageData?.data
      ?.departmentArchiveDisplay as boolean,
    archiveSentMessages: archiveMessageData?.data
      ?.ArchiveSentMessageDisplay as boolean,
    archiveIncomingMessages: archiveMessageData?.data
      ?.ArchiveReciveMessageDisplay as boolean,
  }

  const humanResurcePermissions: typeKeyPermission = {
    administrative: humanResourceData?.data?.adminstrativeDisplay as boolean,
    department: humanResourceData?.data?.departmentAacademicDisplay as boolean,
    employee: humanResourceData?.data?.employeeDisplay as boolean,
  }

  const backupPermissions: typeKeyPermission = {
    takeBackup: backupData?.data?.takeBackupDisplay as boolean,
  }

  const initials = getInitialName(user?.name)
  const router = useRouter()
  async function handleLogout() {
    try {
      await logoutUser()
      router.push('/login')
      toast.success('User logout Successfully')
    } catch {}
  }
  return (
    <div
      className=" h-full w-full fixed top-0 bottom-0 ring-0 left-0 
     bg-black/70 z-[99999] md:z-0 md:relative"
    >
      <div
        onClick={() => setActiveMenu(!activeMenu)}
        className="md:hidden block z-[99999] cursor-pointer p-1.5
       bg-white rounded-full absolute top-2.5 right-2.5"
      >
        <X className="h-6 w-6" />
      </div>
      <div
        className="
          sidebar h-full bg-blue-50 pb-2.5
           fixed top-0 left-0 shadow-sm
            border-r-1 border-gray-300"
      >
        <div
          className="mb-4 w-auto flex border-b-1 border-r-1 border-gray-300 py-1.5 px-2.5 
           items-center justify-between h-[61px] "
        >
          <h2 className="font-medium text-[16px] w-2/3 capitalize">
            {user?.office?.name}
          </h2>
          <div   className="bg-blue-50 text-full text-center  w-10
        h-10 border-1 font-medium  justify-center items-center
        border-neutral-500   rounded-[50%] flex">
            {user?.imageUrl ? (
              <img
                src={user?.office?.imageUrl}
                className="rounded-[50%]  "
                alt="imageUrl"
              />
            ) : (
              <div
                className="relative inline-flex items-center justify-center w-10 h-10 
            overflow-hidden bg-gray-100 rounded-full dark:bg-gray-400"
              >
                <span className="font-medium text-gray-600 dark:text-white">
                  {initials}
                </span>
              </div>
            )}
          </div>

          <span
            className="text-xl cursor-pointer smd:block hidden "
            onClick={() => setActiveMenu(activeMenu)}
          >
            <EyeClosed />
          </span>
        </div>
        <div
          className="flex flex-col px-2 h-[548px] overflow-y-auto
           md:text-16 gap-0.5  text-14"
        >
          {/* ===========DASHBOARD LINKS============== */}
          <div
            className="flex justify-between  items-center 
              p-3 gap-1.5 rounded-lg hover:bg-blue-100 cursor-pointer"
            onClick={() => setDashboardsDrop(!dashboardsDrop)}
          >
            <span className="flex items-center gap-2">
              <LucideLayoutDashboard className="w-5 h-5 " />
              <p
                className="text-16  sms:text-14 font-medium   
                      capitalize"
              >
                dashboard
              </p>
            </span>
            <span>
              {dashboardsDrop ? (
                <ChevronDown className="w-5 h-5 text-black font-bold bg-blue-300  p-1 rounded-full" />
              ) : (
                <ChevronRight className=" w-5 h-5 text-black font-bold bg-blue-300  p-1 rounded-full" />
              )}
            </span>
          </div>
          {dashboardsDrop &&
            dashboardLinks
              ?.filter((route) => dashboardPermissions[route?.key])
              ?.map((route) => (
                <Link
                  href={route?.link}
                  className=" flex justify-between items-center text-16 
                        sms:text-14  ml-4 py-2 px-4 rounded-lg
                        hover:bg-blue-100 capitalize font-medium"
                  key={route?.text}
                >
                  <p key={route?.text}>{route?.text}</p>
                  <PlusCircle className="w-4 h-4" />
                </Link>
              ))}

          {/* ===========SETTINGS OFFICES LINKS============== */}
          <div
            className="flex justify-between  items-center 
              p-3 gap-1.5 rounded-lg hover:bg-blue-100 cursor-pointer"
            onClick={() => setSettingDrop(!settingDrop)}
          >
            <span className="flex items-center gap-2">
              <Settings className="w-5 h-5 " />
              <p
                className="text-16  sms:text-14 font-medium   
                      capitalize"
              >
                settings
              </p>
            </span>
            <span>
              {settingDrop ? (
                <ChevronDown className="w-5 h-5 text-black font-bold bg-blue-300  p-1 rounded-full" />
              ) : (
                <ChevronRight className=" w-5 h-5 text-black font-bold bg-blue-300  p-1 rounded-full" />
              )}
            </span>
          </div>
          {settingDrop &&
            settingsLinks
              ?.filter((route) => settingPermissions[route?.key])
              ?.map((route) => (
                <Link
                  href={route?.link}
                  className=" flex justify-between items-center text-16 
                        sms:text-14  ml-4 py-2 px-4 rounded-lg
                        hover:bg-blue-100 capitalize font-medium"
                  key={route?.text}
                >
                  <p key={route?.text}>{route?.text}</p>
                  <PlusCircle className="w-4 h-4" />
                </Link>
              ))}

          {/* ===========OFFICES LINKS============== */}
          {officeData?.data?.officeDisplay && (
            <>
              <div
                className="flex justify-between  items-center 
              p-3 gap-1.5 rounded-lg hover:bg-blue-100 cursor-pointer"
                onClick={() => setOfficeDrop(!officeDrop)}
              >
                <span className="flex items-center gap-2">
                  <GiOfficeChair className="w-5 h-5 " />
                  <p
                    className="text-16  sms:text-14 font-medium   
                      capitalize"
                  >
                    offices
                  </p>
                </span>
                <span>
                  {officeDrop ? (
                    <ChevronDown className="w-5 h-5 text-black font-bold bg-blue-300  p-1 rounded-full" />
                  ) : (
                    <ChevronRight className=" w-5 h-5 text-black font-bold bg-blue-300  p-1 rounded-full" />
                  )}
                </span>
              </div>
              {officeDrop &&
                officesLinks
                  ?.filter((route) => officePermissions[route?.key])
                  ?.map((route) => (
                    <Link
                      href={route?.link}
                      className=" flex justify-between items-center text-16 
                        sms:text-14  ml-4 py-2 px-4 rounded-lg
                        hover:bg-blue-100 capitalize font-medium"
                      key={route?.text}
                    >
                      <p key={route?.text}>{route?.text}</p>
                      <PlusCircle className="w-4 h-4" />
                    </Link>
                  ))}
            </>
          )}

          {/* ===========USERS LINKS============== */}
          <div
            className="flex justify-between  items-center 
              p-3 gap-1.5 rounded-lg hover:bg-blue-100 cursor-pointer"
            onClick={() => setUsersDrop(!usersDrop)}
          >
            <span className="flex items-center gap-2">
              <Users className="w-5 h-5 " />
              <p
                className="text-16  sms:text-14 font-medium   
                      capitalize"
              >
                users
              </p>
            </span>
            <span>
              {usersDrop ? (
                <ChevronDown className="w-5 h-5 text-black font-bold bg-blue-300  p-1 rounded-full" />
              ) : (
                <ChevronRight className=" w-5 h-5 text-black font-bold bg-blue-300  p-1 rounded-full" />
              )}
            </span>
          </div>
          {usersDrop &&
            usersLinks
              ?.filter((route) => userPermissions[route?.key])
              ?.map((route) => (
                <Link
                  href={route?.link}
                  className=" flex justify-between items-center text-16 
                        sms:text-14  ml-4 py-2 px-4 rounded-lg
                        hover:bg-blue-100 capitalize font-medium"
                  key={route?.text}
                >
                  <p key={route?.text}>{route?.text}</p>
                  <PlusCircle className="w-4 h-4" />
                </Link>
              ))}

          {/* ===========SEND MESSAGES LINKS============== */}
          <div
            className="flex justify-between  items-center 
              p-3 gap-1.5 rounded-lg hover:bg-blue-100 cursor-pointer"
            onClick={() => setSendMessageDrop(!sendMessageDrop)}
          >
            <span className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 " />
              <p
                className="text-16  sms:text-14 font-medium   
                      capitalize"
              >
                send messages
              </p>
            </span>
            <span>
              {sendMessageDrop ? (
                <ChevronDown className="w-5 h-5 text-black font-bold bg-blue-300  p-1 rounded-full" />
              ) : (
                <ChevronRight className=" w-5 h-5 text-black font-bold bg-blue-300  p-1 rounded-full" />
              )}
            </span>
          </div>
          {sendMessageDrop &&
            sendMessagesLinks
              ?.filter((route) => sentMessagePermissions[route?.key])
              ?.map((route) => (
                <Link
                  href={route?.link}
                  className=" flex justify-between items-center text-16 
                        sms:text-14  ml-4 py-2 px-4 rounded-lg
                        hover:bg-blue-100 capitalize font-medium"
                  key={route?.text}
                >
                  <p key={route?.text}>{route?.text}</p>
                  <PlusCircle className="w-4 h-4" />
                </Link>
              ))}

          {/* ===========INCOMING MESSAGES LINKS============== */}
          <div
            className="flex justify-between  items-center 
              p-3 gap-1.5 rounded-lg hover:bg-blue-100 cursor-pointer"
            onClick={() => setReciveMessageDrop(!reciveMessageDrop)}
          >
            <span className="flex items-center gap-2">
              <Inbox className="w-5 h-5 " />
              <p className="text-16  sms:text-14 font-medium capitalize">
                recive messages
              </p>
            </span>
            <span>
              {reciveMessageDrop ? (
                <ChevronDown className="w-5 h-5 text-black font-bold bg-blue-300  p-1 rounded-full" />
              ) : (
                <ChevronRight className=" w-5 h-5 text-black font-bold bg-blue-300  p-1 rounded-full" />
              )}
            </span>
          </div>
          {reciveMessageDrop &&
            reciveMessagesLinks
              ?.filter((route) => reciveMessagePermissions[route?.key])
              ?.map((route) => (
                <Link
                  href={route?.link}
                  className=" flex justify-between items-center text-16 
                        sms:text-14  ml-4 py-2 px-4 rounded-lg
                        hover:bg-blue-100 capitalize font-medium"
                  key={route?.text}
                >
                  <p key={route?.text}>{route?.text}</p>
                  <PlusCircle className="w-4 h-4" />
                </Link>
              ))}

          {/* ===========ARCHIVE MESSAGES LINKS============== */}
          <div
            className="flex justify-between  items-center 
              p-3 gap-1.5 rounded-lg hover:bg-blue-100 cursor-pointer"
            onClick={() => setArchiveMessageDrop(!archiveMessageDrop)}
          >
            <span className="flex items-center gap-2">
              <Archive className="w-5 h-5 " />
              <p
                className="text-16  sms:text-14 font-medium   
                      capitalize"
              >
                archive messages
              </p>
            </span>
            <span>
              {archiveMessageDrop ? (
                <ChevronDown className="w-5 h-5 text-black font-bold bg-blue-300  p-1 rounded-full" />
              ) : (
                <ChevronRight className=" w-5 h-5 text-black font-bold bg-blue-300  p-1 rounded-full" />
              )}
            </span>
          </div>
          {archiveMessageDrop &&
            archiveMessagesLinks
              ?.filter((route) => archiveMessagePermissions[route?.key])
              ?.map((route) => (
                <Link
                  href={route?.link}
                  className=" flex justify-between items-center text-16 
                        sms:text-14  ml-4 py-2 px-4 rounded-lg
                        hover:bg-blue-100 capitalize font-medium"
                  key={route?.text}
                >
                  <p key={route?.text}>{route?.text}</p>
                  <PlusCircle className="w-4 h-4" />
                </Link>
              ))}

          {/* ===========HUMAN RESOURDE LINKS============== */}
          <div
            className="flex justify-between  items-center 
              p-3 gap-1.5 rounded-lg hover:bg-blue-100 cursor-pointer"
            onClick={() => setHumanResourceDrop(!humanResourceDrop)}
          >
            <span className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 " />
              <p
                className="text-16  sms:text-14 font-medium   
                      capitalize"
              >
                human resource
              </p>
            </span>
            <span>
              {humanResourceDrop ? (
                <ChevronDown className="w-5 h-5 text-black font-bold bg-blue-300  p-1 rounded-full" />
              ) : (
                <ChevronRight className=" w-5 h-5 text-black font-bold bg-blue-300  p-1 rounded-full" />
              )}
            </span>
          </div>
          {humanResourceDrop &&
            humanResourcesLinks
              ?.filter((route) => humanResurcePermissions[route?.key])
              ?.map((route) => (
                <Link
                  href={route?.link}
                  className=" flex justify-between items-center text-16 
                        sms:text-14  ml-4 py-2 px-4 rounded-lg
                        hover:bg-blue-100 capitalize font-medium"
                  key={route?.text}
                >
                  <p key={route?.text}>{route?.text}</p>
                  <PlusCircle className="w-4 h-4" />
                </Link>
              ))}

          {/* ===========BACK UP LINKS============== */}
          <div
            className="flex justify-between  items-center 
              p-3 gap-1.5 rounded-lg hover:bg-blue-100 cursor-pointer"
            onClick={() => setBackupDrop(!backupDrop)}
          >
            <span className="flex items-center gap-2">
              <Save className="w-5 h-5 " />
              <p
                className="text-16  sms:text-14 font-medium   
                      capitalize"
              >
                backup copy
              </p>
            </span>
            <span>
              {backupDrop ? (
                <ChevronDown className="w-5 h-5 text-black font-bold bg-blue-300  p-1 rounded-full" />
              ) : (
                <ChevronRight className=" w-5 h-5 text-black font-bold bg-blue-300  p-1 rounded-full" />
              )}
            </span>
          </div>

          {backupDrop &&
            backupLinks
              ?.filter((route) => backupPermissions[route?.key])
              ?.map((route) => (
                <Link
                  href={route?.link}
                  className=" flex justify-between items-center text-16 
                        sms:text-14  ml-4 py-2 px-4 rounded-lg
                        hover:bg-blue-100 capitalize font-medium"
                  key={route?.text}
                >
                  <p key={route?.text}>{route?.text}</p>
                  <PlusCircle className="w-4 h-4" />
                </Link>
              ))}
        </div>
        <button
          onClick={handleLogout}
          type="button"
          className="flex justify-center items-center gap-4 mt-2 absolute bottom-0.5
        cursor-pointer md:text-16  p-2  mb-2.5 sm:text-14 
         rounded-lg bg-black/90 w-full text-white capitalize
          font-medium"
        >
          <p>Logout</p>
          <Power className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
