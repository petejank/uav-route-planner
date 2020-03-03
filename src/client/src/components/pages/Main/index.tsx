import React, {useState, useEffect} from 'react'

import MainContent from './Content'
import * as planApi from 'api/plan'
import * as pointApi from 'api/point'
import {PlanType} from 'types/plan'
import {CoordsType} from 'types/coords'

const MainContainer = () => {
  const [plans, setPlans] = useState<PlanType[] | null>(null)

  function addMarker(id: string, coords: CoordsType) {
    return pointApi.post(id, coords).then(setPlans)
  }

  function addPlan(): Promise<PlanType[]> {
    return planApi.post().then((plans) => {
      setPlans(plans)
      return plans
    })
  }

  function removePlan(id: string) {
    planApi.remove(id).then(setPlans)
  }

  useEffect(() => {
    planApi.get().then(setPlans)
  }, [])

  if (!plans) return null

  return <MainContent plans={plans} addMarker={addMarker} addPlan={addPlan} removePlan={removePlan} />
}

export default MainContainer
