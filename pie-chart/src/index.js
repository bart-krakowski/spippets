const COMPONENT_NAME = 'data-pie-chart'
const COMPONENT_SELECTOR = `[${COMPONENT_NAME}]`

export default () => {
  const components = document.querySelectorAll(COMPONENT_SELECTOR)

  for (let i = 0; i < components.length; i++) {
    const component = components[i]
    const rings = component.querySelectorAll('circle')

    rings.forEach((ring) => {
      let value = changeTextPercentToNumber(ring.dataset.value)
      const radius = ring.r.baseVal.value
      const circumference = radius * 2 * Math.PI

      ring.style.strokeDasharray = `${circumference} ${circumference}`
      ring.style.strokeDashoffset = `${circumference}`

      const offset = circumference - value / 100 * circumference
      ring.style.strokeDashoffset = offset
    })
  }

  function changeTextPercentToNumber (str) {
    return str.replace('%', '')
      .replace(',', '.')
  }
}
