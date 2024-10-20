"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronUp, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { format } from "date-fns";

interface JournalEntry {
    date: string;
    summary: string;
}

interface JournalEntriesCardProps {
    journalEntries: JournalEntry[];
}

export default function JournalEntriesCard({
    journalEntries,
}: JournalEntriesCardProps) {
    const [expandedEntry, setExpandedEntry] = useState<string | null>(null);

    const toggleEntry = (date: string) => {
        setExpandedEntry(expandedEntry === date ? null : date);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Journal Entries</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[300px]">
                    {journalEntries.map((entry) => (
                        <div key={entry.date} className="mb-4">
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => toggleEntry(entry.date)}
                            >
                                <h3 className="font-semibold">
                                    {format(
                                        new Date(entry.date),
                                        "MMMM d, yyyy"
                                    )}
                                </h3>
                                {expandedEntry === entry.date ? (
                                    <ChevronUp className="h-4 w-4" />
                                ) : (
                                    <ChevronDown className="h-4 w-4" />
                                )}
                            </div>
                            <motion.div
                                initial={false}
                                animate={{
                                    height:
                                        expandedEntry === entry.date
                                            ? "auto"
                                            : 0,
                                    opacity:
                                        expandedEntry === entry.date ? 1 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <p className="mt-2 text-muted-foreground">
                                    {entry.summary}
                                </p>
                            </motion.div>
                        </div>
                    ))}
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
