import { FC } from 'react'
import PageLink from './PageLink'
import { scrollToTop } from '../../../components/ScrollButton'
import { getPaginationItems } from '../../../utils/getPaginationItems'
import { leftArrow, rightArrow } from '../../../assets'
import { ReactSVG } from 'react-svg'

type Props = {
  currentPage: number
  lastPage: number
  maxLength: number
  setCurrentPage: Function
}

const Pagination: FC<Props> = ({
  currentPage,
  lastPage,
  maxLength,
  setCurrentPage
}) => {
  const pageNums = getPaginationItems(currentPage, lastPage, maxLength)

  return (
    <div className="relative m-auto mt-[40px]">
      <nav aria-label="Pagination">
        <PageLink
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage(currentPage - 1)
            scrollToTop()
          }}
        >
          <ReactSVG src={leftArrow} />
        </PageLink>
        {pageNums.map((pageNum, idx) => (
          <PageLink
            key={idx}
            active={currentPage === pageNum}
            disabled={isNaN(pageNum)}
            onClick={() => {
              setCurrentPage(pageNum)
              scrollToTop()
            }}
          >
            {!isNaN(pageNum) ? (pageNum < 10 ? '0' + pageNum : pageNum) : '...'}
          </PageLink>
        ))}
        <PageLink
          disabled={currentPage === lastPage}
          onClick={() => {
            setCurrentPage(currentPage + 1)
            scrollToTop()
          }}
        >
          <ReactSVG src={rightArrow} />
        </PageLink>
      </nav>
    </div>
  )
}

export default Pagination
