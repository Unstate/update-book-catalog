import { logotype } from '@/assets'
import { cn } from '@/utils'

interface LogoAndNameOfCompanyProps {
  className: string
}

const LogoAndNameOfCompany: React.FC<LogoAndNameOfCompanyProps> = ({
  className
}) => {
  return (
    <div className="flex items-center justify-center gap-2 md:gap-7 lg:gap-7 xl:gap-7 2xl:gap-7">
      <img
        className="h-[70px] w-[70px] "
        src={logotype}
      />
      <p className={cn('text-4xl font-bold uppercase', className)}>mooduck</p>
    </div>
  )
}

export default LogoAndNameOfCompany
