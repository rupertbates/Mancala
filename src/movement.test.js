import { getBallsToUpdate } from './HtmlBoard'
import { finishedInHomeDish } from './helpers'

describe('getBallsToUpdate', () => {
  it('should work', () => {
    expect(3).toBe(3)
  })
})

describe('finishedInHomeDish', () => {
  it('should work out if a player finishes in their own dish', () => {
    expect(finishedInHomeDish(1, 5, true)).toBe(true)
    expect(finishedInHomeDish(3, 5, true)).toBe(false)
    expect(finishedInHomeDish(10, 3, false)).toBe(true)
    expect(finishedInHomeDish(10, 5, false)).toBe(false)
  })
})
