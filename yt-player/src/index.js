const COMPONENT_NAME = 'data-yt-player'
const COMPONENT_SELECTOR = `[${COMPONENT_NAME}]`
const TAG = document.createElement('script')

export default () => {
  const components = document.querySelectorAll(COMPONENT_SELECTOR)

  window.addEventListener('load', () => {
    TAG.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(TAG, firstScriptTag)

    window.onYouTubeIframeAPIReady = () => {
      for (let i = 0; i < components.length; i++) {
        const component = components[i]

        const elements = {
          playBtn: component.querySelector('[data-ref="yt-player[play-button]"]'),
          videoOverlay: component.querySelector('[data-ref="yt-player[overlay]"]'),
          videoFrame: component.querySelector('[data-ref="yt-player[frame]"]')
        }

        const componentId = Math.random().toString(36).substring(5)
        component.id = componentId

        if (!isError(elements, componentId)) {
          const activeClasses = {
            overlay: elements.videoOverlay.getAttribute('data-active-class'),
            playBtn: elements.playBtn.getAttribute('data-active-class')
          }

          generateThumbnail(elements)

          const onPlayerReady = (event) => {
            elements.playBtn.addEventListener('click', (e) => {
              e.preventDefault()
              elements.videoOverlay.classList.add(activeClasses.overlay)
              elements.playBtn.classList.add(activeClasses.playBtn)
            })
          }

          const onPlayerStateChange = (event) => {
            switch (event.data) {
              case 0:
                elements.videoOverlay.classList.remove(activeClasses.overlay)
                elements.playBtn.classList.remove(activeClasses.playBtn)
                break
              case 2:
                elements.videoOverlay.classList.remove(activeClasses.overlay)
                elements.playBtn.classList.remove(activeClasses.playBtn)
                break
              default:
                elements.videoOverlay.classList.add(activeClasses.overlay)
                elements.playBtn.classList.add(activeClasses.playBtn)
            }
          }

          /* eslint-disable-next-line */
          const frame = new YT.Player(`${setUniqueId(elements.videoFrame)}`, {
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
          })

          elements.playBtn.addEventListener('click', (e) => {
            startVideo(e, elements, frame, activeClasses)
          })
        }
      }
    }
  })

  const isError = (elements, componentId) => {
    let error = ''
    let status = false

    for (let key in elements) {
      if (elements[key] === null) {
        error = `[YT Player] \n Missing element: ${key} (component id: "${componentId}")`
        status = true
        console.error(error)
      }
    }

    return status
  }

  const generateThumbnail = (elements) => {
    /* eslint-disable-next-line */
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
    const match = elements.videoFrame.src.match(regExp)
    if (match && match[7].length === 11) {
      elements.videoOverlay.style.backgroundImage = `url(https://img.youtube.com/vi/${match[7]}/maxresdefault.jpg)`
    } else {
      console.error('Invalid Youtube link')
    }
  }

  const setUniqueId = (videoFrame) => {
    const id = Math.random().toString(36).substring(5)
    videoFrame.id = id

    return id
  }

  const startVideo = (e, elements, frame, activeClasses) => {
    e.preventDefault()
    elements.videoOverlay.classList.add(activeClasses.overlay)
    elements.playBtn.classList.add(activeClasses.playBtn)
    frame.playVideo()
  }
}
