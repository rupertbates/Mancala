import { player2DishIndex, totalNumberOfPositions } from './constants'

function circularIndex(i) {
  if (i <= player2DishIndex )
    return i;
  return i - totalNumberOfPositions;
}

function getBallIdsToUpdate(selectedIndex, numOfCounters) {
  return [...Array(numOfCounters).keys()]
    .map(i => circularIndex(selectedIndex + 1 + i));
}

export {
  circularIndex,
  getBallIdsToUpdate,
}
