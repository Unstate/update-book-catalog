import { FC } from 'react'
import {ReactComponent as Galka} from '../../assets/galka.svg'

interface CheckBoxProps {
  checked: boolean
  info: string
  onClick: Function
}

const CheckBox: FC<CheckBoxProps> = ({ checked, info, onClick }) => {
  return (
    <div className="checkBoxContainer  flex items-center space-x-[10px]">
      <button
        onClick={() => onClick(info)}
        className={`${
          checked
            ? 'after:border-white after:border-[0 2px 2px 0] lafter:eft-[7px] relative h-[22px] w-[22px] rounded-[2px] border-[2px] border-[#160F29] bg-[#160F29] after:absolute after:left-[3px] after:top-[-1px] after:block after:h-[10px] after:w-[6px] after:rotate-45 after:transform after:border-solid after:lg:left-[6px] after:lg:top-[1px] 2xl:h-[15px] 2xl:w-[15px] after:2xl:left-[3px] after:2xl:top-[-1px] flex justify-center items-center'
            : 'h-[22px] w-[22px] rounded-[2px] border-[2px] border-[#160F29] 2xl:h-[15px] 2xl:w-[15px]'
        }`}
      >{
        checked && <Galka  /> 
      }</button>
      <p>{info}</p>
    </div>
  )
}

export default CheckBox
