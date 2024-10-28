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
      duration: 0.25,
      ease: "easeInOut",
    },
  },
  exit: {
    x: 0,
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  }
};

const expandFromTopVariants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: {
      duration: 0.15,
      ease: 'easeInOut',
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.15,
      ease: 'easeInOut',
    },
  },
};


export {sectionVariants, expandFromTopVariants}