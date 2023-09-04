import { FC } from 'react'
import { like, dislike } from '@/assets'
import StarRating from './StarRating/StarRating'
import { checkExtendOfUser } from '@/utils'
import { useAddDislikeMutation, useAddLikeMutation, useDeleteDislikeMutation, useDeleteLikeMutation } from '@/services/BookService'

interface CommentProps {
  title: string;
  description: string;
  rating: number;
  dislikes: string[];
  likes: string[];
  date: number;
  userId: string;
  commentId: string;
}

const Comment: FC<CommentProps> = ({
  title, 
  description, 
  rating, 
  dislikes,
  likes, 
  date,
  userId, 
  commentId, 
}) => {
  const dateN = new Date(date)
  const day = dateN.getDate().toString().padStart(2, '0')
  const month = (dateN.getMonth() + 1).toString().padStart(2, '0')
  const year = dateN.getFullYear().toString()
  const formattedDate = `${day}.${month}.${year}`
  const [addLike] = useAddLikeMutation()
  const [deleteLike] = useDeleteLikeMutation()
  const [addDislike] = useAddDislikeMutation()
  const [deleteDislike] = useDeleteDislikeMutation()
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
            className={`hover:cursor-pointer ${
                checkExtendOfUser(likes, userId)
                ? 'rounded-full bg-mooduck-gray'
                : ''
            }`}
            src={like}
            onClick={() => checkExtendOfUser(likes, userId) ? addLike(commentId) : deleteLike(commentId)}
          />
          <p>{likes?.length}</p>
          <img
            className={`hover:cursor-pointer ${
                checkExtendOfUser(dislikes, userId)
                ? 'rounded-full bg-mooduck-gray'
                : ''
            }`}
            src={dislike}
            onClick={() => checkExtendOfUser(likes, userId) ? addDislike(commentId) : deleteDislike(commentId)}
          />
          <p>{dislikes?.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Comment
