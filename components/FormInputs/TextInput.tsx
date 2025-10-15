/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
type TextInputProps = {
  label?: string
  register?: any
  name?: string
  errors?: any
  type?: string
  page?: string
  placeholder?: string
  className?: string
  disabled?: boolean
  readOnly?: boolean
  defaultValue?: string | number
  isRequired?: boolean
}

export default function TextInput({
  label,
  register,
  name,
  errors,
  type = 'text',
  className = 'sm:col-span-2',
  defaultValue,
  placeholder,
  disabled = false,
  readOnly = false,
  isRequired = true,
}: TextInputProps) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block w-fit ml-0.5 text-[14px] font-medium leading-5 text-gray-700 mb-1 "
      >
        {label}
      </label>
      {register ? (
        <div className="mt-1">
          <input
            {...register(`${name}`, { required: isRequired })}
            type={type}
            name={name}
            id={name}
            defaultValue={defaultValue}
            disabled={disabled}
            readOnly={readOnly}
            autoComplete={name}
            className="
        p-2 text-15 border-[2px] border-gray-300
          rounded-md focus:outline-none
          focus:border-blue-300 w-full focus:ring-1
            focus:ring-blue-100
          mt-1 placeholder:text-gray-500"
            placeholder={label ? `${label?.toLowerCase()}` : placeholder}
          />
          {errors[`${name}`] && (
            <span className="text-sm text-red-600 ">{label} is required</span>
          )}
        </div>
      ) : (
        <div className="mt-1">
          <input
            type={type}
            name={name}
            id={name}
            defaultValue={defaultValue}
            disabled={disabled}
            readOnly={true}
            autoComplete={name}
            className="
        p-2 text-15 border-[2px] border-gray-300
          rounded-md focus:outline-none
          focus:border-blue-300 w-full
          mt-1 placeholder:text-gray-500"
            placeholder={`${label?.toLowerCase()}`}
          />
        </div>
      )}
    </div>
  )
}
