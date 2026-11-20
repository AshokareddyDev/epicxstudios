"use client";

import { motion } from "framer-motion";
import { uiSpring } from "@/lib/motion";

export function DownloadLetterhead() {
  return (
    <motion.button
      type="button"
      onClick={() => window.print()}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={uiSpring}
      className="letterhead-chrome inline-flex h-11 items-center rounded-full bg-amber px-5 text-sm text-paper hover:bg-ivory hover:text-paper"
    >
      Download PDF
    </motion.button>
  );
}
