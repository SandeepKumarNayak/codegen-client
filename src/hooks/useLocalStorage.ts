import { useState } from 'react'
import { lsGet, lsSet } from '@/utils/localStorageManager'

export function useLocalStorage<T>(key: string, initial: T): [T, (v: T | ((prev: T) => T)) => void] {
    const [stored, setStored] = useState<T>(() => lsGet<T>(key, initial))
    const setValue = (value: T | ((prev: T) => T)) => {
        const toStore = value instanceof Function ? value(stored) : value
        setStored(toStore)
        lsSet(key, toStore)
    }
    return [stored, setValue]
}
