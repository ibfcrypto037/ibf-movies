declare function show_10954902(
  type?: string | object
): Promise<void>

// Rewarded Interstitial
// For: Download button, Support button,
// Watch Ad to Unlock, Submit Request
export function showAd(onRewarded: () => void) {
  if (typeof show_10954902 !== 'undefined') {
    show_10954902().then(() => {
      onRewarded()
    })
  } else {
    setTimeout(() => {
      onRewarded()
    }, 1000)
  }
}

// Rewarded Popup
// For: Movies nav tab, Request nav tab
export function showPopupAd(onRewarded: () => void) {
  if (typeof show_10954902 !== 'undefined') {
    show_10954902('pop').then(() => {
      onRewarded()
    }).catch(() => {
      onRewarded()
    })
  } else {
    setTimeout(() => {
      onRewarded()
    }, 1000)
  }
}
