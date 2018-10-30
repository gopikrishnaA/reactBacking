import moment from 'moment'

export const isProduction = () => process.env.NODE_ENV === 'production' ||
process.env.NODE_ENV === 'uat' ||
process.env.NODE_ENV === 'sit'

/**
 * This function will format string date from YYYY-MM-DD HH:MM::SS to DD MMMM YYYY,HH:MM::SS
 */
export const formatDate = date => {
  let formatDate = moment(date)
  if (formatDate.isValid()) {
    return formatDate.format('DD MMMM YYYY')
  }
  return date
}
