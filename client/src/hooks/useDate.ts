export const useDate = (initial:number) => {
  const dateN = new Date(initial)
  const day = dateN.getDate().toString().padStart(2, '0')
  const month = (dateN.getMonth() + 1).toString().padStart(2, '0')
  const year = dateN.getFullYear().toString()
  const formattedDate = `${day}.${month}.${year}`
  return {formattedDate}
}
