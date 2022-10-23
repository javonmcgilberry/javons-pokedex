import { useState, useEffect } from 'react'
function useDebounce(val: unknown, delayTime: number) {
  const [debouncedVal, setDebouncedVal] = useState(val)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedVal(val)
    }, delayTime)

    return () => {
      clearTimeout(handler)
    }
  }, [val, delayTime])
  return debouncedVal
}

export default useDebounce
