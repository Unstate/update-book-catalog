import { ChangeEvent, useState } from "react"

export const useInput = (initial: string) => {
    
    const [value, setValue] = useState<string>(initial)

    const reset = ():void => {
        setValue('')
    }

    const bind = {
        value,
        onChange: (e:ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
    }
    
    return {value, reset, bind}
}