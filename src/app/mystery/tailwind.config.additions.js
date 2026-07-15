/**
 * Merge this into your existing tailwind.config.js/ts under theme.extend.
 * Example (tailwind.config.ts):
 *
 * export default {
 *   content: [...],
 *   theme: {
 *     extend: {
 *       keyframes: { ...keyframes below },
 *       animation: { ...animation below },
 *     },
 *   },
 * };
 */

module.exports = {
  keyframes: {
    "gift-float": {
      "0%, 100%": { transform: "translateY(0) rotate(-3deg)" },
      "50%": { transform: "translateY(-18px) rotate(3deg)" },
    },
    "gift-float2": {
      "0%, 100%": { transform: "translateY(0) rotate(3deg)" },
      "50%": { transform: "translateY(-24px) rotate(-3deg)" },
    },
    "gift-pop": {
      "0%": { transform: "scale(0)", opacity: "0" },
      "70%": { transform: "scale(1.1)", opacity: "1" },
      "100%": { transform: "scale(1)", opacity: "1" },
    },
    "gift-fall": {
      "0%": { transform: "translateY(-20px) rotate(0deg)", opacity: "1" },
      "100%": { transform: "translateY(340px) rotate(360deg)", opacity: "0" },
    },
    "gift-wiggle": {
      "0%, 100%": { transform: "rotate(-1.5deg)" },
      "50%": { transform: "rotate(1.5deg)" },
    },
    "gift-bob": {
      "0%, 100%": { transform: "translateY(0)" },
      "50%": { transform: "translateY(-6px)" },
    },
  },
  animation: {
    "gift-float": "gift-float 3.6s ease-in-out infinite",
    "gift-float2": "gift-float2 4.2s ease-in-out infinite",
    "gift-pop": "gift-pop 0.6s ease forwards",
    "gift-fall": "gift-fall linear forwards",
    "gift-wiggle": "gift-wiggle 5s ease-in-out infinite",
    "gift-bob": "gift-bob 1.6s ease-in-out infinite",
  },
};
