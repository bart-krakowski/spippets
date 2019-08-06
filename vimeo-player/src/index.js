const COMPONENT_NAME = 'data-vimeo-player'
const COMPONENT_SELECTOR = `[${COMPONENT_NAME}]`
const TAG = document.createElement('script')

export default () => {
  const components = document.querySelectorAll(COMPONENT_SELECTOR)

  TAG.src = 'https://player.vimeo.com/api/player.js'
  const firstScriptTag = document.getElementsByTagName('script')[0]
  firstScriptTag.parentNode.insertBefore(TAG, firstScriptTag)

  window.addEventListener('load', () => {
    for (let i = 0; i < components.length; i++) {
      const component = components[i]
      const elements = {
        playBtn: component.querySelector('[data-ref="vimeo-player[play-button]"]'),
        videoOverlay: component.querySelector('[data-ref="vimeo-player[overlay]"]'),
        videoFrame: component.querySelector('[data-ref="vimeo-player[frame]"]')
      }
      const componentId = Math.random().toString(36).substring(5)
      component.id = componentId
      /* eslint-disable-next-line */
      const frame = new Vimeo.Player(elements.videoFrame)

      let error = ''
      for (let key in elements) {
        if (elements[key] === null) {
          error = `[Vimeo Player] \n Missing element: ${key} (component id: "${componentId}")`
          console.error(error)
        }
      }

      if (!error) {
        const activeClasses = {
          overlay: elements.videoOverlay.getAttribute('data-active-class'),
          playBtn: elements.playBtn.getAttribute('data-active-class')
        }

        /* eslint-disable-next-line */
        const regExp = /(http|https)?:\/\/(www\.)?(player.)?vimeo.com\/(?:video\/)(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)*/
        const match = elements.videoFrame.src.match(regExp)

        if (match && match[5].length === 8) {
          const url = `https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${match[5]}`

          const param = { postId: 1 }
          new Promise((resolve, reject) => {
            const qs = param ? '?' + Object.entries(param).map(d => `${d[0]}=${d[1]}`).join('&') : ''
            /* eslint-disable-next-line */
            const xhr = new XMLHttpRequest()
            xhr.open('GET', `${url}${qs}`)

            xhr.onload = function () {
              if (xhr.status >= 200 && xhr.status < 400) {
                resolve(JSON.parse(xhr.responseText))
              } else {
                resolve(xhr.responseText)
              }
            }
            xhr.onerror = () => reject(xhr.statusText)
            xhr.send()
          }).then(data => {
            elements.videoOverlay.style.backgroundImage = `url(${data.thumbnail_url})`
          })
        } else {
          console.error('Invalid Vimeo link')
        }

        elements.playBtn.addEventListener('click', (e) => {
          e.preventDefault()

          elements.videoOverlay.classList.add(activeClasses.overlay)
          elements.playBtn.classList.add(activeClasses.playBtn)
          frame.play()
        })

        frame.on('pause', () => {
          showOverlay(elements, activeClasses)
        })

        frame.on('ended', () => {
          showOverlay(elements, activeClasses)
        })
      }
    }
  })
}

function showOverlay (elements, activeClasses) {
  elements.videoOverlay.classList.remove(activeClasses.overlay)
  elements.playBtn.classList.remove(activeClasses.playBtn)
}
