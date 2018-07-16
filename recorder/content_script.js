window.onload = () => {
  if (window.recorderInjected) return
  Object.defineProperty(window, 'recorderInjected', { value: true, writable: false })

  // Setup message passing
  const port = chrome.runtime.connect(chrome.runtime.id)
  port.onMessage.addListener(msg => window.postMessage(msg, '*'))
  window.addEventListener('message', event => {
    // Relay client messages
    if (event.source === window && event.data.type && event.data.type.startsWith('REC_CLIENT_')) {
      port.postMessage(event.data)
    }
  })

  document.title = 'pickme'
  window.postMessage({ type: 'REC_CLIENT_PLAY', data: { url: window.location.origin } }, '*')
}
