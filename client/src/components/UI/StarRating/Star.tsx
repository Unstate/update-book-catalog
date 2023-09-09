import { StarNotPainted, StarPainted } from '@/assets'
import { FC } from 'react'

interface StarProps {
  fufil: boolean
}

const Star: FC<StarProps> = ({ fufil }) => {
  return <>{fufil ? <StarPainted /> : <StarNotPainted />}</>
}

export default Star
