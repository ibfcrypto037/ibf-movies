export function isTelegramMiniApp(): boolean {
  return typeof window !== 'undefined' &&
    !!window.Telegram?.WebApp?.initData
}

export function getTelegramWebApp() {
  if (typeof window === 'undefined') return null
  return window.Telegram?.WebApp || null
}
