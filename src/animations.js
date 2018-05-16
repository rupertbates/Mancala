import { TimelineLite, TweenLite, Power2 } from 'gsap';

function moveFirstCounter(fromIndex, toIndex, callback) {
    const from = document.getElementById(`ball-${fromIndex}`)
    const fromRect = from.getBoundingClientRect();
    const to = document.getElementById(`ball-${toIndex}`)
    const toRect = to.getBoundingClientRect();

    from.style.zIndex = 2;
    to.style.zIndex = 1;

    TweenLite.to(from, 0.5,
        {
            z: 2,
            x: (toRect.left - fromRect.left),
            y: (toRect.top - fromRect.top),
            onComplete: callback,
        });
}

function moveNextCounter (fromIndex, toIndex, callback) {
    const moving = document.getElementById("ball-99")
    const movingRect = moving.getBoundingClientRect()
    const from = document.getElementById(`ball-${fromIndex}`)
    const fromRect = from.getBoundingClientRect();
    const to = document.getElementById(`ball-${toIndex}`)
    const toRect = to.getBoundingClientRect();

    from.style.zIndex = 2;
    to.style.zIndex = 1;

    //Here we animate a separate ball, not the original one which was clicked
    moving.style.top = '67px'

    TweenLite.fromTo('#ball-99', 0.5,
        {
            x: fromRect.x,
            y: fromRect.y,
        },
        {
            x: (toRect.left),
            y: (toRect.top),
            onComplete: callback,
        });
}

export {
    moveFirstCounter,
    moveNextCounter,
}
