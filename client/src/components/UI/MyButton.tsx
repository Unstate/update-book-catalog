import { cn } from '@/services/TailwindMerge'
import React from 'react'

interface MyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

const MyButton: React.FC<MyButtonProps> = ({
  className,
  disabled,
  children,
  type,
  ...props
}) => {
  return (
    <button
      type={type}
      className={cn(
        'hover:text-white border-[2px] border-mooduck-black font-semibold uppercase text-mooduck-black hover:cursor-pointer hover:bg-mooduck-black hover:text-mooduck-white hover:border-mooduck-black transition-all ease-in',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default MyButton
