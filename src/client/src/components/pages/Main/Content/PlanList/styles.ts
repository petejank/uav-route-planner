import {makeStyles} from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  list: {
    paddingTop: theme.spacing(5),
    [theme.breakpoints.up('lg')]: {
      paddingTop: 0
    }
  }
}))
