import React from 'react'
import Modal from '../Modal'
import StarRating from '../StarRating/StarRating'
import MyButton from '../MyButton'
import { useSetNewBookCommentMutation } from '../../../services/api/comments.api'

interface ModalCommentProps {
  id: string | undefined
  visable: boolean
  setVisable: (visable: boolean) => void
}

const ModalComment: React.FC<ModalCommentProps> = ({
  visable,
  setVisable,
  id
}) => {
  const [commentData, setCommentData] = React.useState({
    title: '',
    description: '',
    rating: 0
  })
  const [setNewBookComment] = useSetNewBookCommentMutation()


  const setTitle: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    setCommentData((prev) => ({ ...prev, title: e.target.value }))
  }

  const setDescription: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    setCommentData((prev) => ({ ...prev, description: e.target.value }))
  }

  const handleRating = (rate: number) => {
    setCommentData((prev) => ({ ...prev, rating: rate }))
  }

  const handleReset = () => {
    setCommentData((prev) => ({ ...prev, rating: 0 }))
  }

  return (
    <Modal
      visable={visable}
      setVisable={setVisable}
      title={'Оставить комментарий'}
    >
      <StarRating
        disabled={false}
        rating={commentData.rating}
        handleRating={handleRating}
      ></StarRating>
      <div className='flex flex-col gap-y-5'>
        <input
          type="text"
          className="w-full rounded-[2px] border-[1px] border-mooduck-gray px-3 py-[15px]"
          value={commentData.title}
          onChange={setTitle}
          placeholder="Заголовок *"
        />
        <input
          type="text"
          className="w-full rounded-[2px] border-[1px] border-mooduck-gray px-3 py-[15px]"
          value={commentData.description}
          onChange={setDescription}
          placeholder="Комментарий *"
        />
      </div>
      <MyButton
        className="py-[15px]"
        onClick={() => {
          setNewBookComment({
            id: id,
            title: commentData.title,
            text: commentData.description,
            rating: commentData.rating
          })
          handleReset()
          setVisable(false)
        }}
      >
        Опубликовать
      </MyButton>
    </Modal>
  )
}

export default ModalComment
