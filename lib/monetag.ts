let isAdCurrentlyShowing = false;

// Rewarded Interstitial Ad
// Used for: Download buttons, Support button,
// Watch Ad to Unlock, Submit Request
export async function showRewardedInterstitial():
  Promise<boolean> {
  if (isAdCurrentlyShowing) return Promise.resolve(true);
  isAdCurrentlyShowing = true;

  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      isAdCurrentlyShowing = false;
      resolve(true);
    }, 5000)
    try {
      if (typeof show_10954902 !== 'undefined') {
        show_10954902()
          .then(() => {
            clearTimeout(timeout)
            isAdCurrentlyShowing = false;
            resolve(true)
          })
          .catch(() => {
            clearTimeout(timeout)
            isAdCurrentlyShowing = false;
            resolve(true)
          })
      } else {
        clearTimeout(timeout)
        setTimeout(() => {
          isAdCurrentlyShowing = false;
          resolve(true)
        }, 1500)
      }
    } catch {
      clearTimeout(timeout)
      isAdCurrentlyShowing = false;
      resolve(true)
    }
  })
}

// Rewarded Popup Ad
// Used for: Movies nav tab, Request nav tab
export async function showRewardedPopup():
  Promise<boolean> {
  if (isAdCurrentlyShowing) return Promise.resolve(true);
  isAdCurrentlyShowing = true;

  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      isAdCurrentlyShowing = false;
      resolve(true);
    }, 5000)
    try {
      if (typeof show_10954902 !== 'undefined') {
        show_10954902('pop')
          .then(() => {
            clearTimeout(timeout)
            isAdCurrentlyShowing = false;
            resolve(true)
          })
          .catch(() => {
            clearTimeout(timeout)
            isAdCurrentlyShowing = false;
            resolve(true)
          })
      } else {
        clearTimeout(timeout)
        setTimeout(() => {
          isAdCurrentlyShowing = false;
          resolve(true)
        }, 1500)
      }
    } catch {
      clearTimeout(timeout)
      isAdCurrentlyShowing = false;
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
