/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
type TextInputProps = {
  label: string
  register?: any
  name?: string
  readOnly?: boolean
  disabled?: boolean
  className?: string
  isRequired?: boolean
  isChecked?: boolean
}

export default function CheckBoxInput({
  label,
  register,
  name,
  readOnly,
  disabled,
  isChecked,
  className = 'sm:col-span-2',
  isRequired = false,
}: TextInputProps) {
  return (
    <div className={className}>
      <label
        htmlFor={name}
        className={`block text-[14px] font-medium leading-5
          ${label?.toLocaleLowerCase()?.includes('are you') ? 'mt-1' : 'mt-0'}
          text-gray-700 mb-0 `}
      >
        {label}
      </label>
      <div
        className={
          label?.toLocaleLowerCase()?.includes('are you') ? 'mt-1' : 'mt-0'
        }
      >
        <input
          {...register(`${name}`, { required: isRequired })}
          type="checkbox"
          name={name}
          readOnly={readOnly}
          disabled={disabled}
          checked={isChecked}
          id={name}
          autoComplete={name}
          className="
          p-2 border-[2px] border-gray-300
          rounded-md focus:outline-none
          focus:border-blue-300 w-fit
          mt-1 placeholder:text-gray-500"
          placeholder={`${label.toLowerCase()}`}
        />
      </div>
    </div>
  )
}
