import { FC, memo } from 'react'
import StarRating from './StarRating/StarRating'
import { checkExtendOfUser } from '../../utils'

import { useAddDislikeMutation, useAddLikeMutation, useDeleteDislikeMutation, useDeleteLikeMutation } from '../../services/api/comments.api'
import { useGetUserQuery } from '../../services/api/user.api';

import { like } from '../../assets';
import { useDate } from '../../hooks/useDate';
import { IArray } from '../../utils/checkExtendOfUser';
import { ReactSVG } from 'react-svg';


interface CommentProps {
  title: string;
  description: string;
  rating: number;
  dislikes: IArray[];
  likes: IArray[];
  date: number;
  userId: string;
  commentId: string;
}

const Comment: FC<CommentProps> = memo(({
  title, 
  description, 
  rating, 
  dislikes,
  likes, 
  date,
  userId, 
  commentId, 
}) => {
  const {
    data: userData,
  } = useGetUserQuery(userId)

  const {formattedDate} = useDate(date)
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
        <p className="text-mooduck-gray text-lg">{userData?.username}</p>
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
          <ReactSVG
            src={like}
            className={`hover:cursor-pointer ${
                checkExtendOfUser(likes, userId)
                ? 'fill-mooduck-blue'
                : ''
            }`}
            onClick={() => checkExtendOfUser(likes,userId) ? deleteLike(commentId) : addLike(commentId)}
          />
          <p>{likes?.length}</p>
          <ReactSVG
            src={like}
            className={`hover:cursor-pointer rotate-180 scale-x-[-1] ${
                checkExtendOfUser(dislikes, userId)
                ? 'fill-mooduck-blue'
                : ''
            }`}
            onClick={() => checkExtendOfUser(dislikes,userId) ? deleteDislike(commentId) : addDislike(commentId)}
          />
          <p>{dislikes?.length}</p>
        </div>
      </div>
    </div>
  )
})

export default Comment
