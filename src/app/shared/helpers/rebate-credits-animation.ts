import gsap from 'gsap';

export const svgRebateAnimation = () => {
  const getRndInteger = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const randomFloatBetween = (minValue: number, maxValue: number, precision?: number) => {
    if (typeof precision == 'undefined') {
      precision = 2;
    }
    return parseFloat(Math.min(minValue + Math.random() * (maxValue - minValue), maxValue).toFixed(precision));
  };

  let confetti = gsap.timeline({
    repeat: -1,
    repeatDelay: 1.5,
    defaults: {
      ease: 'sine.easeInOut'
    }
  });

  confetti.to('#dollars-explosion #dollars-group', 0.5, { opacity: 1 });

  const svg = document.querySelectorAll('#dollars-explosion g');

  svg.forEach(function (el, index) {
    let ntl = gsap.timeline({});

    let hor = getRndInteger(-400, 400),
      vert = getRndInteger(300, 800),
      timeEl = randomFloatBetween(2, 3),
      elDur = randomFloatBetween(0.8, 1.5);

    let offsetTimeEl = `-=${timeEl / 3.5}`;

    ntl
      .set(el, { transformOrigin: '50% 50%' })
      .to(el, timeEl, { x: hor }, 0)
      .fromTo(el, timeEl / 3, { y: 100 }, { y: -vert, ease: 'power2.out' }, 0)
      .to(el, timeEl / 2, { y: 100, ease: 'sine.in' }, timeEl / 3)

      .to(el, 0.5, { opacity: 0 }, offsetTimeEl)

      .to(el, elDur, { rotation: Math.random() > 0.5 ? -360 : 360, repeat: 1.5, ease: 'linear' }, 0);

    confetti.add(ntl, 0);
  });
};
