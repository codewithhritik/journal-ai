const mockData = {
    streak: 7,
    journaledDates: ["2023-06-01", "2023-06-03", "2023-06-04", "2023-06-05"],
    moodData: [
        { date: "Jun 1", happy: 0.6, neutral: 0.3, sad: 0.1 },
        { date: "Jun 2", happy: 0.7, neutral: 0.2, sad: 0.1 },
        { date: "Jun 3", happy: 0.5, neutral: 0.4, sad: 0.1 },
        { date: "Jun 4", happy: 0.8, neutral: 0.1, sad: 0.1 },
        { date: "Jun 5", happy: 0.6, neutral: 0.3, sad: 0.1 },
    ],
    activityData: [
        { date: "Jun 1", journalEntries: 2, reflections: 1 },
        { date: "Jun 2", journalEntries: 1, reflections: 1 },
        { date: "Jun 3", journalEntries: 3, reflections: 2 },
        { date: "Jun 4", journalEntries: 2, reflections: 1 },
        { date: "Jun 5", journalEntries: 1, reflections: 1 },
    ],
    sentimentBreakdown: { happy: 60, neutral: 30, sad: 10 },
    journalEntries: [
        {
            date: "2023-06-05",
            summary: "Today was a productive day. I completed all my tasks.",
        },
        {
            date: "2023-06-04",
            summary: "Spent time with family and enjoyed a good book.",
        },
        {
            date: "2023-06-03",
            summary:
                "Faced some challenges at work, but managed to overcome them.",
        },
    ],
    totalDays: 30,
    longestStreak: 14,
    averageWordCount: 250,
};

export default mockData;
