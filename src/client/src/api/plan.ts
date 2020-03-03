import * as http from 'utils/http'
import planUrl from './utils/planUrl'
import {PlanType} from 'types/plan'

const baseUrl = planUrl()

export function get(): Promise<PlanType[]> {
  return http.getAuth(baseUrl).then(({data}) => data.plans)
}

export function post(): Promise<PlanType[]> {
  return http.postAuth(baseUrl).then(({data}) => data.plans)
}

export function remove(id: string): Promise<PlanType[]> {
  return http.removeAuth(planUrl(id)).then(({data}) => data.plans)
}
