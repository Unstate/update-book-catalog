import { Bubbles, Duck } from '@/assets'

const Preloader = () => {
  return (
    <main className="flex items-center justify-center pt-32">
      <Duck className="relative left-[130px] lg:left-[150px] xl:left-[150px] 2xl:left-[150px]" />
      <Bubbles className="relative bottom-[170px] left-[-10px] animate-spin lg:bottom-[170px] lg:left-[10px] xl:bottom-[170px] xl:left-[10px] 2xl:bottom-[170px] 2xl:left-[10px]" />
    </main>
  )
}

export default Preloader
