import {PlanType} from 'types/plan'

export default (plans: PlanType[]): PlanType | undefined => {
  return plans[0]
}
