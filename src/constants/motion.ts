const sectionVariants = {
  hiddenLeft: {
    x: -100,
    opacity: 0,
  },
  hiddenRight: {
    x: 100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.15,
      ease: "easeInOut",
    },
  },
};

export {sectionVariants}