import dayjs from 'dayjs'

const DATE_FORMAT = 'MMM D, YYYY hh:mm A'

export default (timestamp: string) => {
  return dayjs(timestamp).format(DATE_FORMAT)
}
