import { FC } from 'react'
import { starPainted, starNotPainted } from '@/assets'

interface StarProps {
    fufil: boolean
}

const Star: FC<StarProps> = ({ fufil }) => {
    return (
        <>
            {fufil
                ? <img src={starPainted}></img>
                : <img src={starNotPainted}></img>}
        </>
    )
}

export default Star