# ScrollTrigger

ScrollTrigger starts, pauses, or scrubs an animation based on scroll position.

## Setup

```javascript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

## Start an animation when an element enters the screen

```javascript
gsap.from(".card", {
  y: 40,
  opacity: 0,
  scrollTrigger: {
    trigger: ".card",
    start: "top 80%",
  },
});
```

`"top 80%"` means: when the top of the trigger reaches 80% of the way down the viewport.

## Main options

- `trigger`: the element that is watched.
- `start` and `end`: where the animation begins and ends, for example `"top center"` or `"+=500"`.
- `scrub`: ties progress to the scrollbar. `true` follows exactly; a number such as `1` adds a one second smoothing.
- `pin`: holds the trigger in place while the animation plays.

## Scrub example

```javascript
gsap.to(".hero-image", {
  y: -80,
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: 1,
  },
});
```

## Accessibility

Check `prefers-reduced-motion` and skip scroll-driven motion for people who ask for less movement.

```javascript
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduce) {
  // create your ScrollTriggers here
}
```
