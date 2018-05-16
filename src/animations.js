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

    const tl = new TimelineLite({onComplete: callback});
    //Here we animate a separate ball, not the original one which was clicked
    tl.toLocaleString()
    tl.fromTo('#ball-99', 0.5,
        {
            x: fromRect.left,
            y: fromRect.top,
        },
        {
            x: toRect.left,
            y: toRect.top,
        });
    return tl;
}

export {
    moveFirstCounter,
    moveNextCounter,
}
