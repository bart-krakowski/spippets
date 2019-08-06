import 'intersection-observer'
// eslint-disable-next-line
IntersectionObserver.prototype.POLL_INTERVAL = 100

const COMPONENT_SELECTOR = '[data-lazy]'

const images = document.querySelectorAll(COMPONENT_SELECTOR)
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
}

export default () => {
  // eslint-disable-next-line
  const observer = new IntersectionObserver(handleIntersect, options)

  function handleIntersect (entries) {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        const img = entry.target.getAttribute('data-src')
        entry.target.src = img
      }
    })
  }

  for (let i = 0; i < images.length; i++) {
    observer.observe(images[i])
  }
}
