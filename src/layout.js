const x = 50;
const y = 50;
const hSpacing = 15;
const vSpacing = 25;
const boardHMargin = 4 * hSpacing;
const boardVMargin = 2 * vSpacing;
const boxWidth = 100;
const boxHeight = 120;
const dishWidth = 120;
const dishHeight = (2 * boxHeight) + vSpacing;
const dish1Left = x + boardHMargin;
const boxesLeft = dish1Left + dishWidth + hSpacing;
this.state = {
    gameState: {
        player1Active: true,
        counters: [0, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5, 5] //The number of counters in each cell, top left is 1
    },
};
const Layout = {
    x,
    y,
    hSpacing,
    vSpacing,
    boardHMargin,
    boardVMargin,
    boxWidth,
    boxHeight,
    boxColour: '#ced130',
    dishColour: '#ced130',
    backgroundColour: '#1d6a82',
    dishLeft: [
        x + boardHMargin, 
        boxesLeft + (6 * boxWidth) + (6 * hSpacing),
    ],
    dishWidth,
    dishHeight,
    boxesLeft: dish1Left + dishWidth + hSpacing, // space for the dish on the left side
    boxesTop1: y + boardVMargin,
    boxesTop2: y + boardVMargin + boxHeight + vSpacing,
    width: (boxWidth * 6) + (hSpacing * 7) + (dishWidth * 2) + (boardHMargin * 2),
    height: (2 * boxHeight) + (2 * boardVMargin) + vSpacing,
}

export default Layout;