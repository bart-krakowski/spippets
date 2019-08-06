export function getCookie (name) {
  if (document.cookie !== '') {
    const cookies = document.cookie.split(/; */)

    for (let i = 0; i < cookies.length; i++) {
      const cookieName = cookies[i].split('=')[0]
      const cookieVal = cookies[i].split('=')[1]
      if (cookieName === decodeURIComponent(name)) {
        return decodeURIComponent(cookieVal)
      }
    }
  }
}

export function setCookie (name, val, days) {
  if (navigator.cookieEnabled) {
    const cookieName = encodeURIComponent(name)
    const cookieVal = encodeURIComponent(val)
    let cookieText = cookieName + '=' + cookieVal

    if (typeof days === 'number') {
      const data = new Date()
      data.setTime(data.getTime() + (days * 24 * 3600 * 1000))
      cookieText += '; expires=' + data.toGMTString()
    }

    document.cookie = cookieText
  } else {
    console.error('Cookies are disabled!')
  }
}
