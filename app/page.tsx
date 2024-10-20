"use client";

import { useState } from "react";
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

// Import mock data (you'll need to create this file)
import mockData from "@/data/mockData";

export default function Home() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [journaledDates, setJournaledDates] = useState(
        mockData.journaledDates
    );

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle("dark");
    };

    const handleDateSelect = (date: Date) => {
        const formattedDate = date.toISOString().split("T")[0];
        if (journaledDates.includes(formattedDate)) {
            setJournaledDates(
                journaledDates.filter((d) => d !== formattedDate)
            );
        } else {
            setJournaledDates([...journaledDates, formattedDate]);
        }
    };

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

                <PersonalNotionCard />

                <div className="grid gap-6 md:grid-cols-2">
                    <StreakTrackerCard streak={mockData.streak} />
                    <TalkToAICard />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* <div className="md:col-span-1">
                        <JournalCalendarCard journaledDates={journaledDates} />
                    </div> */}
                    <div className="md:col-span-1 flex flex-col">
                        <MoodTrackerCard moodData={mockData.moodData} />
                    </div>
                </div>

                <ActivityOverviewCard activityData={mockData.activityData} />

                <SentimentBreakdownCard
                    sentimentBreakdown={mockData.sentimentBreakdown}
                />

                <JournalEntriesCard journalEntries={mockData.journalEntries} />

                <UserEngagementStatsCard
                    totalDays={mockData.totalDays}
                    longestStreak={mockData.longestStreak}
                    averageWordCount={mockData.averageWordCount}
                    sentimentBreakdown={mockData.sentimentBreakdown}
                />

                <NewEntryButton />
            </div>
        </div>
    );
}
