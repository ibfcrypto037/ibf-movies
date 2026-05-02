declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void
        expand: () => void
        close: () => void
        setHeaderColor: (color: string) => void
        setBackgroundColor: (color: string) => void
        setBottomBarColor: (color: string) => void
        requestFullscreen: () => void
        enableClosingConfirmation: () => void
        initData: string
        initDataUnsafe: {
          user?: {
            id: number
            first_name: string
            last_name?: string
            username?: string
            language_code?: string
          }
          start_param?: string
        }
        safeAreaInset?: {
          top: number
          bottom: number
          left: number
          right: number
        }
        colorScheme: string
        isExpanded: boolean
        viewportHeight: number
        viewportStableHeight: number
        HapticFeedback?: {
          impactOccurred: (style: string) => void
          notificationOccurred: (type: string) => void
        }
      }
    }
  }
}

export {}
