import { finishedInHomeDish, getBallIdsToUpdate } from './helpers'

describe('getBallIdsToUpdate', () => {
  it('should work', () => {
    expect(getBallIdsToUpdate(0, 3))
      .toEqual([1, 2, 3]);

    expect(getBallIdsToUpdate(5, 3))
      .toEqual([6, 7, 8]);

    expect(getBallIdsToUpdate(12, 3))
      .toEqual([13, 0, 1]);
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
