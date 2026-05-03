import { createRootRoute, Outlet } from '@tanstack/react-router'
import RootLayout from '@/components/layout/RootLayout'
import { useUIStore } from '@/stores/uiStore'
import { useEffect } from 'react'

function Root() {
    const theme = useUIStore((s) => s.theme)
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
    }, [theme])
    return (
        <RootLayout>
            <Outlet />
        </RootLayout>
    )
}

export const Route = createRootRoute({ component: Root })
