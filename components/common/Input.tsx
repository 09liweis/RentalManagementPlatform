"use client";

import { ChangeEvent, FC } from 'react'

interface InputProps {
  type: string//'text' | 'number' | 'email' | 'password' | 'date'
  value: string
  placeholder: string
  disabled?: boolean
  autoFocus?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = ({
  type,
  value,
  placeholder,
  disabled,
  autoFocus=false,
  onChange,
}) => {
  return (
    <input
      autoFocus={autoFocus}
      className='input'
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
    />
  )
}

export default Input