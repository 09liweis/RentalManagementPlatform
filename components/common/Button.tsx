"use client";

import { ButtonHTMLAttributes } from 'react';

export type ButtonType = 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  buttonType?: ButtonType;
  size?: ButtonSize;
  fullWidth?: boolean;
  outline?: boolean;
  className?: string;
  onClick?: () => void;
}

const BUTTON_TYPES: Record<ButtonType, (outline: boolean) => string> = {
  primary: (outline) =>
    outline
      ? 'bg-transparent text-purple-600 border-purple-600 hover:bg-purple-50 active:bg-purple-100'
      : 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white border-transparent',

  secondary: (outline) =>
    outline
      ? 'bg-transparent text-gray-600 border-gray-600 hover:bg-gray-50 active:bg-gray-100'
      : 'bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white border-transparent',

  danger: (outline) =>
    outline
      ? 'bg-transparent text-rose-600 border-rose-600 hover:bg-rose-50 active:bg-rose-100'
      : 'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white border-transparent',

  success: (outline) =>
    outline
      ? 'bg-transparent text-emerald-600 border-emerald-600 hover:bg-emerald-50 active:bg-emerald-100'
      : 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white border-transparent',

  warning: (outline) =>
    outline
      ? 'bg-transparent text-amber-600 border-amber-600 hover:bg-amber-50 active:bg-amber-100'
      : 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white border-transparent',

  info: (outline) =>
    outline
      ? 'bg-transparent text-sky-600 border-sky-600 hover:bg-sky-50 active:bg-sky-100'
      : 'bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white border-transparent',

  light: (outline) =>
    outline
      ? 'bg-transparent text-gray-400 border-gray-400 hover:bg-gray-50 active:bg-gray-100'
      : 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-800 border-transparent',

  dark: (outline) =>
    outline
      ? 'bg-transparent text-gray-800 border-gray-800 hover:bg-gray-50 active:bg-gray-100'
      : 'bg-gray-800 hover:bg-gray-900 active:bg-black text-white border-transparent',
};

const BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs font-medium',
  md: 'px-4 py-2 text-sm font-medium',
  lg: 'px-5 py-2.5 text-base font-medium',
};

export default function Button({
  children,
  disabled = false,
  onClick,
  type = 'button',
  buttonType = 'primary',
  size = 'md',
  fullWidth = false,
  outline = false,
  className = '',
  ...rest
}: ButtonProps) {
  // 禁用状态样式
  const disabledClasses = disabled
    ? 'opacity-60 cursor-not-allowed pointer-events-none'
    : 'cursor-pointer';

  // 全宽样式
  const widthClasses = fullWidth ? 'w-full' : '';

  // 获取按钮类型样式
  const typeClasses = BUTTON_TYPES[buttonType](outline);

  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        ${typeClasses}
        ${BUTTON_SIZES[size]}
        ${disabledClasses}
        ${widthClasses}
        text-center rounded-lg border transition-all duration-200
        shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-offset-1
        ${outline ? 'focus:ring-gray-300' : `focus:ring-${type}-300`}
        ${className}
      `}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}