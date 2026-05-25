"use client";

import { motion } from "framer-motion";

const nodes = [
  ["Idea", "left-[12%] top-[24%]"],
  ["Team", "left-[36%] top-[18%]"],
  ["Launch", "right-[24%] top-[30%]"],
  ["Hiring", "right-[12%] bottom-[28%]"],
  ["Reputation", "left-[24%] bottom-[22%]"]
];

export function HeroScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#05070b]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(53,229,255,0.22),transparent_32%),radial-gradient(circle_at_72%_68%,rgba(157,255,106,0.13),transparent_28%)]" />
      <svg className="absolute inset-0 h-full w-full opacity-40" role="img" aria-label="Wolvix product flow network">
        <defs>
          <linearGradient id="flow" x1="0" x2="1">
            <stop stopColor="#35e5ff" />
            <stop offset="1" stopColor="#9dff6a" />
          </linearGradient>
        </defs>
        <path d="M 160 250 C 320 80 520 180 700 250 S 1020 520 1180 380" fill="none" stroke="url(#flow)" strokeWidth="2" strokeDasharray="10 12" />
        <path d="M 280 650 C 440 480 580 520 760 420 S 980 280 1110 310" fill="none" stroke="url(#flow)" strokeWidth="1.5" strokeDasharray="6 10" />
      </svg>
      {nodes.map(([label, position], index) => (
        <motion.div
          key={label}
          className={`glass absolute ${position} rounded-lg border-cyan/25 px-4 py-3 text-sm font-semibold text-white/78`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.12, duration: 0.7 }}
        >
          {label}
        </motion.div>
      ))}
    </div>
  );
}
