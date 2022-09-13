import { getDateString } from '/imports/helpers/DateHelper'
import assert from 'assert'

describe('getDateString', function () {
  it('should return date string', function () {
    // GIVEN
    const expectedDateString = '2022-05-06'
    const date = new Date(expectedDateString)

    // WHEN
    const dateString = getDateString(date)

    // THEN
    assert.strictEqual(dateString, expectedDateString)
  })
})
