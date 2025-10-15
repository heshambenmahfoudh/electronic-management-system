'use client'
import React from 'react'
import { permessionLinks } from '@/app/(dummy)/data'
import ArchiveMessagePermissionForm from '@/components/forms/permissions/ArchiveMessagePermissionForm'
import BackupPermissionForm from '@/components/forms/permissions/BackupPermissionForm'
import DashboardPermissionForm from '@/components/forms/permissions/DashboardPermissionForm'
import OfficePermissionForm from '@/components/forms/permissions/OfficePermissionForm'
import ReciveMessagePermissionForm from '@/components/forms/permissions/ReciveMessagePermissionForm'
import SentMessagePermissionForm from '@/components/forms/permissions/SentMessagePermissionForm'
import SettingPermissionForm from '@/components/forms/permissions/SettingPermissionForm'
import UserPermissionForm from '@/components/forms/permissions/UserPermissionForm'
import HumanResourcePermissionForm from '@/components/forms/permissions/HumanResourcePermissionForm'
import FormHeader from '@/components/Headers/FormHeader'
import { useStateContext } from '@/contexts/ContextProvider'
import { MenuIcon } from 'lucide-react'
import { TypeSesstionData } from '@/types/types'

export default function PermissionForm({
  session,
}: {
  session: TypeSesstionData
}) {
  const {
    pagePermission,
    setPagePermission,
    selectPagePermission,
    setSelectPagePermission,
  } = useStateContext()

  function handleChoosePage(title: string) {
    setPagePermission({ title })
    setSelectPagePermission((prev: boolean) => !prev)
  }
  return (
    <div>
      <FormHeader titleValue="update user permission" isHidden={true} />
      <div
        className="lg:p-7 md:p-4 p-3  lg:mx-auto
            my-5 smss:my-4 rounded-md md:mx-4 mx-2.5
       bg-white shadow-md border-p1 max-w-5xl"
      >
        <h2 className="text-center font-medium mb-2.5">
          Select Page To Start Permission
        </h2>
        {/* START Links PERMISSION */}
        <div className="relative">
          <div
            className="text-[23px] p-2 w-fit
       bg-gray-300 rounded-full text-emerald-900 cursor-pointer z-10"
            onClick={() => setSelectPagePermission((prev: boolean) => !prev)}
          >
            <MenuIcon className="h-6 w-6 " />
          </div>
          {selectPagePermission && (
            <div
              className="
            flex flex-col md:w-[20rem] w-[14rem] shadow-lg shadow-white mt-1 p-1.5 gap-2
            bg-blue-200 rounded-lg absolute top-10 z-10"
            >
              {permessionLinks?.map(({ title }) => (
                <h2
                  className={`p-1 cursor-pointer
              hover:bg-blue-50 rounded-md 
                capitalize text-center  text-15 font-medium ${
                  pagePermission?.title === title &&
                  'bg-slate-50 text-black underline'
                }`}
                  onClick={() => handleChoosePage(title)}
                  key={title}
                >
                  {title}
                </h2>
              ))}
            </div>
          )}
        </div>
        {pagePermission?.title === 'sent messages' ? (
          <SentMessagePermissionForm />
        ) : pagePermission?.title === 'users' ? (
          <UserPermissionForm />
        ) : pagePermission?.title === 'offices' &&
          session?.role === 'SUPER ADMIN' ? (
          <OfficePermissionForm />
        ) : pagePermission?.title === 'backup copy' ? (
          <BackupPermissionForm />
        ) : pagePermission?.title === 'settings' ? (
          <SettingPermissionForm />
        ) : pagePermission?.title === 'recive messages' ? (
          <ReciveMessagePermissionForm />
        ) : pagePermission?.title === 'archive messages' ? (
          <ArchiveMessagePermissionForm />
        ) : pagePermission?.title === 'human resources' ? (
          <HumanResourcePermissionForm />
        ) : (
          <DashboardPermissionForm />
        )}
      </div>
    </div>
  )
}
