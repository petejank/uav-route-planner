import {makeStyles} from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  item: {
    display: 'flex',
    '&:hover > $removeButton': {
      display: 'block'
    }
  },
  removeButton: {
    display: 'block',
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      marginLeft: theme.spacing(1)
    }
  }
}))
