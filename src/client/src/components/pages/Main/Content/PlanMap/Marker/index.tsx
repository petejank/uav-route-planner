import React from 'react'
import {Coords} from 'google-map-react'

import useStyles from './styles'

type Props = Coords & {
  color: string
}

const MainContentPlanMapMarker = ({color}: Props) => {
  const classes = useStyles()

  return <div className={classes.marker} style={{background: color}} />
}

export default MainContentPlanMapMarker
