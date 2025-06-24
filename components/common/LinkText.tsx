import useAppStore from "@/stores/appStore";
import Link from "next/link";

interface LinkTextProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
}

interface LinkTextProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export default function LinkText({ href, className, children, size = 'md' }: LinkTextProps) {
  const {curLocale} = useAppStore();
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <Link 
      className={`${className || `text-gray-700 hover:text-gray-800 transition-colors duration-300 ${sizeClasses[size]} font-medium`}`} 
      href={`/${curLocale}${href}`}
    >
      {children}
    </Link>
  );
}