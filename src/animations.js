import { TimelineLite, TweenLite, Power2 } from 'gsap'


function moveFirstCounter (fromIndex, toIndex, callback) {
    const from = document.getElementById(`ball-${fromIndex}`)
    const fromRect = from.getBoundingClientRect()
    const to = document.getElementById(`ball-${toIndex}`)
    const toRect = to.getBoundingClientRect()

    from.style.zIndex = '2'

    const onComplete = () => {
        from.style.cssText = ''
        callback()
    }

    TweenLite.to(from, 0.5,
        {
            z: 2,
            x: (toRect.left - fromRect.left),
            y: (toRect.top - fromRect.top),
            onComplete,
        })
}

function moveNextCounter (fromIndex, toIndex, callback) {
    const from = document.getElementById(`ball-${fromIndex}`)
    const fromRect = from.getBoundingClientRect()
    const to = document.getElementById(`ball-${toIndex}`)
    const toRect = to.getBoundingClientRect()

    //Here we animate a separate ball, not the original one which was clicked
    TweenLite.fromTo('#ball-99', 0.5,
        {
            x: fromRect.x,
            y: fromRect.y - getOffset(toRect, fromRect),
        },
        {
            x: toRect.left,
            y: toRect.top - getOffset(fromRect, toRect),
            onComplete: callback,
        })
}

//This is to account for the difference in height between dishes and boxes
function getOffset (fromRect, toRect) {
    if (fromRect.height < toRect.height)
        return (fromRect.height - toRect.height) / 2

    return 0;
}

export {
    moveFirstCounter,
    moveNextCounter,
}
