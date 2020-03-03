import url from '../../utils/url'
import planUrl from '../../utils/planUrl'

const RESOURCE = 'point'

export default function(planId: string): string {
  return url(planUrl(planId), RESOURCE)
}
