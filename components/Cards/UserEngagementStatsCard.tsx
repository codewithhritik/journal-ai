"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SentimentBreakdown {
    happy: number;
    neutral: number;
    sad: number;
}

interface UserEngagementStatsCardProps {
    totalDays: number;
    longestStreak: number;
    averageWordCount: number;
    sentimentBreakdown: SentimentBreakdown;
}

export default function UserEngagementStatsCard({
    totalDays,
    longestStreak,
    averageWordCount,
    sentimentBreakdown,
}: UserEngagementStatsCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>User Engagement Stats</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium">
                            Total Days Journaled
                        </p>
                        <p className="text-2xl font-bold">{totalDays}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium">Longest Streak</p>
                        <p className="text-2xl font-bold">
                            {longestStreak} days
                        </p>
                    </div>
                    <div>
                        <p className="text-sm font-medium">
                            Average Word Count
                        </p>
                        <p className="text-2xl font-bold">{averageWordCount}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium">
                            Sentiment Breakdown
                        </p>
                        <div className="flex items-center space-x-2">
                            <Progress
                                value={sentimentBreakdown.happy}
                                className="h-2"
                            />
                            <span className="text-xs text-muted-foreground">
                                {sentimentBreakdown.happy}% Happy
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
