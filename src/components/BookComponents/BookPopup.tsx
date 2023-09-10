// import React from 'react'

// interface BookPopup

// const BookPopup = () => {
//   return (
//     <section
//       className={`absolute right-[102px] top-[90px] flex h-[318px] w-[563px] flex-col gap-y-5 overflow-auto bg-mooduck-white px-[18px] py-[10px] shadow-lg shadow-mooduck-black ${
//         books && value ? 'block' : 'hidden'
//       }`}
//     >
//       <p className="font-semibold uppercase">Результаты поиска</p>
//       <div className="flex flex-col gap-y-3">
//         {books?.books.map((book: IBook) => (
//           <div key={book._id} className="flex items-center justify-between">
//             <div className="flex items-center justify-center gap-x-[13px]">
//               <Link to={`/book/${book._id}`}>
//                 <img
//                   className="h-[48px] w-[32px]"
//                   src={book.img.smallFingernail}
//                   alt="Картинка не прогрузилась"
//                   onError={({ currentTarget }) => {
//                     currentTarget.onerror = null
//                     currentTarget.src = coverMiddle
//                   }}
//                 />
//               </Link>
//               <div className="flex flex-col gap-y-[10px]">
//                 <Link to={`/book/${book._id}`}>
//                   <p>{book.title}</p>
//                 </Link>
//                 <Link to={`/book/${book._id}`}>
//                   <p className="text-mooduck-gray">{book.authors}</p>
//                 </Link>
//               </div>
//             </div>
//             <SaveToRead
//               // stroke='currentColor'
//               onClick={() => {
//                 // console.log(checkExtendOfBook(userData?.books, user?.id))
//                 checkExtendOfBook(userData?.books, book._id)
//                   ? deleteBookFromFavorite({
//                       userId: user?.id,
//                       bookId: book._id
//                     })
//                   : addBookToFavorite({
//                       userId: user?.id,
//                       bookId: book._id
//                     })
//               }}
//               className={`hover:cursor-pointer ${
//                 checkExtendOfBook(userData?.books, book._id)
//                   ? 'fill-mooduck-blue hover:fill-mooduck-black'
//                   : 'fill-mooduck-black hover:fill-mooduck-blue'
//               } `}
//             />
//           </div>
//         ))}
//       </div>
//     </section>
//   )
// }

// export default BookPopup
