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
const itemExpanded = createEvent('expander.expanded')

/**
 * Another visit
 *
 * Example:
 *   el.addEventListener('cookies.anotherVisit', () => { ... })
 *
 * @type {Event}
 */
const itemCollapsed = createEvent('expander.collapsed')

/**
 * Collection of all cookies events.
 *
 * @type {Event[]}
 */
export const Events = [
  itemExpanded,
  itemCollapsed
]

export {
  itemExpanded,
  itemCollapsed
}
