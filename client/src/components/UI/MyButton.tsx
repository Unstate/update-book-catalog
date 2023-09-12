import { cn } from '../../utils'
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
        'hover:text-white border-[1px] border-mooduck-black font-semibold uppercase text-mooduck-black transition-all ease-in hover:cursor-pointer hover:border-mooduck-black hover:bg-mooduck-black hover:text-mooduck-white',
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
