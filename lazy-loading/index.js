import IntersectionObserver from 'intersection-observer-polyfill'
// eslint-disable-next-line
IntersectionObserver.prototype.POLL_INTERVAL = 100

const COMPONENT_SELECTOR = '[data-lazy]'

const images = document.querySelectorAll(COMPONENT_SELECTOR)
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
}

export default function () {
  const observer = new IntersectionObserver(handleIntersect, options)

  function handleIntersect (entries, observer) {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        const img = entry.target.getAttribute('data-src')
        entry.target.src = img
      }
    })
  }

  images.forEach(element => {
    observer.observe(element)
  })
}
