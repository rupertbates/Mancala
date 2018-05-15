import { player1DishIndex, player2DishIndex, totalNumberOfPositions } from './constants'

function circularIndex(i) {
  if (i <= player2DishIndex )
    return i;
  return i - totalNumberOfPositions;
}

function  finishedInHomeDish(selectedIndex, numInBox, player1Active) {
  const ci = circularIndex(selectedIndex + numInBox)
  if(player1Active){
    return ci === player1DishIndex
  }
  else return ci === player2DishIndex
}

export {
  circularIndex,
  finishedInHomeDish,
}