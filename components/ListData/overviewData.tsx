import StaticsData from '@/components/StaticsData'
import ArchiveSymmary from '@/components/ArchiveSymmary'
import { getSentArchives } from '@/actions/sentMessagesArchives'
import { getReciveArchives } from '@/actions/reciveMessagesArchives'
import DataTable from '@/components/DataTable'
import {
  archiveReciveMessageDashboardColumn,
  archiveSentMessageDashboardColumn,
} from '@/app/(dummy)/data'
import { User } from 'lucide-react'
import { TypeSesstionData } from '@/types/types'

export default async function OverviewData({
  session,
}: {
  session: TypeSesstionData
}) {
  const officeId = session?.office?.id
  const archiveSentLength = (await getSentArchives(officeId!))?.data
  const archiveReciveLength = (await getReciveArchives(officeId!))?.data
  const archiveSentMessages = (await getSentArchives(officeId!, 2))?.data
  const archiveReciveMessages = (await getReciveArchives(officeId!, 2))?.data

  return (
    <div className="md:px-5  my-5  mx-2.5  rounded-md ">
      <div className=" md:p-3.5 p-2 flex items-center gap-4 font-medium bg-blue-300 rounded-lg mb-3">
        <div className=" p-2 bg-white rounded-full">
          <User className="w-5 h-5 text-blue!" />
        </div>
        <div>
          <span className="mr-1 font-medium text-white capitalize md:text-[17px] text-[15px]">
            {' '}
            Welcome back ,{session?.name}!
          </span>{' '}
          <h2 className="text-[14px] text-white opacity-90 capitalize">
            {' '}
            {session?.role} at {session?.office?.name}
          </h2>
        </div>
      </div>
      <StaticsData />
      <div>
        <h2 className="font-medium text-17 mb-2">Archive Summary</h2>
        <div className="flex justify-between md:flex-row flex-col  items-center md:gap-5 gap-2 ">
          <ArchiveSymmary
            title="Archive Sent Messages"
            dataLength={archiveSentLength?.length}
          />
          <ArchiveSymmary
            title="Archive Recive Messages"
            dataLength={archiveReciveLength?.length}
          />
        </div>
      </div>
      <div className="mb-5">
        <h2 className="font-medium text-17 mb-2">
          Some Available Messages in Archive Sent{' '}
        </h2>
        <div
          className="overflow-x-auto  
      rounded-lg shadow-sm "
        >
          <DataTable
            columns={archiveSentMessageDashboardColumn}
            data={archiveSentMessages}
            isPage="home"
          />
        </div>
      </div>
      <div>
        <h2 className="font-medium text-17 mb-2">
          Some Available Messages in Archive Recive{' '}
        </h2>
        <div
          className="overflow-x-auto  
      rounded-lg shadow-sm "
        >
          <DataTable
            columns={archiveReciveMessageDashboardColumn}
            data={archiveReciveMessages}
            isPage="home"
          />
        </div>
      </div>
    </div>
  )
}
