import theme from './theme'

export default () => {
  return window.innerWidth < theme.breakpoints.values.lg
}
