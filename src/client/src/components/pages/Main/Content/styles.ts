import {makeStyles} from '@material-ui/core/styles'

import zIndex from 'assets/styles/zIndex'

export default makeStyles((theme) => ({
  wrapper: {
    display: 'flex'
  },
  mapContainer: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row'
    }
  },
  drawerPaper: {
    maxHeight: '100vh',
    overflowY: 'auto',
    whiteSpace: 'nowrap',
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      maxHeight: `calc(100vh - ${theme.spacing(8)}px)`,
      position: 'relative',
      width: 304
    }
  },
  drawerCloseButton: {
    position: 'absolute',
    zIndex: zIndex.elevate,
    top: 0,
    right: 0
  },
  bottomNavigation: {
    width: '100%'
  },
  bottomNavigationButton: {
    maxWidth: 'none',
    width: '100%'
  }
}))
