import {useState} from "react";

interface Interface {
    callback: () => Promise<void>
}

export const useFetching = (callback: () => Promise<void>) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const fetching = async () => {
        try {
            setIsLoading(true)
            await callback()
        } catch (e: any) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error] as const
}