import { IComment } from '@/models/IBook'
import React, { useState } from 'react'
import Comment from './UI/Comment'
import { ITEMS_PER_PAGE } from '@/constants/constants'

interface CommentsProps {
  comments: IComment[]
}

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  const [visibleItemsCount, setVisibleItemsCount] =
    useState<number>(ITEMS_PER_PAGE)

  const showMoreItems = () => {
    setVisibleItemsCount((count) => count + ITEMS_PER_PAGE)
  }
  return (
    <section className="flex flex-col gap-y-5">
      {comments.length ? (
        comments
          .slice(0, visibleItemsCount)
          .map((comment) => (
            <Comment
              key={comment._id}
              commentId={comment._id}
              title={comment.title}
              description={comment.text}
              rating={comment.rating}
              dislikes={comment.dislikes}
              likes={comment.likes}
              date={comment.date}
              userId={comment.userId}
            />
          ))
      ) : (
        <p className="text-[20px]">
          Комментариев ещё нет — вы можете быть первым
        </p>
      )}
      <p
        className={`cursor-pointer text-center text-[20px] font-semibold
                    text-[#160F29] hover:text-[#246A73] ${
                      visibleItemsCount >= comments?.length ? 'hidden' : 'block'
                    }`}
        onClick={showMoreItems}
      >
        Показать больше комменатриев
      </p>
    </section>
  )
}

export default Comments
