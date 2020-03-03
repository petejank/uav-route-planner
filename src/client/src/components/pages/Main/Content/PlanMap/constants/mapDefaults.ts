export const COORDS = {
  lat: 46.948743,
  lng: 7.447535
}

export const ZOOM = 10

export const MAP_OPTIONS = {
  clickableIcons: false,
  disableDoubleClickZoom: true,
  draggableCursor: 'pointer'
}

export function distanceToMouse() {
  return 100 // Removes minimal distance between points
}
