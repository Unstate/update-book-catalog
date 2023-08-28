import { logotype } from "@/assets"
import { cn } from "@/services/TailwindMerge"

interface LogoAndNameOfCompanyProps {
    className: string
}

const LogoAndNameOfCompany:React.FC<LogoAndNameOfCompanyProps> = ({className}) => {
  return (
    <div className="flex items-center justify-center gap-7">
        <img className="w-[70px] h-[67px]" src={logotype}/>
        <p className={cn('uppercase font-bold text-4xl', className)}>mooduck</p>
    </div>
  )
}

export default LogoAndNameOfCompany