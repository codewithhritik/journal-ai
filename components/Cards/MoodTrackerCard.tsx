"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface MoodData {
    date: string;
    happy: number;
    neutral: number;
    sad: number;
}

interface MoodTrackerCardProps {
    moodData: MoodData[];
}

export default function MoodTrackerCard({ moodData }: MoodTrackerCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Mood Tracker</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={moodData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis
                            width={40}
                            tickFormatter={(value) => `${value * 100}%`}
                        />
                        <Tooltip
                            formatter={(value) => `${Number(value) * 100}%`}
                        />
                        <Area
                            type="monotone"
                            dataKey="happy"
                            stroke="#10b981"
                            fill="#10b981"
                        />
                        <Area
                            type="monotone"
                            dataKey="neutral"
                            stroke="#6b7280"
                            fill="#6b7280"
                        />
                        <Area
                            type="monotone"
                            dataKey="sad"
                            stroke="#ef4444"
                            fill="#ef4444"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
