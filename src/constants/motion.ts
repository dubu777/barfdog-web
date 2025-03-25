
export const MOTION = {
  SURVEY_STEP: {
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
    },
  },
  EXPAND_FROM_TOP: {
    hidden: {
      height: 0,
      opacity: 0,
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.15,
        ease: "easeInOut",
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.15,
        ease: "easeInOut",
      },
    },
  },
  SNACKBAR: {
    hidden: {
      opacity: 0,
      y: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
  },
};