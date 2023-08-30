import { FC } from 'react'
import { like, dislike } from '@/assets'
import StarRating from './StarRating/StarRating'
import { checkExtendOfUser } from '@/services/TailwindMerge'

interface CommentProps {
  title: string
  description: string
  rating: number
  dislikes: string[]
  likes: string[]
  date: number
  userId: string
}

const Comment: FC<CommentProps> = ({
  title,
  description,
  rating,
  userId,
  date,
  likes,
  dislikes
}) => {
  const dateN = new Date(date)
  const day = dateN.getDate().toString().padStart(2, '0')
  const month = (dateN.getMonth() + 1).toString().padStart(2, '0')
  const year = dateN.getFullYear().toString()
  const formattedDate = `${day}.${month}.${year}`
  return (
    <div
      className={`flex h-[377px] w-full flex-col p-[30px] gap-y-5 ${
        rating <= 2
          ? 'bg-[#F6E6DF]'
          : rating === 3
          ? 'bg-[#F3F0F9]'
          : rating > 3
          ? 'bg-[#E2F4F2]'
          : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-mooduck-gray text-lg">{userId}</p>
        <p className="text-mooduck-gray text-lg">{formattedDate}</p>
      </div>
      <div className='flex flex-col gap-y-5 h-full'>
        <p className="font-bold text-mooduck-black text-[22px]">{title}</p>
        <p className=" text-mooduck-black text-[20px]">{description}</p>
      </div>
      <div className='flex justify-between'>
        <StarRating
          disabled={true}
          rating={rating}
          handleRating={() => {}}
        ></StarRating>
        <div className='flex gap-x-[10px]'>
          <img
            className={`${
                checkExtendOfUser(likes, userId)
                ? 'rounded-full bg-mooduck-gray'
                : ''
            }`}
            src={like}
          />
          <p>{likes?.length}</p>
          <img
            className={`${
                checkExtendOfUser(dislikes, userId)
                ? 'rounded-full bg-mooduck-gray'
                : ''
            }`}
            src={dislike}
          />
          <p>{dislikes?.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Comment
