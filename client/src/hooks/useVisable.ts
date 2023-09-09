import { useState } from "react"

export const useVisable = (initial:number) => {
    const [visibleItemsCount, setVisibleItemsCount] =
    useState<number>(initial)
    

  const showMoreItems = () => {
    setVisibleItemsCount((count) => count + initial)
  }

  return {visibleItemsCount, showMoreItems }
}