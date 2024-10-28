
const transition = {duration: .5, ease: [0.76, 0, 0.24, 1]}

export const width = {
  initial: {
    width: 0,
    transition
  },
  enter: {
    width: "70%",
    transition
  },
  exit: {
    width: 0,
    transition
  }
}

export const background = {
  initial: {
    width: 0
  },
  open: {
    width: "100%",
    transition
  },
  closed: {
    width: 0,
    transition
  }
}

export const opacity = {
  initial: {
    opacity: 0
  },
  open: {
    opacity: 1,
    transition: {duration: 0.35, delay: 0.35},
  },
  closed: {
    opacity: 0,
    transition: {duration: 0.35}
  }
}