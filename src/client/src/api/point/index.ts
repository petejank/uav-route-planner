import * as http from 'utils/http'
import pointUrl from './utils/pointUrl'
import {PlanType} from 'types/plan'
import {CoordsType} from 'types/coords'

export function post(planId: string, coords: CoordsType): Promise<PlanType[]> {
  return http.postAuth(pointUrl(planId), coords).then(({data}) => data.plans)
}
