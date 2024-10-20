"use client";

import { motion } from "framer-motion";

export default function FloatingShape({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <motion.div
            className="absolute opacity-10"
            animate={{
                y: ["0%", "100%"],
                rotate: [0, 360],
            }}
            transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
            }}
        >
            {children}
        </motion.div>
    );
}
