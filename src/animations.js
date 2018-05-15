import { TweenLite, Power2 } from 'gsap';

function moveCounter(fromIndex, toIndex, cb) {
    const from = document.getElementById(`ball-${fromIndex}`)
    const thisRect = from.getBoundingClientRect();
    const to = document.getElementById(`ball-${toIndex}`)
    const rect = to.getBoundingClientRect();
    console.log(`moving ball-${fromIndex} on to ball-${toIndex}`);
    from.style.zIndex = 2;
    to.style.zIndex = 1;
    TweenLite.to(from, 0.2,
        {
            z: 2,
            x: (rect.left - thisRect.left),
            y: (rect.top - (thisRect.top + 50)),
            onComplete() {
                cb();
            }
        });
}

function moveAll() {

}


export {
    moveCounter,
    moveAll
}