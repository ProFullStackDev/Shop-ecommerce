import gsap from 'gsap';

export const svgAnimation = () => {
  document.querySelectorAll('.confetti-svg path, .confetti-svg g').forEach(function (el) {
    el.removeAttribute('data-name');
  });

  document.querySelectorAll('.confetti-svg [id*="_Group"], .confetti-svg [id*="_Path"]').forEach(function (el) {
    el.removeAttribute('id');
  });

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
    repeat: 0,
    repeatDelay: 0,
    defaults: {
      ease: 'sine.inOut'
    }
  });

  confetti.to('#confetti #confetti-particles', 0.5, { opacity: 1 });

  document.querySelectorAll('#confetti #confetti-particles rect').forEach(function (el, index) {
    let ntl = gsap.timeline({});

    let hor = getRndInteger(-400, 400),
      vert = getRndInteger(200, 800),
      timeEl = randomFloatBetween(2, 3),
      elDur = randomFloatBetween(0.8, 1.5);

    let offsetTimeEl = `-=${timeEl / 3}`;

    ntl
      .to(el, timeEl, { x: hor }, 0)
      .fromTo(el, timeEl / 3, { y: 100 }, { y: -vert, ease: 'power3.out' }, 0)
      .to(el, timeEl / 2, { y: 100, ease: 'power1.in' }, timeEl / 3)
      .to(el, 0.5, { opacity: 0 }, offsetTimeEl)
      .to(
        el,
        elDur,
        {
          transformOrigin: '50% 50%',
          rotation: Math.random() > 0.5 ? -360 : 360,
          repeat: 1.5,
          ease: 'linear'
        },
        0
      );

    confetti.add(ntl, 0);
  });
};
