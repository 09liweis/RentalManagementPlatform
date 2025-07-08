"use client";

import { ChangeEvent, FC } from 'react'

interface InputProps {
  type: string//'text' | 'number' | 'email' | 'password' | 'date'
  value: string
  placeholder: string
  disabled?: boolean
  autoFocus?: boolean
  required?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = ({
  type,
  value,
  placeholder,
  disabled,
  required,
  autoFocus=false,
  onChange,
}) => {
  return (
    <div className='text-left w-full'>
      <label className="block text-sm font-medium text-gray-700 mb-1">{placeholder}</label>
      <input
        autoFocus={autoFocus}
        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-gray-900 transition-all duration-300'
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
      />
    </div>
  )
}

export default Input