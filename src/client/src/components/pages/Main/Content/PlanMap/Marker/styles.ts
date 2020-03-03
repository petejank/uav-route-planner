import {makeStyles} from '@material-ui/core/styles'

export default makeStyles((theme) => {
  const size = '10px'

  return {
    marker: {
      borderRadius: '50%',
      boxShadow: theme.shadows[2],
      height: size,
      transform: 'translate(-50%, -50%)',
      width: size
    }
  }
})
