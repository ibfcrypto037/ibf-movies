// Rewarded Interstitial Ad
// Used for: Download buttons, Support button,
// Watch Ad to Unlock, Submit Request
export async function showRewardedInterstitial():
  Promise<boolean> {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => resolve(true), 5000)
    try {
      if (typeof show_10954902 !== 'undefined') {
        show_10954902()
          .then(() => {
            clearTimeout(timeout)
            resolve(true)
          })
          .catch(() => {
            clearTimeout(timeout)
            resolve(true)
          })
      } else {
        clearTimeout(timeout)
        setTimeout(() => resolve(true), 1500)
      }
    } catch {
      clearTimeout(timeout)
      resolve(true)
    }
  })
}

// Rewarded Popup Ad
// Used for: Movies nav tab, Request nav tab
export async function showRewardedPopup():
  Promise<boolean> {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => resolve(true), 5000)
    try {
      if (typeof show_10954902 !== 'undefined') {
        show_10954902('pop')
          .then(() => {
            clearTimeout(timeout)
            resolve(true)
          })
          .catch(() => {
            clearTimeout(timeout)
            resolve(true)
          })
      } else {
        clearTimeout(timeout)
        setTimeout(() => resolve(true), 1500)
      }
    } catch {
      clearTimeout(timeout)
      resolve(true)
    }
  })
}

// In-App Interstitial
// Auto shows in background without user action
// 2 ads per 6 minutes max
// 30 second interval between ads
// 8 second delay before first ad shows
// everyPage false = session saved across pages
export function initInAppInterstitial() {
  try {
    if (typeof show_10954902 !== 'undefined') {
      show_10954902({
        type: 'inApp',
        inAppSettings: {
          frequency: 2,
          capping: 0.1,
          interval: 30,
          timeout: 8,
          everyPage: false
        }
      })
    }
  } catch {
    // Silently fail
  }
}
