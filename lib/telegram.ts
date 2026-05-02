export function isTelegramMiniApp(): boolean {
  return typeof window !== 'undefined' &&
    !!window.Telegram?.WebApp?.initData
}

export function getTelegramWebApp() {
  if (typeof window === 'undefined') return null
  return window.Telegram?.WebApp || null
}

export function initTelegramApp() {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp
    tg.ready()
    tg.expand()
    tg.setHeaderColor('#080808')
    tg.setBackgroundColor('#080808')
  }
}

