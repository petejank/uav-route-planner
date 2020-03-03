import React, {useEffect, useState} from 'react'
import GoogleMapReact, {ClickEventValue} from 'google-map-react'

import * as config from 'config/client'
import Marker from './Marker'
import toMapPoints from './utils/toMapPoints'
import getBounds from './utils/getBounds'
import * as mapDefaults from './constants/mapDefaults'
import {PlanType} from 'types/plan'
import {CoordsType} from 'types/coords'

import useStyles from './styles'

type Props = {
  onMapClick: (coords: CoordsType) => void
  plan?: PlanType
}

const MainContentPlanMap = ({onMapClick, plan}: Props) => {
  const classes = useStyles()
  const [currentPath, setCurrentPath] = useState<any>()
  // Unfortunate choice due to lacks in @types/googlemaps - "any" needs to suffice for now
  const [google, setGoogle] = useState<any>()

  function onClick({lat, lng}: ClickEventValue) {
    onMapClick({lat, lng})
  }

  function onGoogleApiLoaded(google: any) {
    setGoogle(google)
    renderPaths(google)
    fitBounds(google)
  }

  function renderPaths(google: any) {
    if (!google) return
    if (currentPath) currentPath.setMap(null)
    if (!plan) return

    const {points, color} = plan
    const path = new google.maps.Polyline({
      path: toMapPoints(points),
      geodesic: true,
      strokeColor: color
    }) as google.maps.Polyline

    path.setMap(google.map)
    setCurrentPath(path)
  }

  function fitBounds(google: any) {
    if (!google) return
    if (!plan) return

    const {points} = plan
    if (!points.length) return

    google.map.fitBounds(getBounds(google, points))
  }

  useEffect(() => renderPaths(google), [plan])
  useEffect(() => fitBounds(google), [plan?.id])

  return (
    <div className={classes.map}>
      <GoogleMapReact
        bootstrapURLKeys={{key: config.GOOGLE_API_KEY}}
        defaultZoom={mapDefaults.ZOOM}
        defaultCenter={mapDefaults.COORDS}
        options={mapDefaults.MAP_OPTIONS}
        distanceToMouse={mapDefaults.distanceToMouse}
        onClick={onClick}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={onGoogleApiLoaded}
      >
        {plan?.points.map(({id, lat, lng}) => {
          return <Marker key={id} color={plan.color} lat={lat} lng={lng} />
        })}
      </GoogleMapReact>
    </div>
  )
}

export default MainContentPlanMap
