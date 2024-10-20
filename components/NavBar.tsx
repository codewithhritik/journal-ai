"use client";

import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sun, Moon } from "lucide-react";

interface NavBarProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

export default function NavBar({ isDarkMode, toggleDarkMode }: NavBarProps) {
    return (
        <nav className="border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold text-primary">
                        JournalAI
                    </h1>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <Avatar>
                            <AvatarImage
                                src="https://github.com/hrithikx.png"
                                alt="@hrithikx"
                            />
                            <AvatarFallback>HR</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">Hi, Hrithik</span>
                    </div>
                    <div className="flex items-center">
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Switch
                            checked={isDarkMode}
                            onCheckedChange={toggleDarkMode}
                            className="mx-2"
                        />
                        <Moon className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    </div>
                </div>
            </div>
        </nav>
    );
}
