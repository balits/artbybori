import { useState, useCallback, useEffect, createContext } from "react"


interface ScrollContextType {
  scrollY: number
}
export const ScrollContext = createContext<ScrollContextType>({scrollY: 0})

export const ScrollObserver = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [scrollY, setScrollY] = useState(0)
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY)
  },[])

  useEffect(() => {
    window.document.addEventListener("scroll", handleScroll, {passive: true})
    return () => window.document.removeEventListener("scroll", handleScroll)
  }, [scrollY])


  return (
    <ScrollContext.Provider value={{scrollY}}>
      {children}
    </ScrollContext.Provider>
  )
}
