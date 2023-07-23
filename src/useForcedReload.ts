import { useState } from "react"

export const useForcedReload = () => {
    const [reloadCount, setReloadCount] = useState(0)
    return () => setReloadCount((count) => count + 1)
}