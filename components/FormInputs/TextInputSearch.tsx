/* eslint-disable @typescript-eslint/no-explicit-any */
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

export default function TextInputSearch({
  label,
  register,
  name,
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
      <div>
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
          p-2 text-15 border-[2px]  border-gray-300 bg-white/80
            rounded-md focus:outline-none focus:ring-1 focus:ring-blue-100
            focus:border-blue-300 w-full mt-1 placeholder:text-gray-500"
          placeholder={label ? `${label?.toLowerCase()}` : placeholder}
        />
      </div>
    </div>
  )
}
