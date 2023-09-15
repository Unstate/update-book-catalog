import { useState } from "react"

export const useMessage = (initial:string) => {
    const [message, setMessage] = useState<string | null>(initial)

    return {message, setMessage}
}