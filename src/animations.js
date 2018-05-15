import { TimelineLite, TweenLite, Power2 } from 'gsap';

function moveCounter(fromIndex, toIndex, cb) {
    const from = document.getElementById(`ball-${fromIndex}`)
    const thisRect = from.getBoundingClientRect();
    const to = document.getElementById(`ball-${toIndex}`)
    const rect = to.getBoundingClientRect();
    console.log(`moving ball-${fromIndex} on to ball-${toIndex}`);
    from.style.zIndex = 2;
    to.style.zIndex = 1;
    return TweenLite.to(from, 0.5,
        {
            z: 2,
            x: (rect.left - thisRect.left),
            y: (rect.top - (thisRect.top)),
            onComplete() {
              if (cb)
                cb();
            }
        });
}

function moveAll(fromIndex, toArray) {
  const tl = new TimelineLite();
  toArray.forEach(i => tl.add(moveCounter(fromIndex, i)) )
}


export {
    moveCounter,
    moveAll
}
