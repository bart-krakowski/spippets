import getCookie from './helpers/get-cookie'
import setCookie from './helpers/set-cookie'
import {
  firstVisit,
  anotherVisit,
  cookiesAccepted
} from './events'

const COMPONENT_SELECTOR = '[data-cookie]'
const CLOSE_BTN_SELECTOR = '[data-ref="cookie[close]"]'

export default function () {
  const components = document.querySelectorAll(COMPONENT_SELECTOR)
  for (let i = 0; i < components.length; i++) {
    const component = components[i]
    const closeBtn = component.querySelector(CLOSE_BTN_SELECTOR)
    const activeClass = component.getAttribute('data-active-class')

    component.addEventListener('cookies.accepted', (e) => {
      component.classList.remove(activeClass)
    })

    closeBtn.addEventListener('click', () => {
      setCookie('cookiesAccepted', 'true', 365)
      component.dispatchEvent(cookiesAccepted)
    })

    if (getCookie('isVisited') !== 'true') {
      setCookie('isVisited', 'true', 365)
      component.dispatchEvent(firstVisit)
    } else {
      component.dispatchEvent(anotherVisit)
    }

    if (getCookie('cookiesAccepted') === 'true') {
      component.dispatchEvent(cookiesAccepted)
    }
  }
}
