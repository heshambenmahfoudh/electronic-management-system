'use client'
import Link from 'next/link'
import { Edit2Icon, Eye } from 'lucide-react'
import { AiFillDelete } from 'react-icons/ai'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import LoadingButton from './LoadingButton'
import { TypeActionData } from '@/types/types'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import { deleteTypeMessageById } from '@/actions/typeMessages'
import { deleteOfficeById } from '@/actions/offices'
import { deleteUserById } from '@/actions/users'
import { deleteSentMessageById } from '@/actions/manageMessages'
import { deleteReciveMessageById } from '@/actions/reciveMessages'
import { deleteDelayMessageById } from '@/actions/delayMessages'
import { deleteDepartmentArchiveById } from '@/actions/departmentArchive'
import { deleteSentArchiveById } from '@/actions/sentMessagesArchives'
import { deleteReciveArchiveById } from '@/actions/reciveMessagesArchives'
import { deleteDepartmentAacademicById } from '@/actions/departmentAcademics'
import { deleteAdministrativePosittionById } from '@/actions/administrativePosittions'
import { deleteEmployeeById } from '@/actions/employees'

export default function ActionData({
  onUpdated = false,
  onDeleted = false,
  linkToUpdate,
  onView = false,
  id,
  linkToView,
  resourceName,
  handleClickGetId,
}: TypeActionData) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleDeleteItem(id: string) {
    setIsLoading(true)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let deletedItem
          switch (resourceName) {
            case 'Office':
              deletedItem = await deleteOfficeById(id!)
              break
            case 'User':
              deletedItem = await deleteUserById(id!)
              break
            case 'Type Message':
              deletedItem = await deleteTypeMessageById(id!)
              break
            case 'Sent message':
              deletedItem = await deleteSentMessageById(id!)
            case 'Recive Message':
              deletedItem = await deleteReciveMessageById(id!)
              break
            case 'Delay Message':
              deletedItem = await deleteDelayMessageById(id!)
              break
            case 'Department Archive':
              deletedItem = await deleteDepartmentArchiveById(id!)
              break
            case 'Arcive Sent Message':
              deletedItem = await deleteSentArchiveById(id!)
            case 'Arcive Recive Message':
              deletedItem = await deleteReciveArchiveById(id!)
              break
            case 'Department Academic':
              deletedItem = await deleteDepartmentAacademicById(id!)
              break
            case 'Administrative Positions':
              deletedItem = await deleteAdministrativePosittionById(id!)
              break
            case 'Employee':
              deletedItem = await deleteEmployeeById(id!)
              break
          }
          if (deletedItem?.status === 200) {
            console.log('deletedItem', deletedItem)
            router.refresh()
            toast.success(`${resourceName} Deleted Successfully`)
            setIsLoading(false)
          }
        } catch {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    })
  }

  return (
    <div>
      {!onUpdated && !onDeleted && !onView ? (
        <>Not Allowed</>
      ) : (
        <div
          className="flex justify-center items-center gap-3 min-w-[150px] 
                text-center font-medium capitalize"
        >
          {!isLoading && (
            <div className="flex gap-3">
              {linkToView && onView && (
                <Link
                  href={linkToView}
                  className=" gap-1 cursor-pointer flex items-center font-medium
                  text-blue-600 dark:text-blue-500"
                >
                  <Eye className="w-4 h-4" />
              <span className="text-[14px]">View</span>
                </Link>
              )}
              {onView && handleClickGetId && (
                <div
                  className=" gap-1 cursor-pointer flex items-center font-medium
                  text-blue-600 dark:text-blue-500"
                  onClick={handleClickGetId}
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-[14px]">View</span>
                </div>
              )}
              {onUpdated && linkToUpdate && (
                <Link
                  href={linkToUpdate}
                  className=" gap-1 cursor-pointer  flex items-center font-medium text-blue-600
                                 dark:text-blue-500"
                >
                  <Edit2Icon className="w-4 h-4" />
                  <span className="text-[14px]">Edit</span>
                </Link>
              )}
            </div>
          )}
          {onDeleted && (
            <div>
              {isLoading ? (
                <LoadingButton />
              ) : (
                <div
                  className="flex items-center gap-1 cursor-pointer 
                                   text-red-600 dark:text-red-500"
                  onClick={() => handleDeleteItem(id)}
                >
                  <AiFillDelete className="text-17" />
                  <span className="text-[14px]">Delete</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
