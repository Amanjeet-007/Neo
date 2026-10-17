# Easing and stagger

Linear motion looks mechanical. Easing changes the speed over time so movement feels natural.

## Common eases

| Ease | Feel |
| --- | --- |
| `power2.out` | Starts fast, slows to a stop. A good default. |
| `back.out(1.7)` | Overshoots slightly, then settles. |
| `elastic.out(1, 0.3)` | Springs back and forth. Use sparingly. |
| `expo.inOut` | Slow start, fast middle, slow end. |

## Stagger

When you animate a list of elements, `stagger` delays each one a little after the previous.

```javascript
gsap.from(".item", {
  y: 24,
  opacity: 0,
  duration: 0.6,
  ease: "power2.out",
  stagger: 0.1,
});
```

Each `.item` starts 0.1 seconds after the one before it.

## Tips

- Keep durations between 0.2 and 0.8 seconds for interface motion.
- One ease per project keeps things consistent.
