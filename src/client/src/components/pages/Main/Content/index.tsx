import React, {useState, useEffect} from 'react'

import {
  Container,
  Drawer,
  IconButton,
  Icon,
  Hidden,
  BottomNavigation,
  BottomNavigationAction
} from 'components/shared/material'
import PlanList from './PlanList'
import PlanMap from './PlanMap'
import isMobile from 'utils/isMobile'
import defaultPlan from './utils/defaultPlan'
import {PlanType} from 'types/plan'
import {CoordsType} from 'types/coords'

import useStyles from './styles'

type Props = {
  plans: PlanType[]
  addMarker: (id: string, coords: CoordsType) => void
  addPlan: () => Promise<PlanType[]>
  removePlan: (id: string) => void
}

const MainContent = ({plans, addMarker, removePlan, addPlan}: Props) => {
  const classes = useStyles()
  const [shownPlan, setShownPlan] = useState(defaultPlan(plans))
  const [sidebarMobileOpen, setMobileSidebarOpen] = useState(false)

  function onAddButtonClick() {
    if (sidebarMobileOpen) {
      toggleMobileSidebar()
    }

    addPlan().then((plans) => {
      setShownPlan(defaultPlan(plans))
    })
  }

  function onMapClick(coords: CoordsType) {
    if (!shownPlan) return

    addMarker(shownPlan.id, coords)
  }

  function onPlanClick(planId: string) {
    if (sidebarMobileOpen) {
      toggleMobileSidebar()
    }

    const plan = plans.find(({id}) => id === planId)
    if (!plan) return

    setShownPlan(plan)
  }

  function toggleMobileSidebar() {
    if (isMobile()) {
      setMobileSidebarOpen(!sidebarMobileOpen)
    }
  }

  function onWindowResize() {
    if (!isMobile()) {
      setMobileSidebarOpen(false)
    }
  }

  function renderList() {
    return (
      <PlanList
        plans={plans}
        onPlanClick={onPlanClick}
        onRemovePlan={removePlan}
        onAddPlan={onAddButtonClick}
        shownPlanId={shownPlan?.id}
      />
    )
  }

  useEffect(() => {
    if (!shownPlan) setShownPlan(defaultPlan(plans))

    window.addEventListener('resize', onWindowResize)
    return () => window.removeEventListener('resize', onWindowResize)
  }, [])

  useEffect(() => {
    const shownPlanUpdate = plans.find(({id}) => id === shownPlan?.id)
    if (!shownPlanUpdate) return setShownPlan(undefined)

    return setShownPlan(shownPlanUpdate)
  }, [plans])

  return (
    <Container navbar className={classes.wrapper} vpadded={false} hpadded={false}>
      <Hidden mdDown>
        <Drawer open classes={{paper: classes.drawerPaper}} variant="permanent" PaperProps={{elevation: 6}}>
          {renderList()}
        </Drawer>
      </Hidden>
      <Container className={classes.mapContainer} component="section" vpadded={false} hpadded={false}>
        <PlanMap plan={shownPlan} onMapClick={onMapClick} />
        <Hidden lgUp>
          <Drawer
            anchor="bottom"
            variant="temporary"
            classes={{paper: classes.drawerPaper}}
            open={sidebarMobileOpen}
            onClose={toggleMobileSidebar}
            ModalProps={{keepMounted: true}}
          >
            <IconButton disableRipple onClick={toggleMobileSidebar} className={classes.drawerCloseButton}>
              <Icon type="Close" />
            </IconButton>
            {renderList()}
          </Drawer>
          <BottomNavigation className={classes.bottomNavigation} component="aside">
            <BottomNavigationAction
              showLabel
              className={classes.bottomNavigationButton}
              label="Show plans"
              onClick={toggleMobileSidebar}
            />
          </BottomNavigation>
        </Hidden>
      </Container>
    </Container>
  )
}

export default MainContent
