# Your first tween

A tween changes a property of an element from one value to another over time.

## The basic call

```javascript
gsap.to(".box", {
  x: 200,
  rotation: 360,
  duration: 1.5,
  ease: "power2.out",
});
```

This moves every element with the class `box` 200px to the right while rotating it once, over 1.5 seconds.

## to, from, fromTo

- `gsap.to()` animates from the current value to the one you give.
- `gsap.from()` animates from the value you give to the current one.
- `gsap.fromTo()` lets you set both the start and the end.

```javascript
gsap.fromTo(".box", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
```

## Why not just CSS?

CSS transitions are fine for hover states. Reach for GSAP when you need to sequence several animations, change values while they run, or control playback with code.

## Tips

- Animate `x`, `y`, `scale`, `rotation` and `opacity`. They do not trigger layout, so they stay smooth.
- Avoid animating `width`, `height`, `top` or `left` when you can.
