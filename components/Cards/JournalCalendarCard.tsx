"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface JournalCalendarCardProps {
    journaledDates: string[];
    onDateSelect: (date: Date) => void;
}

export default function JournalCalendarCard({
    journaledDates,
    onDateSelect,
}: JournalCalendarCardProps) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        new Date()
    );

    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            setSelectedDate(date);
            onDateSelect(date);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Card>
                <CardHeader>
                    <CardTitle>Journal Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        className="rounded-md border"
                        modifiers={{
                            journaled: (date) =>
                                journaledDates.includes(
                                    format(date, "yyyy-MM-dd")
                                ),
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
        </motion.div>
    );
}
