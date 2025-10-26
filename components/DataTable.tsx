'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { TypeDataTableProps } from '../types/types'
import ActionData from './ActionData'
import { useState } from 'react'
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from 'react-icons/ai'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

export default function DataTable({
  data,
  columns = [],
  linkToCreate,
  onUpdated = false,
  onDeleted = false,
  linkToView,
  onView = false,
  linkToUpdate,
  titleToCreate,
  resourceName,
  isPage,
  handleClickGetId,
}: TypeDataTableProps) {
   const rowsPerPage=5
   const [currentPage, setCurrentPage] = useState(1)
   const totalPages=Math.ceil(data.length/rowsPerPage)
   const startIndex= (currentPage-1)* rowsPerPage
   const currentData= data && data?.slice(startIndex,startIndex+rowsPerPage)
  return (
    <>
    <div
      className={`rounded-lg  
      ${ isPage === 'home'
          ? 'p-3 bg-white '
          : 'shadow-md overflow-auto m-5 mt-2 md:mx-5 mx-3'
      } 
      ${currentData?.length > 5 ? 'h-[400px] ' : 'h-fit '}
      `}
    >
      {currentData.length > 0 ? (
        <table className="w-full  text-sm p-3">
          <thead
            className={` rounded-t-lg p-2.5 
            ${!isPage?.includes('home') && 'bg-blue-300'}            
               gap-1 text-center sticky top-0 `}
          >
            <tr>
              {!isPage?.includes('home') && (
                <th
                  scope="col"
                  className="p-2 h-[40px] min-w-[60px] capitalize font-medium"
                >
                  ID
                </th>
              )}
              {columns?.map((col: string, i: number) => {
                const columnName = col ?? ''
                return (
                  <th
                    key={i}
                    scope="col"
                    className={` 
                       font-medium uppercase   min-h-[40px]  text-sm 
                       ${
                         col == 'imageUrl' ? ' min-w-[150px]' : 'min-w-[200px]'
                       } 
                       `}
                  >
                    {columnName}
                  </th>
                )
              })}
              {!isPage?.includes('home') && (
                <th
                  scope="col"
                  className="p-2 uppercase   min-w-[200px] h-[40px] font-medium"
                >
                  ACTIONS
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {currentData?.map((item: any, i: number) => {
              return (
                <tr
                  key={i}
                  className={`
                      ${
                        isPage?.includes('home')
                          ? 'border-none  '
                          : 'border-b-[1px] '
                      } 
                      ${
                        item?.isRead === false &&
                        'bg-green-200! border-gray-300  hover:bg-green-100 '
                      } 
                      bg-white hover:bg-blue-50
                     border-gray-200  
                     
                     `}
                >
                  {!isPage?.includes('home') && (
                    <td
                      key={i}
                      className="font-medium capitalize
                        text-center  md:text-15 text-14 p-2 "
                    >
                      {i + 1}
                    </td>
                  )}
                  {columns?.map((col: string, i: number) => {
                    const columnName = col ?? ''
                    return (
                      <td
                        key={i}
                        className={`font-medium capitalize 
                             text-center  md:text-15 text-14 p-2   h-[61px]
                             { ${
                               col?.includes('imageUrl')
                                 ? ' min-w-[150px]'
                                 : 'min-w-[200px]'
                             } }
                             `}
                      >
                        {columnName?.includes('.') ? (
                          columnName
                            .split('.')
                            .reduce((obj, key) => obj?.[key], item)
                        ) : columnName === 'createdAt' ||
                          columnName === 'updatedAt' ||
                          columnName === 'archiveDate' ||
                          columnName === 'delayDate' ||
                          columnName === 'joinDate' ||
                          columnName === 'dateOfBrith' ||
                          columnName === 'date' ? (
                          item[columnName]?.toString()?.slice(0, 15)
                        ) : columnName?.includes('imageUrl') ? (
                          <div
                            className="flex   justify-center items-center   w-[120px] h-[40]
                           "
                          >
                            <img
                              src={
                                item[columnName] ? item[columnName] : 'imageUrl'
                              }
                              alt="imageUrl"
                              className="min-w-full h-full object-cover rounded-md"
                            />
                          </div>
                        ) : (
                          item[columnName]
                        )}
                      </td>
                    )
                  })}
                  {!isPage?.includes('home') && (
                    <td
                      className="
                        font-medium capitalize
                            text-center  md:text-15 text-14 p-2 "
                    >
                      <ActionData
                        id={item?.id}
                        onUpdated={onUpdated}
                        onDeleted={onDeleted}
                        onView={onView}
                        linkToUpdate={linkToUpdate + item?.id}
                        linkToView={linkToView && linkToView + item?.id}
                        resourceName={resourceName}
                        handleClickGetId={
                          handleClickGetId
                            ? () => handleClickGetId(item?.id)
                            : false
                        }
                      />
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      ) : (
        <p
          className="p-4   bg-white text-center flex 
          justify-center items-center flex-col md:text-xl text-[16px]
          gap-5"
        >
          There is No Data to Display
          {linkToCreate && (
            <Link
              href={linkToCreate}
              className=" 
              md:text-[14px] text-[13px] font-medium text-white  w-fit
              py-2 md:px-5 px-3 rounded-md 
             bg-black/90 uppercase"
            >
              create new {titleToCreate}
            </Link>
          )}
        </p>
      )}
    </div>
     {data?.length > 5 &&(
         <div className="md:ml-5 ml-3 md:mr-8 mr-5 flex justify-end items-end gap-16 -mt-1.5 ">
            <div className="font-medium text-[14px] inline-block">Page {currentPage} of {totalPages}</div>
            <div className="flex justify-center  space-x-2">
                <button 
                      onClick={()=> setCurrentPage(1)}
                      disabled={currentPage===1}
                      className="h-7 w-7 rounded-sm p-0 disabled:cursor-not-allowed cursor-pointer flex justify-center items-center bg-white"> 
                      <span><AiOutlineDoubleLeft className="w-3 h-3 text-gray-800" /></span>
                </button>
                <button
                      onClick={()=> setCurrentPage((p)=>Math.max(p-1,1))}
                      disabled={currentPage=== currentPage + 1 || currentPage===1}
                      className="h-7 w-7 rounded-sm p-0 disabled:cursor-not-allowed cursor-pointer flex justify-center items-center bg-white"> 
                      <span><ChevronLeftIcon className="w-3 h-3 text-gray-800" /></span>
                </button>
                <button 
                      onClick={()=> setCurrentPage((p)=>Math.min(p+1,totalPages))}
                      disabled={currentPage===totalPages}
                      className="h-7 w-7 rounded-sm p-0 disabled:cursor-not-allowed cursor-pointer flex justify-center items-center bg-white"> 
                      <span><ChevronRightIcon className="w-3 h-3 text-gray-800" /></span>
                </button>
                <button
                      onClick={()=> setCurrentPage(totalPages)}
                      disabled={currentPage===totalPages}
                      className="h-7 w-7 rounded-sm p-0 disabled:cursor-not-allowed cursor-pointer flex justify-center items-center bg-white"> 
                      <span><AiOutlineDoubleRight className="w-3 h-3 text-gray-800" /></span>
                </button>
              
            </div>
          </div>
          )}
          </>
  )
}
