import {PointType} from 'types/point'

export default (points: PointType[]) => {
  return points.map(({lat, lng}) => ({lat, lng}))
}
