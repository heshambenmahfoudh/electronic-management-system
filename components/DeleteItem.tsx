'use client'
import { deleteUserLogById } from '@/actions/userLogs'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { AiFillDelete } from 'react-icons/ai'
import Swal from 'sweetalert2'
import LoadingButton from './LoadingButton'

export default function DeleteItem({ id }: { id: string }) {
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
          const deletedItem = await deleteUserLogById(id!)
          if (deletedItem?.status === 200) {
            router.refresh()
            setIsLoading(false)
            toast.success(`User log Deleted Successfully`)
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
      {isLoading ? (
        <LoadingButton />
      ) : (
        <div
          className="flex items-center gap-1 cursor-pointer 
                                                  text-red-600 dark:text-red-500"
          onClick={() => handleDeleteItem(id)}
        >
          <AiFillDelete className="text-17" />
          <span className="text-14">Delete</span>
        </div>
      )}
    </div>
  )
}
