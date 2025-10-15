'use client'

import { getServerUser } from '@/actions/auth'
import { useQuery } from '@tanstack/react-query'

export default function InvoiceFooter() {
  const { data: user } = useQuery({
    queryKey: ['userSession'],
    queryFn: getServerUser,
  })
  return (
    <div className=" flex justify-between items-center mt-8 pt-4 border-t">
      <div className="flex  gap-1 items-center">
        <h5 className="font-medium ">Printed By </h5>
        <span className="capitalize">{user?.name}</span>
      </div>
      <div className="flex  gap-1 items-center">
        <h5 className="font-medium ">Name :</h5>
        <span className="capitalize">
          ........................................
        </span>
      </div>
      <div className="flex  gap-1 items-center">
        <h5 className="font-medium ">Signature : </h5>
        <span className="capitalize">
          ........................................
        </span>
      </div>
    </div>
  )
}
