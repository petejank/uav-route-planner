import {PointType} from 'types/point'

export default (google: any, points: PointType[]): google.maps.LatLngBounds => {
  const bounds = new google.maps.LatLngBounds() as google.maps.LatLngBounds

  points.forEach(({lat, lng}) => {
    bounds.extend(new google.maps.LatLng(lat, lng) as google.maps.LatLng)
  })

  return bounds
}
