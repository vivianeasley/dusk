import { filterByZone } from "./utils"

const html = (strings, ...values) =>
    strings.reduce((out, str, i) => out + str + (values[i] ?? ''), '')
  
const mapList = (arr, render) => arr.map(render).join('')

const mapZoneList = (arr, zone, render) => {
    return filterByZone(arr, zone).map(render).join('')
}
  
const render = (rootEl, viewFn) => {
    rootEl.innerHTML = viewFn()
}

export {
    html,
    mapList,
    mapZoneList,
    render,
}