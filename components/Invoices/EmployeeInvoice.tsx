/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import InvoiceHeader from './InvoiceHeader'
import InvoiceFooter from './InvoiceFooter'
import { Employee } from '@prisma/client'
export default function EmployeeInvoice({
  initialData,
  ref,
}: {
  initialData: any
  ref: any
}) {
  
 

  return (
    <div className="overflow-x-auto  mx-3 print:hidden  ">
      <div
        ref={ref}
        className="overflow-auto  m-auto  bg-white min-w-fit 
          rounded-lg  print:overflow-hidden "
      >
        {/* Header with Logo */}
          <InvoiceHeader />
        {/* START HEADER */}
        <div className=" m-auto text-sm    print:overflow-hidden">
          <table className="m-auto  ">
            <thead className="rounded-t-lg m-auto  
             w-full text-center sticky top-0">
              <tr
                className="flex justify-between items-center
               print:border-[0.5px] border-[0.5px]   print:border-gray-300 "
              >
                <th
                  scope="col"
                  className="font-medium print:capitalize  print:flex  print:justify-center 
                                    print:items-center py-2.5 px-2 print:px-2  text-center
                   print:max-h-[60px] print:text-[18px] print:font-medium print:min-w-[60px]  text-sm"
                >
                  no
                </th>
                <th
                  scope="col"
                  className="font-medium print:capitalize  print:flex  print:justify-start
                                    print:items-center py-2.5 px-1  text-start print:max-h-[60px] print:text-[18px] print:font-medium 
                  print:min-w-[180px] text-sm"
                >
                  name
                </th>
                <th
                  scope="col"
                  className="font-medium print:capitalize  print:flex  print:justify-start
                                    print:items-center py-2.5 px-1 
                                     text-start print:max-h-[60px] 
                                     print:text-[18px] print:font-medium print:min-w-[126px]
                                      text-sm"
                >
                  qualification
                </th>
                <th
                  scope="col"
                  className="font-medium print:capitalize  print:flex  print:justify-start
                                    print:items-center py-2.5 px-1  text-start print:max-h-[60px] print:text-[18px]
                                     print:font-medium print:min-w-[126px] text-sm"
                >
                  university
                </th>
                <th
                  scope="col"
                  className="font-medium print:capitalize  print:flex  print:justify-start
                                    print:items-center p-3  text-start print:max-h-[60px] print:text-[18px]
                                     print:font-medium print:min-w-[126px] text-sm"
                >
                  joinDate
                </th>
                <th
                  scope="col"
                  className="font-medium print:capitalize  print:flex  print:justify-start
                                    print:items-center p-3  text-start print:max-h-[60px] print:text-[18px]
                                     print:font-medium print:min-w-[126px] text-sm"
                >
                  jobDegree
                </th>
                <th
                  scope="col"
                  className="font-medium print:capitalize  print:flex  print:justify-start
                                    print:items-center p-3  text-start print:max-h-[60px] print:text-[18px]
                                     print:font-medium print:min-w-[126px] text-sm"
                >
                  jobTitle
                </th>

                <th
                  scope="col"
                  className="font-medium print:capitalize  print:flex  print:justify-start
                                    print:items-center p-3  text-start print:max-h-[60px] print:text-[18px]
                                     print:font-medium print:min-w-[126px] text-sm"
                >
                  jobRank
                </th>
                <th
                  scope="col"
                  className="font-medium print:capitalize  print:flex  print:justify-start
                                    print:items-center p-3  text-start print:max-h-[60px] print:text-[18px]
                                     print:font-medium print:min-w-[126px] text-sm"
                >
                  a_strative
                </th>
                <th
                  scope="col"
                  className="font-medium print:capitalize  print:flex  print:justify-start
                                    print:items-center p-3  text-start print:max-h-[60px] print:text-[18px]
                                     print:font-medium print:min-w-[126px] text-sm"
                >
                  Departmen
                </th>
              </tr>
            </thead>
            <tbody className="m-auto">
              {initialData?.map((item: any, id: number) => {
                return (
                  <tr
                    key={id}
                    className="flex justify-between items-center m-auto
                
              print:border-[0.5px] border-[0.5px]   print:border-gray-300 print:border-t-0 border-t-0"
                  >
                    <td
                      className="font-medium capitalize text-center print:h-[70px] print:py-3 print:px-2 print:text-[18px]
                                   print:flex  print:justify-center print:items-center 
                                   print:m-auto
                                    print:min-w-[60px]"
                    >
                      {id + 1}
                    </td>
                    <td
                      className="font-medium capitalize text-start print:flex  print:justify-start 
                             print:items-center print:text-[18px] print:h-[70px] print:py-3 print:px-2 
                             print:m-auto print:min-w-[180px]"
                    >
                      {item?.name}
                    </td>
                    <td
                      className="font-medium capitalize text-start
                                   print:h-[70px] print:flex  print:justify-start 
                                    print:items-center print:py-3  print:text-[18px] print:px-2 print:m-auto
                                     print:min-w-[126px]"
                    >
                      {item?.qualification}
                    </td>
                    <td
                      className="font-medium capitalize print:flex  print:justify-start 
                                    print:items-center  text-start print:text-[18px]
                  print:h-[70px] print:py-3 print:px-2 print:m-auto print:min-w-[126px]"
                    >
                      {item?.universiry}
                    </td>
                    <td
                      className="font-medium capitalize print:flex  print:justify-start 
                                    print:items-center  text-start print:text-[18px]
                                   print:h-[70px] print:py-3 print:px-2 print:m-auto print:min-w-[126px]"
                    >
                      {item?.joinDate?.toString()?.slice(0, 14)}
                    </td>
                    <td
                      className="font-medium capitalize print:flex  print:justify-start 
                                    print:items-center  text-start print:text-[18px]
                                   print:h-[70px] print:py-3 print:px-2 print:m-auto print:min-w-[126px]"
                    >
                      {item?.academicDegree}
                    </td>
                    <td
                      className="font-medium capitalize print:flex  print:justify-start 
                      print:items-center  text-start print:text-[18px]
                      print:h-[70px] print:py-3 print:px-2 print:m-auto print:min-w-[126px]"
                    >
                      {item?.academicTitle}
                    </td>
                    <td
                      className="font-medium capitalize print:flex  print:justify-start 
                      print:items-center  text-start print:text-[18px]
                      print:h-[70px] print:py-3 print:px-2 print:m-auto print:min-w-[126px]"
                    >
                      {item?.academicRank}
                    </td>
                    <td
                      className="font-medium capitalize print:flex  print:justify-start 
                      print:items-center  text-start print:text-[18px]
                      print:h-[70px] print:py-3 print:px-2 print:m-auto print:min-w-[126px]"
                    >
                      {item?.administrative?.title}
                    </td>
                    <td
                      className="font-medium capitalize print:flex  print:justify-start 
                      print:items-center  text-start print:text-[18px]
                      print:h-[70px] print:py-3 print:px-2 print:m-auto print:min-w-[126px]"
                    >
                      {item?.acadimicDepartment?.title}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {/* Terms & Conditions */}
        <InvoiceFooter />
      </div>
    </div>
  )
}
