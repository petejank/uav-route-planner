import {makeStyles} from '@material-ui/core/styles'

import zIndex from 'assets/styles/zIndex'

export default makeStyles(() => ({
  appBar: {
    left: 'auto',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: zIndex.navbar
  },
  toolbar: {
    justifyContent: 'space-between',
    paddingLeft: 0,
    paddingRight: 0
  }
}))
