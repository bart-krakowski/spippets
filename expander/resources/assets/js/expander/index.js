import {
  itemExpanded,
  itemCollapsed
} from './events'
const COMPONENT_NAME = 'data-expander'
const COMPONENT_SELECTOR = `[${COMPONENT_NAME}]`

export default () => {
  const components = document.querySelectorAll(COMPONENT_SELECTOR)

  for (let i = 0; i < components.length; i++) {
    const component = components[i]
    const activeClasses = JSON.parse(decodeURIComponent(component.getAttribute('data-active-classes')))
    const componentItems = component.querySelectorAll('[data-ref="expander[item]"]')

    if (!isComponentError(componentItems)) {
      for (let j = 0; j < componentItems.length; j++) {
        const componentItem = componentItems[j]

        const elements = {
          header: componentItem.querySelector('[data-ref="expander[header]"]'),
          body: componentItem.querySelector('[data-ref="expander[body]"]')
        }

        if (!isItemError(elements)) {
          elements.header.addEventListener('click', () => {
            for (let k = 0; k < componentItems.length; k++) {
              componentItems[k].addEventListener('expander.collapsed', (e) => {
                itemCollapse(componentItems[k], activeClasses)
              })
              componentItems[k].addEventListener('expander.expanded', (e) => {
                itemExpand(componentItems[k], activeClasses)
              })

              if (componentItems[k] !== componentItem && componentItems[k].getAttribute('aria-expanded') === 'true') {
                componentItems[k].dispatchEvent(itemCollapsed)
              }
            }

            if (componentItem.getAttribute('aria-expanded') === 'false') {
              componentItem.dispatchEvent(itemExpanded)
            } else {
              componentItem.dispatchEvent(itemCollapsed)
            }
          })
        }
      }
    }
  }
}

const isComponentError = (elements) => {
  let error = ''
  let status = false

  if (!elements.length) {
    error = '[Expander] \n At least one item required.'
    status = true
    console.error(error)
  }

  return status
}

const isItemError = (elements) => {
  let error = ''
  let status = false

  for (let key in elements) {
    if (elements[key] === null) {
      error = `[Expander] \n Missing element: ${key}`
      status = true
      console.error(error)
    }
  }

  return status
}

const itemCollapse = (item, activeClasses) => {
  console.log(item)
  item.setAttribute('aria-expanded', false)
  item.querySelector('[data-ref="expander[header]"]').classList.remove(activeClasses.header)
  item.querySelector('[data-ref="expander[body]"]').classList.remove(activeClasses.body)
}

const itemExpand = (item, activeClasses) => {
  console.log(item)
  item.setAttribute('aria-expanded', true)
  item.querySelector('[data-ref="expander[header]"]').classList.add(activeClasses.header)
  item.querySelector('[data-ref="expander[body]"]').classList.add(activeClasses.body)
}
