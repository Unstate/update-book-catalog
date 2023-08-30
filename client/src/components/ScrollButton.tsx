import React, { useState, useEffect } from 'react'
import { Link, animateScroll as scroll } from 'react-scroll'

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const ScrollButton: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <Link
      activeClass="active"
      to="header1"
      spy={true}
      smooth={true}
      offset={0}
      duration={400}
      className={`fixed bottom-[50px] left-[50px] h-[100px] w-[100px]
                    rounded-[50%] border-[2px] border-[#160F29] bg-mooduck-white hover:bg-mooduck-black  
                    ${visible ? 'block ' : 'hidden'}`}
    >
      <div className="cursor-pointer text-center text-[60px] text-[#160F29] hover:text-mooduck-white flex items-center justify-center ">
        ↑
      </div>
    </Link>
  )
}

export default ScrollButton
