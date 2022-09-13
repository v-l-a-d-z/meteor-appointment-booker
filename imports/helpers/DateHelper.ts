export const getDateString = (fromDate: Date) => {
  return fromDate.toISOString().substring(0, 10)
}
