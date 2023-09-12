import { useState } from "react"

export const useSee = (initial:boolean) => {
    const [visable, setVisable] = useState<boolean>(initial)

    const handleOnClick = () => {
        setVisable(prev => !prev)
    }

    return {visable, handleOnClick}
}