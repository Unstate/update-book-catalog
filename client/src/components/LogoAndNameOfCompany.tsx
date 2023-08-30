import { logotype } from '@/assets'
import { cn } from '@/services/TailwindMerge'

interface LogoAndNameOfCompanyProps {
  className: string
}

const LogoAndNameOfCompany: React.FC<LogoAndNameOfCompanyProps> = ({
  className
}) => {
  return (
    <div className="flex items-center justify-center gap-2 md:gap-7 lg:gap-7 xl:gap-7 2xl:gap-7">
      <img
        className="h-[40px] w-[40px] md:h-[67px] md:w-[70px]  lg:h-[67px] lg:w-[70px] xl:h-[67px] xl:w-[70px] 2xl:h-[67px] 2xl:w-[70px]"
        src={logotype}
      />
      <p className={cn('text-4xl font-bold uppercase', className)}>mooduck</p>
    </div>
  )
}

export default LogoAndNameOfCompany
