import React, {useState, useRef} from 'react'

import {
  AppBar,
  Container,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Icon,
  Hidden
} from 'components/shared/material'
import {useSelector} from 'store'

import useStyles from './styles'

type Props = {
  logout: () => void
}

const DashboardLayoutNav = ({logout}: Props) => {
  const username = useSelector((store) => store.user.username)
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const menuAnchorRef = useRef(null)

  function onMenuOpen() {
    setOpen(true)
  }

  function onMenuClose() {
    setOpen(false)
  }

  function onLogout() {
    onMenuClose()
    logout()
  }

  return (
    <AppBar className={classes.appBar}>
      <Container component="div" vpadded={false}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6">
            Route planning app
          </Typography>
          <div ref={menuAnchorRef}>
            <Hidden lgUp>
              <IconButton color="inherit" onClick={onMenuOpen}>
                <Icon type="Menu" />
              </IconButton>
            </Hidden>
            <Hidden mdDown>
              <Button color="inherit" onClick={onMenuOpen}>
                {username}
                <Icon type="Menu" margin="sm" />
              </Button>
            </Hidden>
          </div>
        </Toolbar>
        <Menu keepMounted anchorEl={menuAnchorRef.current} open={open} onClose={onMenuClose}>
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        </Menu>
      </Container>
    </AppBar>
  )
}

export default DashboardLayoutNav
