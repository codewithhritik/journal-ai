"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function NewEntryButton() {
    return (
        <motion.div
            className="fixed bottom-8 right-8 z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <Button size="lg" className="rounded-full shadow-lg">
                <Sparkles className="mr-2 h-4 w-4" />
                New Entry
            </Button>
        </motion.div>
    );
}
