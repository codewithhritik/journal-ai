"use client";

import { useState, useEffect } from "react";
import Cursor from "@/components/Cursor";
import FloatingShape from "@/components/FloatingShape";
import NavBar from "@/components/NavBar";
import NewEntryButton from "@/components/NewEntryButton";
import StreakTrackerCard from "@/components/Cards/StreakTrackerCard";
import TalkToAICard from "@/components/Cards/TalkToAICard";
import JournalCalendarCard from "@/components/Cards/JournalCalendarCard";
import MoodTrackerCard from "@/components/Cards/MoodTrackerCard";
import ActivityOverviewCard from "@/components/Cards/ActivityOverviewCard";
import SentimentBreakdownCard from "@/components/Cards/SentimentBreakdownCard";
import JournalEntriesCard from "@/components/Cards/JournalEntriesCard";
import UserEngagementStatsCard from "@/components/Cards/UserEngagementStatsCard";
import PersonalNotionCard from "@/components/Cards/PersonalNotionCard";
import { motion } from "framer-motion";

// Import mock data (you'll need to create this file)
import mockData from "@/data/mockData";

export default function Home() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [journaledDates, setJournaledDates] = useState(
        mockData.journaledDates
    );
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle("dark");
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        const formattedDate = date.toISOString().split("T")[0];
        if (journaledDates.includes(formattedDate)) {
            setJournaledDates(
                journaledDates.filter((d) => d !== formattedDate)
            );
        } else {
            setJournaledDates([...journaledDates, formattedDate]);
        }
    };

    const [randomTip, setRandomTip] = useState("");
    const tips = [
        "Write about a small win you had today.",
        "Reflect on a challenge you overcame recently.",
        "Describe your ideal day in detail.",
        "List three things you're grateful for right now.",
        "Write a letter to your future self.",
    ];

    useEffect(() => {
        setRandomTip(tips[Math.floor(Math.random() * tips.length)]);
    }, []);

    return (
        <div
            className={`min-h-screen bg-background ${
                isDarkMode ? "dark" : ""
            } overflow-hidden`}
        >
            <Cursor />
            <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            <div className="container mx-auto p-6 space-y-6 relative">
                <FloatingShape>
                    <div className="w-64 h-64 rounded-full bg-primary/5" />
                </FloatingShape>
                <FloatingShape>
                    <div className="w-32 h-32 rounded-full bg-secondary/5" />
                </FloatingShape>
                <FloatingShape>
                    <div className="w-48 h-48 rounded-full bg-accent/5" />
                </FloatingShape>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-primary/10 p-4 rounded-lg mb-6"
                >
                    <h2 className="text-lg font-semibold mb-2">
                        Journaling Tip of the Day:
                    </h2>
                    <p>{randomTip}</p>
                </motion.div>

                <div className="grid gap-6 md:grid-cols-3">
                    <StreakTrackerCard streak={mockData.streak} />
                    <TalkToAICard />
                    <PersonalNotionCard />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <JournalCalendarCard
                        journaledDates={journaledDates}
                        onDateSelect={handleDateSelect}
                    />
                    <MoodTrackerCard moodData={mockData.moodData} />
                </div>

                <ActivityOverviewCard activityData={mockData.activityData} />

                <div className="grid gap-6 md:grid-cols-2">
                    <SentimentBreakdownCard
                        sentimentBreakdown={mockData.sentimentBreakdown}
                    />
                    <UserEngagementStatsCard
                        totalDays={mockData.totalDays}
                        longestStreak={mockData.longestStreak}
                        averageWordCount={mockData.averageWordCount}
                        sentimentBreakdown={mockData.sentimentBreakdown}
                    />
                </div>

                <JournalEntriesCard journalEntries={mockData.journalEntries} />

                <NewEntryButton selectedDate={selectedDate} />
            </div>
        </div>
    );
}
