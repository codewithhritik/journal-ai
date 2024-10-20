"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function TalkToAICard() {
    const router = useRouter();

    const startInterview = () => {
        router.push("/interview");
    };

    return (
        <Card className="relative overflow-hidden">
            <CardHeader>
                <CardTitle>Talk to our AI Today</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="mb-4">
                    Get personalized insights and improve your journaling
                    experience.
                </p>
                <Button className="relative z-10" onClick={startInterview}>
                    Start AI Interview
                    <MessageSquare className="ml-2 h-4 w-4" />
                </Button>
            </CardContent>
            <motion.div
                className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/20 rounded-full"
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 4,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                    repeat: Infinity,
                }}
            />
        </Card>
    );
}
