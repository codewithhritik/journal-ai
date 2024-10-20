"use client";

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface NewEntryButtonProps {
    selectedDate: Date | null;
}

export default function NewEntryButton({ selectedDate }: NewEntryButtonProps) {
    return (
        <motion.div
            className="fixed bottom-8 right-8 z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <Button size="lg" className="rounded-full shadow-lg">
                <Sparkles className="mr-2 h-4 w-4" />
                {selectedDate
                    ? `New Entry for ${selectedDate.toLocaleDateString()}`
                    : "New Entry"}
            </Button>
        </motion.div>
    );
}
