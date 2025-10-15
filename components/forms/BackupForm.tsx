/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'
import { createNewBackup, restoreOldBackup } from '@/actions/tackBackup'
import toast from 'react-hot-toast'
import SubmitButton from '@/components/FormInputs/SubmitButton'
import FormHeader from '@/components/Headers/FormHeader'
import { useForm } from 'react-hook-form'
import { BackUpPermission } from '@prisma/client'

export default function BackupForm({permission }: 
    { permission:BackUpPermission }) {
  const [isLoadingBackup, setIsLoadingBackup] = useState(false)
  const [isLoadingRestore, setIsLoadingRestore] = useState(false)
  const { handleSubmit } = useForm()

  async function handleTakeBackup() {
    try {
      setIsLoadingBackup(true)
      const takeBackup = await createNewBackup()
      if (takeBackup?.status === 200) {
        const openWindow = await (window as any).showDirectoryPicker()
        const newFile = await openWindow.getFileHandle(
          takeBackup?.data?.fileName,
          {
            create: true,
          },
        )
        const writeFile = await newFile.createWritable()
        await writeFile.write(JSON.stringify(takeBackup?.data?.blobData))
        await writeFile.close()
        if (writeFile) {
          setIsLoadingBackup(false)
          toast.success('Create a new Backup successfully :)')
        }
      } else {
        setIsLoadingBackup(false)
        toast.error(takeBackup?.error)
      }
    } catch {
      setIsLoadingBackup(false)
    }
  }

  async function handleRestoreBackup() {
    try {
      setIsLoadingRestore(true)
      const [fileHandle] = await (window as any).showOpenFilePicker()
      const existFile = await fileHandle.getFile()
      const fileText = await existFile.text()
      const restoreBackup = await restoreOldBackup(fileText)
      if (restoreBackup?.status === 200) {
        setIsLoadingRestore(false)
        toast.success('Restore a old Backup successfully :)')
      } else {
        setIsLoadingRestore(false)
        toast.error(restoreBackup?.error)
      }
    } catch {
      setIsLoadingRestore(false)
    }
  }

 

  return (
    <div>
      <FormHeader titleValue="Backup Database" isHidden={true} />
      <div
        className="md:p-10 p-6 md:mx-auto my-8 rounded-md mx-3
                   bg-white shadow-md max-w-4xl"
      >
        {permission?.takeBackupCreate && (
          <form
            onSubmit={handleSubmit(handleTakeBackup)}
            className="p-5 mx-auto my-5 rounded-md 
                   bg-gray-100 shadow-md max-w-4xl "
          >
            <h2 className="text-center font-medium underline">
              Create new Backup
            </h2>

            <div className="mt-6 flex justify-between gap-4 items-center">
              <SubmitButton
                title="Save new Backup"
                isLoading={isLoadingBackup}
                loadingTitle="Saving new Backup please wait..."
              />
            </div>
          </form>
        )}
        {permission?.restoreBackup && (
          <form
            onSubmit={handleSubmit(handleRestoreBackup)}
            className="p-5 mx-auto my-5 rounded-md 
                   bg-gray-100 shadow-md max-w-4xl md:mt-10 mt-6"
          >
            <h2 className="text-center font-medium underline">
              Restore old Backup
            </h2>

            <div className="mt-6 flex justify-between gap-4 items-center">
              <SubmitButton
                title="Restore old Backup"
                isLoading={isLoadingRestore}
                loadingTitle="Restoring old Backup please wait..."
              />
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
