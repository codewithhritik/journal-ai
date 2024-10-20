"use client";

import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";

export default function Cursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const cursorAnimation = useAnimation();

    useEffect(() => {
        const mouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", mouseMove);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
        };
    }, []);

    useEffect(() => {
        cursorAnimation.start({
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
            transition: {
                type: "spring",
                mass: 0.1,
                stiffness: 1000,
                damping: 50,
            },
        });
    }, [mousePosition, cursorAnimation]);

    return (
        <motion.div
            className="fixed w-8 h-8 border border-primary rounded-full pointer-events-none z-50"
            animate={cursorAnimation}
        />
    );
}
