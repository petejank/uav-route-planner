import {makeStyles} from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  navbarMargin: {
    marginTop: theme.spacing(7),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(8)
    }
  },
  vertPadding: {
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  noHorPadding: {
    paddingLeft: 0,
    paddingRight: 0
  }
}))
