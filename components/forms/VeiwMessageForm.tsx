'use client'
import { TypeMessageArchive } from '@/types/types'
import SelectFileInput from '../FormInputs/SelectFileInput'
import TextAreaInput from '../FormInputs/TextAreaInput'
import TextInput from '../FormInputs/TextInput'
import { X } from 'lucide-react'
import { useStateContext } from '@/contexts/ContextProvider'
import { usePathname } from 'next/navigation'
export default function VeiwMessageForm({
  initialData,
}: {
  initialData: TypeMessageArchive
}) {
  const { openViewModel, setOpenViewModel } = useStateContext()
  const path = usePathname()
  const sentArchive = path?.endsWith('archive-sent-messages')
  return (
    <div
      className=" h-full w-full fixed top-0  bottom-0 ring-0 left-0 
     bg-black/80 z-[99999999]"
    >
      <div className="flex justify-between items-center w-full h-full">
        <form
          className=" md:mx-auto mx-2.5
            my-5  rounded-md flx justify-center items-center
          bg-white shadow-md w-3xl   "
        >
          <div
            className="w-full flex bg-blue-200 lg:px-8 px-6 py-3 justify-between 
            items-center gap-3 sticky top-0 border-b-[1px] border-gray-300 rounded-t-md "
          >
            <h2 className="text-center text-lg text-[18px] font-medium">
              Message Details
            </h2>
            <X
              onClick={() => setOpenViewModel(!openViewModel)}
              className="w-6 h-6 cursor-pointer  "
            />
          </div>
          <div
            className="grid gap-x-6 md:gap-y-4 gap-y-2.5 
          md:grid-cols-2 grid-cols-1 mt-3 lg:px-8 lg:pt-3 pt-1.5 h-[535px] overflow-auto  px-6"
          >
            {sentArchive ? (
              <TextInput
                label="Sent to Office"
                className="w-full "
                defaultValue={initialData?.officeRecive?.name}
              />
            ) : (
              <TextInput
                label="Sent From Office"
                className="w-full "
                defaultValue={initialData?.officeSent?.name}
              />
            )}

            <TextInput
              label="Name Sent"
              className="w-full"
              defaultValue={initialData?.sentName}
            />
            <TextInput
              label="Type Message"
              className="w-full"
              defaultValue={initialData?.typeMessage}
            />
            <TextInput
              label="Subject"
              className="w-full"
              defaultValue={initialData?.subject}
            />
            <TextInput
              label="Date"
              className="w-full"
              defaultValue={initialData?.date?.toString()?.slice(0, 28)}
            />
            <TextInput
              label="Archive Date"
              className="w-full"
              defaultValue={initialData?.archiveDate?.toString()?.slice(0, 28)}
            />
            <TextAreaInput label="Notes" defaultValue={initialData?.notes} />
            <SelectFileInput
              label="File"
              file={initialData?.file}
              fileName={initialData?.fileName}
              className="col-span-full"
              isDelete={false}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
