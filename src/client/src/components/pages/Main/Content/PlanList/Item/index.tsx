import React, {SyntheticEvent} from 'react'

import {Avatar, ListItem, ListItemAvatar, ListItemText, Icon, Typography} from 'components/shared/material'
import formatDate from 'utils/formatDate'

import useStyles from './styles'

type Props = {
  id: string
  color: string
  createdAt: string
  selected: boolean
  onClick: (id: string) => void
  onRemove: (id: string) => void
}

const MainContentPlanListItem = ({id, color, createdAt, selected, onClick, onRemove}: Props) => {
  const classes = useStyles()

  function onItemClick() {
    onClick(id)
  }

  function onRemoveClick(event: SyntheticEvent) {
    event.stopPropagation()
    onRemove(id)
  }

  return (
    <ListItem button className={classes.item} selected={selected} component="li" onClick={onItemClick}>
      <ListItemAvatar>
        <Avatar style={{backgroundColor: color}}>
          <Icon type="LinearScale" />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography noWrap component="p" color="textPrimary" variant="subtitle2">
            {id}
          </Typography>
        }
        secondary={
          <Typography noWrap component="p" color="textSecondary" variant="caption">
            Added {formatDate(createdAt)}
          </Typography>
        }
      />
      <Icon color="disabled" fontSize="small" className={classes.removeButton} onClick={onRemoveClick} type="Delete" />
    </ListItem>
  )
}

export default MainContentPlanListItem
