"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function ExploreNotionTemplatesCard() {
    return (
        <Card className="relative overflow-hidden">
            <CardHeader>
                <CardTitle>Explore Notion Templates</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-4">
                    Discover new ways to structure your thoughts and boost your
                    productivity.
                </p>
                <Button variant="outline">
                    View All Templates
                    <BookOpen className="ml-2 h-4 w-4" />
                </Button>
            </CardContent>
            <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full"
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, -90, 0],
                }}
                transition={{
                    duration: 6,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                    repeat: Infinity,
                }}
            />
        </Card>
    );
}
