"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface ActivityData {
    date: string;
    journalEntries: number;
    reflections: number;
}

interface ActivityOverviewCardProps {
    activityData: ActivityData[];
}

export default function ActivityOverviewCard({
    activityData,
}: ActivityOverviewCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Activity Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={activityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis
                            width={48}
                            tickFormatter={(value) => `${value} entries`}
                        />
                        <Tooltip formatter={(value) => `${value} entries`} />
                        <Bar dataKey="journalEntries" fill="#6366f1" />
                        <Bar dataKey="reflections" fill="#f59e0b" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
