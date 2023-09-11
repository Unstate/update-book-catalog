import { ReactSVG } from 'react-svg'
import { starNotPainted, starPainted } from '../../../assets'
import { FC } from 'react'

interface StarProps {
  fufil: boolean
}

const Star: FC<StarProps> = ({ fufil }) => {
  return <>{fufil ? <ReactSVG src={starPainted} /> : <ReactSVG src={starNotPainted} />}</>
}

export default Star
