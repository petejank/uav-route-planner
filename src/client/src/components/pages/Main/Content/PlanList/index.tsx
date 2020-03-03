import React, {Fragment} from 'react'

import {Button, Divider, List, ListItem, ListItemText, Typography, Box} from 'components/shared/material'
import PlanListItem from './Item'
import {PlanType} from 'types/plan'

import useStyles from './styles'

type Props = {
  plans: PlanType[]
  onPlanClick: (id: string) => void
  onAddPlan: () => void
  onRemovePlan: (id: string) => void
  shownPlanId?: string
}

const PLAN_SPACING = 4

const MainContentPlanList = ({plans, onPlanClick, onAddPlan, onRemovePlan, shownPlanId}: Props) => {
  const classes = useStyles()

  function renderList() {
    if (!plans.length) {
      return (
        <ListItemText>
          <Box mb={PLAN_SPACING} mt={PLAN_SPACING}>
            <Typography variant="body1" align="center">
              No plans found
            </Typography>
          </Box>
        </ListItemText>
      )
    }

    return plans.map(({id, color, createdAt}, index) => (
      <Fragment key={id}>
        <PlanListItem
          id={id}
          color={color}
          selected={id === shownPlanId}
          createdAt={createdAt}
          onClick={onPlanClick}
          onRemove={onRemovePlan}
        />
        {index !== plans.length - 1 && <Divider component="li" />}
      </Fragment>
    ))
  }

  return (
    <List className={classes.list}>
      <ListItem component="li">
        <Button fullWidth variant="outlined" onClick={onAddPlan}>
          Add new plan
        </Button>
      </ListItem>
      {renderList()}
    </List>
  )
}

export default MainContentPlanList
