import React from 'react'
import classnames from 'classnames'
import {Container} from '@material-ui/core'
import {ContainerProps} from '@material-ui/core/Container'

import useStyles from './styles'

type Props = {
  className?: string
  maxWidth?: ContainerProps['maxWidth']
  navbar?: boolean
  vpadded?: boolean
  hpadded?: boolean
} & ContainerProps

const WrappedContainer = ({
  children,
  navbar,
  className,
  maxWidth = false,
  hpadded = true,
  vpadded = true,
  component = 'main',
  ...rest
}: Props) => {
  const {vertPadding, noHorPadding, navbarMargin} = useStyles()
  const containerClass = classnames(className, {
    [vertPadding]: vpadded,
    [noHorPadding]: !hpadded,
    [navbarMargin]: navbar
  })

  return (
    <Container {...rest} className={containerClass} component={component} maxWidth={maxWidth}>
      {children}
    </Container>
  )
}

export default WrappedContainer
