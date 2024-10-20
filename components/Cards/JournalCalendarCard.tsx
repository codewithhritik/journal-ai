"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";

interface JournalCalendarCardProps {
    journaledDates: string[];
}

export default function JournalCalendarCard({
    journaledDates,
}: JournalCalendarCardProps) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        new Date()
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Journal Calendar</CardTitle>
            </CardHeader>
            <CardContent>
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    modifiers={{
                        journaled: (date) =>
                            journaledDates.includes(format(date, "yyyy-MM-dd")),
                    }}
                    modifiersStyles={{
                        journaled: {
                            color: "var(--primary)",
                            fontWeight: "bold",
                        },
                    }}
                />
            </CardContent>
        </Card>
    );
}
