"use client";

export default function Button({tl,disabled=false,handleClick,tp='primary'}) {
  const BUTTON_TYPES = {
    primary: 'bg-blue-500 hover:bg-blue-700',
    secondary: 'bg-gray-500 hover:bg-gray-700',
    danger: 'bg-red-500 hover:bg-red-700',
    success: 'bg-green-500 hover:bg-green-700',
    warning: 'bg-yellow-500 hover:bg-yellow-700',
    info: 'bg-blue-500 hover:bg-blue-700',
    light: 'bg-gray-500 hover:bg-gray-700',
    dark: 'bg-gray-500 hover:bg-gray-700',
  }
  return (
    <button disabled={disabled} className={`px-2 py-1 text-center rounded text-white cursor-pointer transition ${BUTTON_TYPES[tp]}`} onClick={handleClick}>{tl}</button>
  )
}