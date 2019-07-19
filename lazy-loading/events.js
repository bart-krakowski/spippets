/**
 * Creates a custom DOM event.
 *
 * @param  {String} name
 * @return {Event}
 */
function createEvent (name) {
  const event = document.createEvent('Event')

  event.initEvent(name, true, true)

  return event
}

/**
 * First visit
 *
 * Example:
 *   el.addEventListener('cookies.firstVisit', () => { ... })
 *
 * @type {Event}
 */
const firstVisit = createEvent('cookies.firstVisit')

/**
 * Another visit
 *
 * Example:
 *   el.addEventListener('cookies.anotherVisit', () => { ... })
 *
 * @type {Event}
 */
const anotherVisit = createEvent('cookies.anotherVisit')

/**
 * Cookies accepted
 *
 * Example:
 *   el.addEventListener('cookies.accepted', () => { ... })
 *
 * @type {Event}
 */
const cookiesAccepted = createEvent('cookies.accepted')

/**
 * Collection of all cookies events.
 *
 * @type {Event[]}
 */
export const Events = [
  firstVisit,
  anotherVisit,
  cookiesAccepted
]

export {
  firstVisit,
  anotherVisit,
  cookiesAccepted
}
