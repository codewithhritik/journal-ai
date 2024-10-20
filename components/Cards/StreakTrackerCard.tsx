"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StreakTrackerCardProps {
    streak: number;
}

export default function StreakTrackerCard({ streak }: StreakTrackerCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Streak Tracker</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center space-x-4">
                <div className="text-4xl font-bold">{streak}</div>
                <div className="text-muted-foreground">days in a row</div>
                {streak >= 5 && (
                    <Badge variant="secondary">🎉 5-day streak!</Badge>
                )}
                {streak >= 10 && (
                    <Badge variant="secondary">🔥 10-day streak!</Badge>
                )}
            </CardContent>
        </Card>
    );
}
