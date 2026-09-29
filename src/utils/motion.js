export const fadeVariants = ({ delay = 0, duration = 0.5 } = {}) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration, delay, ease: [0.0, 0.0, 0.2, 1.0] },
  },
});
  
  export const zoomIn = (delay, duration) => {
    return {
      hidden: {
        scale: 0,
        opacity: 0,
      },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          type: "tween",
          delay: delay,
          duration: duration,
          ease: "easeOut",
        },
      },
    };
  };
