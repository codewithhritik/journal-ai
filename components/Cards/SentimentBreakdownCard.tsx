"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface SentimentBreakdown {
    happy: number;
    neutral: number;
    sad: number;
}

interface SentimentBreakdownCardProps {
    sentimentBreakdown: SentimentBreakdown;
}

export default function SentimentBreakdownCard({
    sentimentBreakdown,
}: SentimentBreakdownCardProps) {
    const data = [
        { name: "Happy", value: sentimentBreakdown.happy },
        { name: "Neutral", value: sentimentBreakdown.neutral },
        { name: "Sad", value: sentimentBreakdown.sad },
    ];

    const COLORS = ["#10b981", "#6b7280", "#ef4444"];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sentiment Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
