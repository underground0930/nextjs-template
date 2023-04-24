// Day.js
// url: https://day.js.org/

import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

export const getTime = (
  config?: string | number | Date | dayjs.Dayjs | null | undefined,
  format?: string | undefined,
) => {
  return dayjs.utc(config).tz('Asia/Tokyo').format(format)
}
