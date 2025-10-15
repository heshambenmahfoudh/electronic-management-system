/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { XCircle } from 'lucide-react'
import Link from 'next/link'
import { BsFilePdf } from 'react-icons/bs'

type FilePdfInputProps = {
  label: string
  file: string | undefined
  setFile?: any
  changeValue?: any
  register?: any
  errors?: any
  className?: string
  isDelete?: boolean
  isLoadingFile?: boolean
  fileName: string | undefined
  setFileName?: any
  name?: string
  isRequired?: boolean
}

export default function SelectFileInput({
  label,
  file,
  setFile,
  changeValue,
  register,
  isRequired = true,
  isDelete = true,
  isLoadingFile = false,
  errors,
  fileName,
  setFileName,
  name = 'file',
  className = 'col-span-full',
}: FilePdfInputProps) {
  function handleDeleteFile() {
    setFile('')
    setFileName('')
  }
  return (
    <div className={className}>
      <label
        htmlFor="Select File"
        className="block w-fit ml-0.5  text-[14px] font-medium leading-5 text-gray-700 mb-2 "
      >
        {label}
      </label>
      {file ? (
        <div className="relative mb-6 ">
          {isDelete && (
            <button
              type="button"
              className="absolute top-1 right-1 cursor-pointer 
            bg-slate-100 text-red-600 rounded-full "
              onClick={handleDeleteFile}
            >
              <XCircle className="w-6 h-6" />
            </button>
          )}
          <Link
            href={file}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 md:max-h-[170px] 
              max-h-[140px] w-full rounded-md px-6  bg-gray-500
             text-slate-800 flex items-center focus:ring-1
            focus:ring-blue-100 focus:border-blue-300 dark:text-slate-200 
             border-[2px]
              border-slate-200"
          >
            <div className="flex justify-center items-center ">
              <BsFilePdf className="text-[19px] flex-shrink-0 mr-2 text-white" />
              <span className="line-clamp-1 text-white">{fileName} </span>
            </div>
          </Link>
        </div>
      ) : (
        <>
          <label
            htmlFor="file"
            className="py-2 cursor-pointer md:min-h-[170px] min-h-[140px] w-full
             border-[2px] border-gray-300 rounded-md px-6 bg-white focus:ring-1 focus:border-blue-300 
            focus:ring-blue-100 text-slate-800 flex justify-center flex-col gap-1 items-center dark:text-slate-200
            "
          >
            {register ? (
              <input
                {...register(`${name}`, { required: isRequired })}
                type="file"
                name={name}
                onChange={changeValue}
                accept="application/pdf"
                className="hidden"
                id="file"
              />
            ) : (
              <input
                type="file"
                name={name}
                onChange={changeValue}
                accept="application/pdf"
                className="hidden"
                id="file"
              />
            )}

            <BsFilePdf className="text-5xl text-red-400 flex-shrink-0 text-center" />
            <span className="text-sm text-black font-medium">
              {isLoadingFile ? 'Uploading please wait...' : 'Upload File'}
            </span>
          </label>
          {errors[`${name}`] && (
            <span className="text-sm text-red-600 ">{label} is required</span>
          )}
        </>
      )}
    </div>
  )
}
