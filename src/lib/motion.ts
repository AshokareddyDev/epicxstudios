import type { Transition } from "framer-motion";

/** Shared spring for controls, menus, and active indicators. */
export const uiSpring: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 34,
  mass: 0.8,
};

/** Slower spring for section entrances. */
export const revealSpring: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 22,
  mass: 0.9,
};
